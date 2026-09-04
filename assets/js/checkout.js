/**
 * CRAFT & WRAPPED HAVEN - CHECKOUT & ORDER FORM JAVASCRIPT MODULE
 * (assets/js/checkout.js)
 */

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

  if (modeSelect && locationLabel) {
    modeSelect.addEventListener('change', () => {
      const mode = modeSelect.value;
      if (mode === 'Pick Up') {
        locationLabel.textContent = 'Pick Up Branch / Address *';
      } else if (mode === 'Meet Up') {
        locationLabel.textContent = 'Meet Up Location (e.g. SM Baliwag Food Court) *';
      } else {
        locationLabel.textContent = 'Delivery Address *';
      }
    });
  }
}

function renderCheckoutSummary() {
  const cart = getCart();
  const summaryContainer = document.getElementById('checkout-items-list');
  const grandTotalEl = document.getElementById('checkout-grand-total');

  if (!summaryContainer) return;

  if (cart.length === 0) {
    summaryContainer.innerHTML = `
      <div class="alert alert-warning small mb-3">
        Your cart is empty. <a href="product-details.html" class="alert-link">Build a custom bouquet</a> first.
      </div>
    `;
    if (grandTotalEl) grandTotalEl.textContent = '₱0';
    return;
  }

  let subtotal = 0;

  summaryContainer.innerHTML = cart.map(item => {
    const itemTotal = item.unitPrice * (item.quantity || 1);
    subtotal += itemTotal;

    const flowerDetailsHTML = (item.flowerDetails && item.flowerDetails.length > 0) ? `<div class="small text-dark-rose"><strong>Stems:</strong> ${item.flowerDetails.join(', ')}</div>` : '';
    const fillerDetailsHTML = (item.fillerDetails && item.fillerDetails.length > 0) ? `<div class="small text-muted"><strong>Fillers:</strong> ${item.fillerDetails.join(', ')}</div>` : '';
    const wrapperRibbonHTML = `
      <div class="small text-muted">
        <span><strong>Wrapper:</strong> ${item.wrapper || 'Standard'}</span> | 
        <span><strong>Ribbon:</strong> ${item.ribbon || 'Standard'}</span>
      </div>
    `;

    return `
      <div class="py-2 border-bottom">
        <div class="d-flex justify-content-between align-items-start">
          <h6 class="mb-0 fw-bold small">${item.name} (${item.quantity || 1}x)</h6>
          <span class="fw-bold small text-dark-rose">${formatCurrency(itemTotal)}</span>
        </div>
        <div class="small text-muted"><strong>Color Palette:</strong> ${item.color || 'Standard Choice'}</div>
        ${flowerDetailsHTML}
        ${fillerDetailsHTML}
        ${wrapperRibbonHTML}
      </div>
    `;
  }).join('');

  document.getElementById('checkout-subtotal').textContent = formatCurrency(subtotal);
  if (grandTotalEl) grandTotalEl.textContent = formatCurrency(subtotal);
}

function setupCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) {
      showToast("Your cart is empty! Please customize a bouquet to proceed.", "danger");
      return;
    }

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      showToast("Please fill in all required order form fields.", "danger");
      return;
    }

    // Form inputs
    const name = document.getElementById('full-name').value.trim();
    const date = document.getElementById('order-date').value;
    const time = document.getElementById('order-time').value;
    const fulfillmentMode = document.getElementById('fulfillment-mode').value;
    const location = document.getElementById('order-location').value.trim();
    const contact = document.getElementById('contact-number').value.trim();
    const paymentMode = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Cash';
    const dpOption = document.querySelector('input[name="dpOption"]:checked')?.value || '50% Down Payment';

    const grandTotal = cart.reduce((sum, i) => sum + (i.unitPrice * (i.quantity || 1)), 0);
    const dpRequiredAmount = Math.round(grandTotal * 0.5);

    // Format sample order recap
    const firstItem = cart[0];
    const orderFlowers = firstItem.flowerDetails ? firstItem.flowerDetails.join('\n') : firstItem.name;
    const orderFillers = firstItem.fillerDetails ? firstItem.fillerDetails.join('\n') : 'Standard Fillers';
    const orderWrapper = firstItem.wrapper || 'Standard Wrapper';
    const orderRibbon = firstItem.ribbon || 'Standard Ribbon';
    const orderAddons = firstItem.addOns && firstItem.addOns.length > 0 ? firstItem.addOns.map(a => a.name).join(', ') : 'None';

    const orderId = 'CWH-' + Math.floor(100000 + Math.random() * 900000);

    // Persist Order for Admin Panel
    const orderRecord = {
      orderId: orderId,
      customerName: name,
      dateNeeded: date,
      timeNeeded: time,
      fulfillmentMode: fulfillmentMode,
      location: location,
      contactNumber: contact,
      paymentMode: paymentMode,
      dpOption: dpOption,
      items: cart,
      grandTotal: grandTotal,
      dpRequiredAmount: dpRequiredAmount,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    let existingOrders = JSON.parse(localStorage.getItem('flower_orders') || '[]');
    existingOrders.unshift(orderRecord);
    localStorage.setItem('flower_orders', JSON.stringify(existingOrders));

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: `Order #${orderId}`,
        html: `
          <div class="text-start bg-light p-2.5 rounded-3 border small" style="line-height: 1.5; font-size: 0.82rem;">
            <div class="mb-2 pb-1.5 border-bottom">
              <div><strong>Recipient:</strong> ${name} (${contact})</div>
              <div><strong>Location:</strong> ${location}</div>
              <div><strong>Slot:</strong> ${date} (${time}) [${fulfillmentMode}]</div>
              <div><strong>Terms:</strong> ${paymentMode} (${dpOption})</div>
            </div>

            <div class="mb-2 pb-1.5 border-bottom">
              <div><strong>Items:</strong> ${orderFlowers}</div>
              <div>Wrapper: ${orderWrapper} • Ribbon: ${orderRibbon}</div>
              ${orderAddons !== 'None' ? `<div>Add-ons: ${orderAddons}</div>` : ''}
            </div>

            <div class="d-flex justify-content-between fw-bold text-dark fs-6">
              <span>Total:</span>
              <span class="text-danger">${formatCurrency(grandTotal)}</span>
            </div>
            <div class="d-flex justify-content-between text-muted" style="font-size: 0.76rem;">
              <span>50% Down Payment:</span>
              <span class="fw-semibold text-danger">${formatCurrency(dpRequiredAmount)}</span>
            </div>
          </div>
          <div class="alert alert-warning py-1.5 px-2.5 small mt-2 mb-0" style="font-size: 0.76rem;">
            <i class="bi bi-info-circle me-1"></i> Send your 50% DP receipt to Facebook page to confirm.
          </div>
        `,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-truck me-1"></i> Track Order',
        cancelButtonText: 'Home',
        confirmButtonColor: '#e8839b',
        cancelButtonColor: '#6c757d',
        width: '420px',
        customClass: { popup: 'compact-swal-popup' }
      }).then((result) => {
        clearCart();
        if (result.isConfirmed) {
          window.location.href = 'cart.html?tab=orders';
        } else {
          window.location.href = 'index.html';
        }
      });
    } else {
      // Fallback modal
      document.getElementById('modal-order-id').textContent = orderId;
      document.getElementById('modal-customer-name').textContent = name;
      document.getElementById('modal-slot').textContent = `${date} (${time}) [${fulfillmentMode}]`;
      document.getElementById('modal-location').textContent = location;
      document.getElementById('modal-contact').textContent = contact;
      document.getElementById('modal-payment').textContent = `${paymentMode} (${dpOption})`;
      document.getElementById('modal-total').textContent = formatCurrency(grandTotal);
      document.getElementById('modal-dp-amount').textContent = formatCurrency(dpRequiredAmount);

      document.getElementById('modal-order-flowers').textContent = orderFlowers;
      document.getElementById('modal-order-fillers').textContent = orderFillers;
      document.getElementById('modal-order-wrapper').textContent = orderWrapper;
      document.getElementById('modal-order-ribbon').textContent = orderRibbon;
      document.getElementById('modal-order-addons').textContent = orderAddons;

      const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
      modal.show();
      clearCart();
    }
  });
}
