document.addEventListener('DOMContentLoaded', () => {
  const buyer = typeof getActiveBuyer === 'function' ? getActiveBuyer() : null;
  if (!buyer) {
    setTimeout(() => {
      promptLoginToAddCart();
    }, 350);
  }
  setupMinDeliveryDate();
  renderCheckoutSummary();
  setupFulfillmentToggle();
  setupCheckoutForm();
  autofillBuyerCheckoutInfo();
});

function autofillBuyerCheckoutInfo() {
  const buyer = typeof getActiveBuyer === 'function' ? getActiveBuyer() : null;
  if (buyer) {
    const nameInput = document.getElementById('full-name');
    const contactInput = document.getElementById('contact-number');
    if (nameInput && !nameInput.value) nameInput.value = buyer.name;
    if (contactInput && !contactInput.value) contactInput.value = buyer.mobile;
  }
}

function setupMinDeliveryDate() {
  const dateInput = document.getElementById('order-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
}

function setupFulfillmentToggle() {
  const modeSelect = document.getElementById('fulfillment-mode');
  const locationLabel = document.getElementById('location-label');
  const locationInput = document.getElementById('order-location');

  if (modeSelect && locationLabel) {
    modeSelect.addEventListener('change', () => {
      const mode = modeSelect.value;
      if (mode === 'Pick Up') {
        locationLabel.textContent = 'Pick Up Branch / Studio Address *';
        if (locationInput) {
          locationInput.placeholder = 'Craft & Wrapped Haven Studio - Paralan, Concepcion, Pampanga (Mon-Sat 9AM-7PM)';
          if (!locationInput.value.trim() || locationInput.value.includes('House No.') || locationInput.value.includes('SM Baliwag')) {
            locationInput.value = 'Craft & Wrapped Haven Studio, Paralan, Concepcion, Pampanga';
          }
        }
      } else if (mode === 'Meet Up') {
        locationLabel.textContent = 'Designated Meet Up Point *';
        if (locationInput) {
          locationInput.placeholder = 'e.g. SM Baliwag Main Entrance, Concepcion Town Plaza, or Waltermart';
          if (locationInput.value.includes('Craft & Wrapped Haven Studio')) {
            locationInput.value = '';
          }
        }
      } else {
        locationLabel.textContent = 'Delivery Address *';
        if (locationInput) {
          locationInput.placeholder = 'e.g. House No., Street, Barangay, Municipality/City, Landmark';
          if (locationInput.value.includes('Craft & Wrapped Haven Studio')) {
            locationInput.value = '';
          }
        }
      }
    });
  }
}

function getCheckoutItems() {
  const urlParams = new URLSearchParams(window.location.search);
  const isDirect = urlParams.get('direct') === '1' || sessionStorage.getItem('cwh_direct_order');

  if (isDirect) {
    try {
      const directData = sessionStorage.getItem('cwh_direct_order');
      if (directData) {
        const items = JSON.parse(directData);
        if (Array.isArray(items) && items.length > 0) {
          return items;
        }
      }
    } catch (e) {}
  }

  return getCart();
}

function renderCheckoutSummary() {
  const checkoutItems = getCheckoutItems();
  const summaryContainer = document.getElementById('checkout-items-list');
  const grandTotalEl = document.getElementById('checkout-grand-total');

  if (!summaryContainer) return;

  if (checkoutItems.length === 0) {
    summaryContainer.innerHTML = `
      <div class="alert alert-warning small mb-3">
        Your order is empty. <a href="product-details.html" class="alert-link">Build a custom bouquet</a> first.
      </div>
    `;
    if (grandTotalEl) grandTotalEl.textContent = '₱0';
    const subtotalEl = document.getElementById('checkout-subtotal');
    if (subtotalEl) subtotalEl.textContent = '₱0';
    return;
  }

  let subtotal = 0;

  const parseStem = (str) => {
    const match = str.match(/^(.+?)(?:\s*\((?:(\d+x|\d+\s*pcs?))?\s*(?:@\s*([^)]+))?\))?$/);
    if (!match) return { name: str, qty: '1x', price: '' };
    const name = match[1].trim();
    const qty = match[2] ? match[2].trim() : '1x';
    const price = match[3] ? match[3].trim() : '';
    return { name, qty, price };
  };

  const clearMultiNotice = checkoutItems.length > 1 ? `
    <div class="d-flex justify-content-between align-items-center py-1.5 px-2 mb-2 rounded bg-light border" style="font-size: 0.78rem;">
      <span class="text-muted"><i class="bi bi-bag-check me-1"></i>${checkoutItems.length} items in order</span>
      <button type="button" class="btn btn-sm text-danger p-0 border-0 fw-semibold" onclick="clearAllCheckoutItems()" style="font-size: 0.78rem;">
        <i class="bi bi-trash me-1"></i>Clear all
      </button>
    </div>
  ` : '';

  summaryContainer.innerHTML = clearMultiNotice + checkoutItems.map((item, index) => {
    const itemTotal = item.unitPrice * (item.quantity || 1);
    subtotal += itemTotal;

    let itemsListHTML = '';

    if (item.flowerDetails && item.flowerDetails.length > 0) {
      item.flowerDetails.forEach(str => {
        const s = parseStem(str);
        itemsListHTML += `
          <div class="d-flex justify-content-between align-items-center py-1 text-dark" style="font-size: 0.88rem;">
            <span>${s.name} <small class="text-muted fw-normal">${s.qty}</small></span>
            <span class="fw-semibold text-dark">${s.price}</span>
          </div>
        `;
      });
    }

    if (item.fillerDetails && item.fillerDetails.length > 0) {
      item.fillerDetails.forEach(str => {
        const s = parseStem(str);
        itemsListHTML += `
          <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.84rem;">
            <span>${s.name} <small class="text-muted fw-normal">${s.qty}</small></span>
            <span class="fw-semibold">${s.price || 'Included'}</span>
          </div>
        `;
      });
    }

    if (item.addOns && item.addOns.length > 0) {
      item.addOns.forEach(addon => {
        itemsListHTML += `
          <div class="d-flex justify-content-between align-items-center py-1 text-dark" style="font-size: 0.85rem;">
            <span>${addon.name}</span>
            <span class="fw-semibold text-dark-rose">+${formatCurrency(addon.price)}</span>
          </div>
        `;
      });
    }

    if (item.wrapper) {
      itemsListHTML += `
        <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.85rem;">
          <span>Wrapper: ${item.wrapper}</span>
          <span class="fw-semibold">${item.wrapperCost > 0 ? '+₱' + item.wrapperCost : 'Included'}</span>
        </div>
      `;
    }

    if (item.ribbon) {
      itemsListHTML += `
        <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.85rem;">
          <span>Ribbon: ${item.ribbon}</span>
          <span class="fw-semibold">Included</span>
        </div>
      `;
    }

    if (item.color && item.color !== 'Custom Choice') {
      itemsListHTML += `
        <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.85rem;">
          <span>Color Palette: ${item.color}</span>
          <span class="fw-semibold">Custom</span>
        </div>
      `;
    }

    if (!itemsListHTML) {
      itemsListHTML = `
        <div class="d-flex justify-content-between align-items-center py-1 text-dark" style="font-size: 0.88rem;">
          <span>${item.name} <small class="text-muted fw-normal">${item.quantity || 1}x</small></span>
          <span class="fw-semibold text-dark">${formatCurrency(itemTotal)}</span>
        </div>
      `;
    }

    return `
      <div class="py-2.5 border-bottom">
        <div class="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom">
          <span class="fw-bold text-dark-rose small">${item.name}</span>
          <div class="d-flex align-items-center gap-2">
            <span class="fw-bold small text-dark">${formatCurrency(itemTotal)}</span>
            <button type="button" class="btn btn-sm text-danger p-0 border-0" onclick="removeCheckoutItem(${index})" title="Remove item from order" style="line-height: 1;">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        ${itemsListHTML}
      </div>
    `;
  }).join('');

  document.getElementById('checkout-subtotal').textContent = formatCurrency(subtotal);
  if (grandTotalEl) grandTotalEl.textContent = formatCurrency(subtotal);
}

