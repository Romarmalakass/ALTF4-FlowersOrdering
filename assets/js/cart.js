let activeCartTab = 'cart';
let customerOrderSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  const viewParam = urlParams.get('view');

  const cart = getCart();
  const orders = getOrders();

  if (tabParam === 'orders' || viewParam === 'orders' || (cart.length === 0 && orders.length > 0)) {
    activeCartTab = 'orders';
  }

  renderCartPage();
});

function renderCartPage() {
  const buyer = typeof getActiveBuyer === 'function' ? getActiveBuyer() : null;
  const authView = document.getElementById('cart-authenticated-view');
  const unauthView = document.getElementById('cart-unauth-view');

  if (!buyer) {
    if (authView) authView.style.display = 'none';
    if (unauthView) unauthView.style.display = 'block';
    return;
  }

  if (authView) authView.style.display = 'block';
  if (unauthView) unauthView.style.display = 'none';

  updateTabUI();
  renderCart();
  renderPlacedOrders();
  updateCartAndOrderCounts();
}

function switchCartTab(tab) {
  activeCartTab = tab;
  updateTabUI();
}

function updateTabUI() {
  const cartView = document.getElementById('view-active-cart');
  const ordersView = document.getElementById('view-orders-tracker');
  const btnCart = document.getElementById('btn-view-cart');
  const btnOrders = document.getElementById('btn-view-orders');

  if (activeCartTab === 'cart') {
    if (cartView) cartView.style.display = 'block';
    if (ordersView) ordersView.style.display = 'none';
    if (btnCart) btnCart.classList.add('active');
    if (btnOrders) btnOrders.classList.remove('active');
  } else {
    if (cartView) cartView.style.display = 'none';
    if (ordersView) ordersView.style.display = 'block';
    if (btnCart) btnCart.classList.remove('active');
    if (btnOrders) btnOrders.classList.add('active');
    renderPlacedOrders();
  }
}

function updateCartAndOrderCounts() {
  const cart = getCart();
  const orders = getOrders();

  const cartCountEl = document.getElementById('tab-cart-count');
  const ordersCountEl = document.getElementById('tab-orders-count');

  if (cartCountEl) cartCountEl.textContent = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
  if (ordersCountEl) ordersCountEl.textContent = orders.length;
}

