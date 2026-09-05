
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  renderBestsellers();
});

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products-grid');
  if (!container) return;

  // Render top 4 products
  const featured = PRODUCTS_DATA.slice(0, 4);
  container.innerHTML = featured.map(product => createProductCardHTML(product)).join('');
}

function renderBestsellers() {
  const container = document.getElementById('bestsellers-grid');
  if (!container) return;

  const bestsellers = PRODUCTS_DATA.filter(p => p.bestseller).slice(0, 4);
  container.innerHTML = bestsellers.map(product => createProductCardHTML(product)).join('');
}

function createProductCardHTML(product) {
  const ratingStars = Array(5).fill(0).map((_, i) => 
    i < Math.floor(product.rating) 
      ? '<i class="bi bi-star-fill"></i>' 
      : (i < product.rating ? '<i class="bi bi-star-half"></i>' : '<i class="bi bi-star"></i>')
  ).join('');

  return `
    <div class="col-6 col-md-4 col-lg-3 mb-3">
      <div class="flower-card">
        <div class="flower-card-img-wrapper" style="height: 175px;">
          <div class="card-badge-container">
            ${product.bestseller ? '<span class="bloom-badge badge-bestseller">Best Seller</span>' : ''}
            ${product.popular ? '<span class="bloom-badge badge-fresh">Fresh</span>' : ''}
          </div>
          <img src="${product.image}" alt="${product.name}" class="flower-card-img" loading="lazy" />
        </div>
        <div class="flower-card-body p-3">
          <div class="flower-category-tag">${product.category}</div>
          <h5 class="flower-card-title fs-6 fw-bold mb-1">${product.name}</h5>
          <div class="flower-rating mb-2">
            ${ratingStars}
            <span class="small">(${product.reviewsCount})</span>
          </div>
          <div class="flower-price-row mt-auto pt-2">
            <div>
              <span class="flower-price text-dark-rose">${formatCurrency(product.price)}</span>
            </div>
            <a href="product-details.html" class="btn-bloom-primary px-3 py-1" style="font-size: 0.78rem; border-radius: 20px; font-weight: 600; text-decoration: none;">
              Buy
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
