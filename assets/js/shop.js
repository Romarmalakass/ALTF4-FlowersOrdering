let currentCategory = 'All';
let currentSearch = '';
let currentSort = 'default';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');

  if (categoryParam) currentCategory = categoryParam;
  if (searchParam) {
    currentSearch = searchParam;
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) searchInput.value = searchParam;
  }

  setupCategoryButtons();
  setupSearchInput();
  setupSortSelect();

  filterAndRenderProducts();
});

function setupCategoryButtons() {
  const categoryContainer = document.getElementById('category-pills-container');
  if (!categoryContainer) return;

  const categories = ['All', 'Fuzzy Wire', 'Satin Ribbon', 'Fillers'];

  categoryContainer.innerHTML = categories.map(cat => `
    <button class="category-pill-btn ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  categoryContainer.querySelectorAll('.category-pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryContainer.querySelectorAll('.category-pill-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      filterAndRenderProducts();
    });
  });
}

function setupSearchInput() {
  const searchInput = document.getElementById('shop-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    filterAndRenderProducts();
  });
}

function setupSortSelect() {
  const sortSelect = document.getElementById('shop-sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    filterAndRenderProducts();
  });
}

function getUnifiedCatalog() {
  let list = [];

  FUZZY_WIRE_FLOWERS.forEach(item => {
    list.push({
      id: item.id,
      name: item.name,
      category: 'Fuzzy Wire',
      price: item.price,
      rating: 4.9,
      reviewsCount: 35,
      image: item.image,
      bestseller: item.price >= 130
    });
  });

  SATIN_RIBBON_FLOWERS.forEach(item => {
    list.push({
      id: item.id,
      name: item.name,
      category: 'Satin Ribbon',
      price: item.price,
      rating: 5.0,
      reviewsCount: 42,
      image: item.image,
      bestseller: item.price >= 140
    });
  });

  FILLERS_DATA.forEach(item => {
    list.push({
      id: item.id,
      name: item.name,
      category: 'Fillers',
      price: item.price,
      rating: 4.8,
      reviewsCount: 20,
      image: item.image,
      bestseller: false
    });
  });

  return list;
}

function filterAndRenderProducts() {
  let filtered = getUnifiedCatalog();

  if (currentCategory !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (currentSearch !== '') {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch)
    );
  }

  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const countEl = document.getElementById('results-count-text');
  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} handcrafted stem${filtered.length === 1 ? '' : 's'}`;
  }

  const gridContainer = document.getElementById('shop-products-grid');
  if (!gridContainer) return;

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-12">
        <div class="no-results-box">
          <i class="bi bi-flower3 no-results-icon"></i>
          <h4 class="h5 fw-bold mb-2">No Items Found</h4>
          <p class="text-muted mb-3">We couldn't find any items matching your filter criteria.</p>
          <button class="btn-bloom-primary" onclick="resetShopFilters()">
            <i class="bi bi-arrow-counterclockwise"></i> Reset Catalog Filters
          </button>
        </div>
      </div>
    `;
    return;
  }

  const buyer = typeof getActiveBuyer === 'function' ? getActiveBuyer() : null;

  gridContainer.innerHTML = filtered.map(product => `
    <div class="col-6 col-md-4 col-lg-3 mb-3 mb-md-4">
      <div class="flower-card h-100 d-flex flex-column justify-content-between">
        <div>
          <div class="flower-card-img-wrapper">
            <div class="card-badge-container">
              <span class="bloom-badge badge-fresh">${product.category}</span>
            </div>
            <img src="${product.image}" alt="${product.name}" class="flower-card-img" loading="lazy" />
          </div>
          <div class="flower-card-body p-3">
            <div class="flower-category-tag">${product.category}</div>
            <h5 class="flower-card-title fs-6 fw-bold mb-1" title="${product.name}">${product.name}</h5>
          </div>
        </div>
        <div class="flower-card-footer p-3 pt-0">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-1 pt-2 border-top">
            <span class="flower-price text-dark-rose fw-bold" style="font-size: 0.92rem;">
              ${formatCurrency(product.price)} <small class="text-muted" style="font-size: 0.70rem; font-weight: normal;">/ pc</small>
            </span>
            <button class="btn btn-sm btn-bloom-primary rounded-pill px-3 py-1 fw-semibold" onclick="quickAddToCart('${product.id}')" title="Add to Cart" style="font-size: 0.78rem;">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function quickAddToCart(productId) {
  const buyer = getActiveBuyer();
  if (!buyer) {
    openBuyerLoginModal();
    return;
  }

  const allProducts = getUnifiedCatalog();
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const cartItem = {
    id: product.id,
    name: product.name,
    category: product.category,
    unitPrice: product.price,
    price: product.price,
    quantity: 1,
    image: product.image,
    stemCount: 1,
    flowerDetails: [`${product.name} (1x @ ${formatCurrency(product.price)})`],
    fillerDetails: ['None'],
    wrapper: 'Standard Wrap',
    ribbon: 'Standard Ribbon',
    addOns: [],
    grandTotal: product.price,
    totalPrice: product.price
  };

  const added = addToCart(cartItem);
  if (!added) return;

  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      html: `<div class="text-center font-sans"><strong>${product.name}</strong> (${formatCurrency(product.price)}) has been added to your shopping cart.</div>`,
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-bag-check me-1"></i> View Cart',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#e8839b',
      cancelButtonColor: '#64748b',
      customClass: { popup: 'compact-swal-popup' }
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'cart.html';
      }
    });
  }
}

function resetShopFilters() {
  currentCategory = 'All';
  currentSearch = '';
  currentSort = 'default';

  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = '';

  setupCategoryButtons();
  filterAndRenderProducts();
}