function renderCart() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items-container');
  const cartContentRow = document.getElementById('cart-content-row');
  const emptyCartContainer = document.getElementById('empty-cart-view');

  updateCartAndOrderCounts();

  if (!cartContainer) return;

  if (cart.length === 0) {
    if (cartContentRow) cartContentRow.style.display = 'none';
    if (emptyCartContainer) emptyCartContainer.style.display = 'block';
    return;
  }

  if (cartContentRow) cartContentRow.style.display = 'flex';
  if (emptyCartContainer) emptyCartContainer.style.display = 'none';

  cartContainer.innerHTML = cart.map((item, index) => {
    const unitPrice = Number(item.unitPrice || item.price || 0);
    const qty = Number(item.quantity || 1);
    const itemSubtotal = unitPrice * qty;

    const addOnsHTML = (item.addOns && item.addOns.length > 0)
      ? item.addOns.map(a => `<span class="addon-badge">+ ${a.name} (${formatCurrency(a.price)})</span>`).join(' ')
      : '';

    const flowerDetailsHTML = (item.flowerDetails && item.flowerDetails.length > 0)
      ? `<div><strong>🌸 Flowers & Stems:</strong> ${item.flowerDetails.join(', ')}</div>`
      : '';

    const fillerDetailsHTML = (item.fillerDetails && item.fillerDetails.length > 0)
      ? `<div><strong>🌿 Fillers:</strong> ${item.fillerDetails.join(', ')}</div>`
      : '';

    const colorHTML = item.color ? `<div><strong>🎨 Color Palette:</strong> ${item.color}</div>` : '';
    const wrapperHTML = item.wrapper ? `<div><strong>🎁 Wrapper:</strong> ${item.wrapper}</div>` : '';
    const ribbonHTML = item.ribbon ? `<div><strong>🎀 Ribbon:</strong> ${item.ribbon}</div>` : '';
    const notesHTML = item.notes ? `<div class="mt-1"><strong>📝 Instructions:</strong> <em>"${item.notes}"</em></div>` : '';
    const inspoHTML = item.inspoPhoto ? `<div class="mt-2"><span class="small fw-bold text-dark d-block">📷 Inspo Photo Reference:</span><img src="${item.inspoPhoto}" style="max-height: 80px; border-radius: 8px; border: 1px solid #e8839b;" /></div>` : '';

    return `
      <div class="cart-item-card mb-4 p-3.5 rounded" style="background: #fff; border: 1px solid var(--glass-border); box-shadow: var(--shadow-sm);" data-index="${index}">
        <div class="row align-items-start g-3">
          <div class="col-12 col-md-4 col-lg-3 text-center">
            <div class="cart-item-img-container p-2 rounded" style="background: #fffafc; border: 2px solid var(--pink-soft); height: 175px; display: flex; align-items: center; justify-content: center;">
              <img src="${item.image}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
            </div>
          </div>
          <div class="col-12 col-md-8 col-lg-9">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 class="font-serif fw-bold mb-1 text-dark-main fs-5">${item.name}</h5>
                <div class="small text-muted">Category: <strong class="text-pink">${item.category || 'Handcrafted Arrangement'}</strong></div>
              </div>
              <button class="btn btn-sm text-danger border-0 p-1 ms-2" onclick="handleRemoveItem(${index})" title="Remove item">
                <i class="bi bi-trash-fill fs-4"></i>
              </button>
            </div>

            <!-- Customization Specifications Review Card -->
            <div class="custom-specs-review-card p-3 rounded mb-3" style="background-color: #fffafc; border: 1.5px dashed var(--pink-primary); font-size: 0.875rem; color: #352129; line-height: 1.6;">
              <div class="fw-bold text-dark-rose mb-2 border-bottom pb-1.5 fs-6"><i class="bi bi-card-checklist me-1"></i> Custom Bouquet Specifications Breakdown:</div>
              <div class="d-grid gap-1">
                ${flowerDetailsHTML}
                ${fillerDetailsHTML}
                ${colorHTML}
                ${wrapperHTML}
                ${ribbonHTML}
                ${addOnsHTML ? `<div class="mt-1"><strong>✨ Add-ons:</strong> ${addOnsHTML}</div>` : ''}
                ${notesHTML}
                ${inspoHTML}
              </div>
            </div>

            <div class="d-flex flex-wrap justify-content-between align-items-center pt-2 border-top">
              <div class="d-flex align-items-center gap-3">
                <span class="small text-muted fw-bold">Unit Price: ${formatCurrency(unitPrice)}</span>
                <span class="text-muted">|</span>
                <div class="quantity-control">
                  <button class="quantity-btn" onclick="handleChangeQty(${index}, ${qty - 1})">-</button>
                  <input type="text" class="quantity-input" value="${qty}" readonly />
                  <button class="quantity-btn" onclick="handleChangeQty(${index}, ${qty + 1})">+</button>
                </div>
              </div>
              <div class="text-end">
                <span class="small text-muted d-block">Subtotal</span>
                <span class="fw-bold text-dark-rose fs-4">${formatCurrency(itemSubtotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  calculateTotals();
}

function calculateTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => {
    const p = Number(item.unitPrice || item.price || 0);
    const q = Number(item.quantity || 1);
    return sum + (p * q);
  }, 0);
  const deliveryFee = (subtotal >= 2000 || subtotal === 0) ? 0 : 150;
  const grandTotal = Math.max(0, subtotal + deliveryFee);

  const subtotalEl = document.getElementById('summary-subtotal');
  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

  const deliveryEl = document.getElementById('summary-delivery');
  if (deliveryEl) {
    if (deliveryFee === 0) {
      deliveryEl.innerHTML = '<span class="text-success fw-bold">FREE Delivery</span>';
    } else {
      deliveryEl.textContent = formatCurrency(deliveryFee);
    }
  }

  const grandTotalEl = document.getElementById('summary-grand-total');
  if (grandTotalEl) {
    grandTotalEl.textContent = formatCurrency(grandTotal);
  }
}

function handleChangeQty(index, newQty) {
  updateCartQuantity(index, newQty);
  renderCart();
}

function handleRemoveItem(index) {
  removeFromCart(index);
  renderCart();
}

function handleClearCart() {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: 'Clear Shopping Cart?',
      text: 'Are you sure you want to remove all custom items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b263e',
      cancelButtonColor: '#7c6b73',
      confirmButtonText: 'Yes, clear cart',
      background: '#fffafc',
      color: '#25161c'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        renderCart();
        showToast("Shopping cart cleared.", "info");
      }
    });
  } else {
    if (confirm("Are you sure you want to clear your shopping cart?")) {
      clearCart();
      renderCart();
      showToast("Shopping cart cleared.", "info");
    }
  }
}

function handleCustomerOrderSearch(val) {
  customerOrderSearchQuery = val.trim().toLowerCase();
  renderPlacedOrders();
}

function renderPlacedOrders() {
  const container = document.getElementById('placed-orders-container');
  if (!container) return;

  const orders = getOrders();

  let filtered = orders;
  if (customerOrderSearchQuery !== '') {
    filtered = filtered.filter(o =>
      (o.orderId && o.orderId.toLowerCase().includes(customerOrderSearchQuery)) ||
      (o.customerName && o.customerName.toLowerCase().includes(customerOrderSearchQuery)) ||
      (o.location && o.location.toLowerCase().includes(customerOrderSearchQuery))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 bg-white rounded-4 border p-4" style="border: 1.5px dashed var(--pink-primary) !important;">
        <i class="bi bi-box2-heart text-pink" style="font-size: 3.5rem;"></i>
        <h4 class="h5 font-serif fw-bold mt-3 mb-1">No Placed Orders Found</h4>
        <p class="text-muted small mb-3">${customerOrderSearchQuery ? 'No orders match your search criteria.' : 'You have not submitted any bouquet orders yet.'}</p>
        <a href="product-details.html" class="btn-bloom-primary">
          <i class="bi bi-magic me-1"></i> Build Custom Bouquet Now
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(order => {
    const formattedDate = new Date(order.createdAt || Date.now()).toLocaleString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const status = order.status || 'Order Placed';
    const isCancelled = status === 'Cancelled';
    const isOrderPlaced = status === 'Pending' || status === 'Order Placed';
    const isInCrafting = status === 'Confirmed' || status === 'In Crafting';
    const isOutForDelivery = status === 'Out for Delivery' || status === 'Delivery' || status === 'Meet up / Pick up' || status === 'Pickup';
    const isDelivered = status === 'Delivered' || status === 'Completed';

    let progressWidth = '0%';
    let step1 = 'active', step2 = '', step3 = '', step4 = '';

    if (isOrderPlaced) {
      progressWidth = '0%';
      step1 = 'active';
    } else if (isInCrafting) {
      progressWidth = '25%';
      step1 = 'completed';
      step2 = 'active';
    } else if (isOutForDelivery) {
      progressWidth = '50%';
      step1 = 'completed'; step2 = 'completed';
      step3 = 'active';
    } else if (isDelivered) {
      progressWidth = '75%';
      step1 = 'completed'; step2 = 'completed'; step3 = 'completed'; step4 = 'completed';
    }

    let statusBadgeHTML = `<span class="badge badge-status-pending px-2.5 py-1 rounded-pill fs-8 fw-semibold">Order Placed</span>`;
    if (isInCrafting) {
      statusBadgeHTML = `<span class="badge badge-status-confirmed px-2.5 py-1 rounded-pill fs-8 fw-semibold">In Crafting</span>`;
    } else if (isOutForDelivery) {
      statusBadgeHTML = `<span class="badge badge-status-delivery px-2.5 py-1 rounded-pill fs-8 fw-semibold">Out for Delivery</span>`;
    } else if (isDelivered) {
      statusBadgeHTML = `<span class="badge badge-status-completed px-2.5 py-1 rounded-pill fs-8 fw-semibold">Delivered</span>`;
    } else if (isCancelled) {
      statusBadgeHTML = `<span class="badge badge-status-cancelled px-2.5 py-1 rounded-pill fs-8 fw-semibold">Cancelled</span>`;
    }

    const canCancel = !isCancelled && !isDelivered;

    return `
      <div class="order-tracker-card mb-3" id="order-card-${order.orderId}">
        <!-- Top Bar -->
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-2.5 border-bottom">
          <div class="d-flex align-items-center gap-2">
            <span class="font-monospace fw-bold text-dark fs-6">#${order.orderId}</span>
            ${statusBadgeHTML}
          </div>
          <div>
            <span class="fw-bold text-dark fs-5">${formatCurrency(order.grandTotal)}</span>
          </div>
        </div>

        ${isCancelled ? `
          <div class="alert bg-pink-soft border border-danger p-2.5 rounded-3 my-3 d-flex align-items-center gap-2">
            <i class="bi bi-x-circle-fill text-danger fs-5"></i>
            <div class="small">
              <strong class="text-danger">Order Cancelled</strong>
              <span class="text-muted ms-1">${order.cancelReason || 'Cancelled upon request.'}</span>
            </div>
          </div>
        ` : `
          <!-- 4-Stage Stepper -->
          <div class="order-stepper">
            <div class="order-stepper-track"></div>
            <div class="stepper-progress-bar" style="width: ${progressWidth};"></div>

            <div class="step-item ${step1}">
              <div class="step-circle"><i class="bi bi-bag-check"></i></div>
              <span class="step-label">Order Placed</span>
            </div>

            <div class="step-item ${step2}">
              <div class="step-circle"><i class="bi bi-scissors"></i></div>
              <span class="step-label">In Crafting</span>
            </div>

            <div class="step-item ${step3}">
              <div class="step-circle"><i class="bi bi-truck"></i></div>
              <span class="step-label">Out for Delivery</span>
            </div>

            <div class="step-item ${step4}">
              <div class="step-circle"><i class="bi bi-check2-circle"></i></div>
              <span class="step-label">Delivered</span>
            </div>
          </div>
        `}

        <!-- Action Buttons Footer -->
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top mt-2">
          <button class="btn btn-sm btn-bloom-outline px-3 py-1 rounded-pill" onclick="viewCustomerReceipt('${order.orderId}')" style="font-size: 0.825rem;">
            <i class="bi bi-eye me-1"></i> View Details
          </button>

          ${canCancel ? `
            <button class="btn btn-sm btn-outline-danger px-3 py-1 rounded-pill" onclick="handleCustomerCancelOrder('${order.orderId}')" style="font-size: 0.825rem;">
              <i class="bi bi-x-circle me-1"></i> Cancel Order
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function handleCustomerCancelOrder(orderId) {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: 'Cancel Order?',
      text: `Are you sure you want to cancel #${orderId}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Cancel Order',
      cancelButtonText: 'No, Keep Order',
      customClass: { popup: 'compact-swal-popup' },
      width: '360px'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelCustomerOrder(orderId, 'Cancelled by customer.');
        renderPlacedOrders();
        updateCartAndOrderCounts();

        Swal.fire({
          icon: 'success',
          title: 'Order Cancelled',
          text: 'Your order has been cancelled.',
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: 'compact-swal-popup' },
          width: '320px'
        });
      }
    });
  } else {
    if (confirm(`Cancel Order #${orderId}?`)) {
      cancelCustomerOrder(orderId);
      renderPlacedOrders();
      updateCartAndOrderCounts();
    }
  }
}