function removeCheckoutItem(index) {
  const isDirect = sessionStorage.getItem('cwh_direct_order');

  if (isDirect) {
    try {
      let items = JSON.parse(sessionStorage.getItem('cwh_direct_order') || '[]');
      items.splice(index, 1);
      if (items.length === 0) {
        sessionStorage.removeItem('cwh_direct_order');
      } else {
        sessionStorage.setItem('cwh_direct_order', JSON.stringify(items));
      }
    } catch (e) {}
  } else {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  renderCheckoutSummary();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  showToast("Item removed from order", "success");
}

function clearAllCheckoutItems() {
  sessionStorage.removeItem('cwh_direct_order');
  clearCart();
  renderCheckoutSummary();
  if (typeof updateCartBadge === 'function') updateCartBadge();
  showToast("Order items cleared", "success");
}

function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkoutItems = getCheckoutItems();
    if (checkoutItems.length === 0) {
      showToast("Your order is empty! Please customize a bouquet to proceed.", "danger");
      return;
    }

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      showToast("Please fill in all required order form fields.", "danger");
      return;
    }

    const name = document.getElementById('full-name').value.trim();
    const date = document.getElementById('order-date').value;
    const time = document.getElementById('order-time').value;
    const fulfillmentMode = document.getElementById('fulfillment-mode').value;
    const location = document.getElementById('order-location').value.trim();
    const contact = document.getElementById('contact-number').value.trim();
    const notes = document.getElementById('order-notes')?.value.trim() || '';
    const paymentMode = 'Cash';
    const dpOption = 'Cash on Delivery / Pick Up';

    // QA Validation: Ensure contact number contains at least 10 digits
    const cleanedContact = contact.replace(/\D/g, '');
    if (cleanedContact.length < 10) {
      showToast("Please enter a valid contact number (at least 10 digits).", "warning");
      const contactEl = document.getElementById('contact-number');
      if (contactEl) contactEl.focus();
      return;
    }

    const grandTotal = checkoutItems.reduce((sum, i) => sum + (i.unitPrice * (i.quantity || 1)), 0);

    const firstItem = checkoutItems[0];
    const orderFlowers = firstItem.flowerDetails ? firstItem.flowerDetails.join('\n') : firstItem.name;
    const orderFillers = firstItem.fillerDetails ? firstItem.fillerDetails.join('\n') : 'Standard Fillers';
    const orderWrapper = firstItem.wrapper || 'Standard Wrapper';
    const orderRibbon = firstItem.ribbon || 'Standard Ribbon';
    const orderAddons = firstItem.addOns && firstItem.addOns.length > 0 ? firstItem.addOns.map(a => a.name).join(', ') : 'None';

    const orderId = 'CWH-' + Math.floor(100000 + Math.random() * 900000);

    const orderRecord = {
      orderId: orderId,
      customerName: name,
      dateNeeded: date,
      timeNeeded: time,
      fulfillmentMode: fulfillmentMode,
      location: location,
      contactNumber: contact,
      notes: notes,
      paymentMode: paymentMode,
      dpOption: dpOption,
      items: checkoutItems,
      grandTotal: grandTotal,
      dpRequiredAmount: 0,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    let existingOrders = JSON.parse(localStorage.getItem('flower_orders') || '[]');
    existingOrders.unshift(orderRecord);
    localStorage.setItem('flower_orders', JSON.stringify(existingOrders));

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Order Placed Successfully!',
        html: `
          <div class="mb-3">
            <span class="badge rounded-pill bg-pink-soft text-dark-rose px-3 py-1 fw-bold" style="font-size: 0.88rem; letter-spacing: 0.5px;">Order #${orderId}</span>
          </div>

          <div class="text-start p-3 rounded-3 border" style="font-size: 0.88rem; border-color: #eedde4 !important; background-color: #fffbfc;">
            <div class="d-flex justify-content-between py-1.5 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Customer:</span>
              <span class="fw-semibold text-dark text-end">${name}</span>
            </div>
            <div class="d-flex justify-content-between py-1.5 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Contact:</span>
              <span class="fw-semibold text-dark text-end">${contact}</span>
            </div>
            <div class="d-flex justify-content-between py-1.5 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Location:</span>
              <span class="fw-semibold text-dark text-end text-truncate ms-2" style="max-width: 250px;" title="${location}">${location}</span>
            </div>
            <div class="d-flex justify-content-between py-1.5 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Schedule:</span>
              <span class="fw-semibold text-dark text-end">${date} • ${fulfillmentMode}</span>
            </div>
            <div class="py-2 border-bottom" style="border-color: #f4e8ed !important;">
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted">Bouquet:</span>
                <span class="fw-semibold text-dark text-end">${firstItem.name}</span>
              </div>
              <div class="small text-muted text-end mt-0.5" style="font-size: 0.8rem;">Wrapper: ${orderWrapper} • Ribbon: ${orderRibbon}</div>
              ${orderAddons !== 'None' ? `<div class="small text-dark-rose text-end mt-0.5" style="font-size: 0.8rem;">Add-ons: ${orderAddons}</div>` : ''}
              ${notes ? `<div class="small text-secondary text-end mt-1 fst-italic" style="font-size: 0.8rem;"><i class="bi bi-chat-left-quote me-1"></i>Note: "${notes}"</div>` : ''}
            </div>
            <div class="d-flex justify-content-between py-1.5 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Payment:</span>
              <span class="fw-semibold text-success text-end"><i class="bi bi-cash-stack me-1"></i>Cash on Delivery / Pick Up</span>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-2.5">
              <span class="fw-bold text-dark fs-6">Total Amount:</span>
              <span class="fw-bold fs-5 text-dark-rose">${formatCurrency(grandTotal)}</span>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-truck me-1.5"></i> Track Order',
        cancelButtonText: '<i class="bi bi-house me-1.5"></i> Home',
        confirmButtonColor: '#e8839b',
        cancelButtonColor: '#6c757d',
        customClass: { popup: 'receipt-swal-popup' }
      }).then((result) => {
        sessionStorage.removeItem('cwh_direct_order');
        clearCart();
        if (result.isConfirmed) {
          window.location.href = 'cart.html?tab=orders';
        } else {
          window.location.href = 'index.html';
        }
      });
    } else {
      document.getElementById('modal-order-id').textContent = orderId;
      document.getElementById('modal-customer-name').textContent = name;
      document.getElementById('modal-slot').textContent = `${date} (${time}) [${fulfillmentMode}]`;
      document.getElementById('modal-location').textContent = location;
      document.getElementById('modal-contact').textContent = contact;
      document.getElementById('modal-payment').textContent = 'Cash on Delivery / Pick Up';
      document.getElementById('modal-total').textContent = formatCurrency(grandTotal);
      if (document.getElementById('modal-dp-amount')) document.getElementById('modal-dp-amount').textContent = 'N/A (Cash)';

      document.getElementById('modal-order-flowers').textContent = orderFlowers;
      document.getElementById('modal-order-fillers').textContent = orderFillers;
      document.getElementById('modal-order-wrapper').textContent = orderWrapper;
      document.getElementById('modal-order-ribbon').textContent = orderRibbon;
      document.getElementById('modal-order-addons').textContent = orderAddons;

      const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
      modal.show();
      sessionStorage.removeItem('cwh_direct_order');
      clearCart();
    }
  });
}
