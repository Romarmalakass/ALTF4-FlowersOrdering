document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderBestsellers();
});

window.addEventListener('cwh_catalog_updated', () => {
  renderFeaturedProducts();
  renderBestsellers();
});

function getHomeProducts() {
  if (typeof getStoreCatalog === 'function') {
    return getStoreCatalog();
  }
  return typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [];
}

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-grid');
  if (!container) return;

  const catalog = getHomeProducts();
  // Prioritize new arrivals, then featured, then latest
  let featured = catalog.filter(p => p.newArrival || p.featured);
  if (featured.length < 4) {
    const remaining = catalog.filter(p => !featured.includes(p));
    featured = [...featured, ...remaining];
  }
  featured = featured.slice(0, 4);

  container.innerHTML = featured.map(product => createProductCardHTML(product)).join('');
}

function renderBestsellers() {
  const container = document.getElementById('bestsellers-grid');
  if (!container) return;

  const catalog = getHomeProducts();
  let bestsellers = catalog.filter(p => p.bestseller);
  if (bestsellers.length === 0) {
    bestsellers = catalog.slice(0, 4);
  } else {
    bestsellers = bestsellers.slice(0, 4);
  }

  container.innerHTML = bestsellers.map(product => createProductCardHTML(product)).join('');
}

function createProductCardHTML(product) {
  return `
    <div class="col-6 col-md-4 col-lg-3 mb-3">
      <div class="flower-card h-100 d-flex flex-column justify-content-between">
        <div>
          <div class="flower-card-img-wrapper position-relative" style="height: 185px;">
            <div class="card-badge-container">
              ${product.bestseller ? '<span class="bloom-badge badge-bestseller"><i class="bi bi-star-fill"></i> Best Seller</span>' : ''}
              ${product.newArrival ? '<span class="bloom-badge badge-new-arrival"><i class="bi bi-sparkles"></i> New Arrival</span>' : ''}
            </div>
            <img src="${product.image}" alt="${product.name}" class="flower-card-img" loading="lazy" />
          </div>
          <div class="flower-card-body p-3">
            <div class="flower-category-tag" style="font-size: 0.72rem; text-transform: uppercase; color: #e8839b; font-weight: 600; margin-bottom: 2px;">
              ${product.category || 'Handcrafted'}
            </div>
            <h5 class="flower-card-title fs-6 fw-bold mb-1">${product.name}</h5>
          </div>
        </div>
        <div class="p-3 pt-0 mt-auto">
          <div class="flower-price-row pt-2 border-top d-flex align-items-center justify-content-between">
            <span class="flower-price text-dark-rose fw-bold" style="font-size: 0.95rem;">
              ${typeof formatCurrency === 'function' ? formatCurrency(product.price) : '₱' + product.price}
            </span>
            <a href="shop.html?category=${encodeURIComponent(product.category || 'All')}" class="btn-bloom-primary px-3 py-1" style="font-size: 0.78rem; border-radius: 20px; font-weight: 600; text-decoration: none;">
              Buy
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