function viewCustomerReceipt(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;

  const firstItem = order.items && order.items[0] ? order.items[0] : {};
  const orderFlowers = firstItem.flowerDetails ? firstItem.flowerDetails.join(', ') : (firstItem.name || 'Custom Bouquet');
  const orderFillers = firstItem.fillerDetails ? firstItem.fillerDetails.join(', ') : 'Standard Fillers';
  const orderWrapper = firstItem.wrapper || 'Standard Wrapper';
  const orderRibbon = firstItem.ribbon || 'Standard Ribbon';
  const orderAddons = firstItem.addOns && firstItem.addOns.length > 0 ? firstItem.addOns.map(a => a.name).join(', ') : 'None';
  const inspoPhotoHTML = firstItem.inspoPhoto ? `<div class="mt-2 text-start"><strong>📷 Inspo Photo Reference:</strong><br><img src="${firstItem.inspoPhoto}" style="max-height: 90px; border-radius: 8px; border: 1px solid #e8839b;" /></div>` : '';

  if (typeof Swal !== 'undefined') {
    Swal.fire({
      title: `<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100 border-bottom pb-2">
        <span class="fs-6 fw-bold text-dark font-monospace">#${order.orderId}</span>
        <span class="badge badge-status-${(order.status || 'Order Placed').replace(/\s+/g, '')} px-2.5 py-1 rounded-pill fs-8 fw-semibold">${order.status || 'Order Placed'}</span>
      </div>`,
      html: `
        <div class="text-start" style="font-family: 'Poppins', sans-serif; color: #2d2428; font-size: 0.8rem; line-height: 1.5;">
          <div class="p-2.5 rounded-3 mb-2 bg-white border" style="border-color: #f0e2e7 !important;">
            <div class="fw-bold text-dark mb-1 pb-1 border-bottom d-flex align-items-center gap-1.5" style="font-size: 0.82rem;">
              <i class="bi bi-person me-1 text-danger"></i> Customer & Delivery Details
            </div>
            <div><strong>Recipient:</strong> ${order.customerName} <span class="text-muted">(${order.contactNumber || 'N/A'})</span></div>
            <div><strong>Location:</strong> ${order.location || 'N/A'}</div>
            <div><strong>Needed Slot:</strong> ${order.dateNeeded || 'N/A'} (${order.timeNeeded || 'N/A'})</div>
            <div><strong>Mode:</strong> ${order.fulfillmentMode || 'Delivery'}</div>
          </div>

          <div class="p-2.5 rounded-3 mb-2 bg-white border" style="border-color: #f0e2e7 !important;">
            <div class="fw-bold text-dark mb-1 pb-1 border-bottom d-flex align-items-center gap-1.5" style="font-size: 0.82rem;">
              <i class="bi bi-flower1 me-1 text-danger"></i> Bouquet Specifications
            </div>
            <div><strong>🌸 Flowers:</strong> ${orderFlowers}</div>
            <div><strong>🌿 Fillers:</strong> ${orderFillers}</div>
            <div><strong>🎁 Packaging:</strong> ${orderWrapper} (Wrapper) • ${orderRibbon} (Ribbon)</div>
            <div><strong>✨ Add-ons:</strong> ${orderAddons}</div>
            ${inspoPhotoHTML}
          </div>

          <div class="p-2.5 rounded-3 bg-white border" style="border-color: #f0e2e7 !important;">
            <div class="d-flex justify-content-between align-items-center">
              <span>Payment: <strong>${order.paymentMode || 'Cash'}</strong> (${order.dpOption || '50% DP'})</span>
              <span>Grand Total: <strong class="fs-6 text-dark">${formatCurrency(order.grandTotal)}</strong></span>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-1 mt-1 border-top small text-muted">
              <span>50% Down Payment Required:</span>
              <span class="fw-bold text-danger">${formatCurrency(order.dpRequiredAmount)}</span>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#e8839b',
      width: '480px',
      customClass: { popup: 'order-details-modal' }
    });
  }
}
