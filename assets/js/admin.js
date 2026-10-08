let currentAdminView = 'orders';
let currentFilter = 'ALL';
let searchQuery = '';
let selectedCustomerEmail = null;
let chatSearchQuery = '';
let flowerCategoryFilter = 'ALL';
let flowerSearchQuery = '';
let customerSearchQuery = '';
let customerFilter = 'ALL';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isPreview = urlParams.get('preview') === '1';

  if (sessionStorage.getItem('cwh_admin_auth') !== 'true' && !isPreview) {
    window.location.href = 'index.html';
    return;
  }

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Logout Admin?',
        text: 'Are you sure you want to end your admin session?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e8839b',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, Logout',
        customClass: { popup: 'compact-swal-popup' },
        width: '380px'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.removeItem('cwh_admin_auth');
          localStorage.removeItem('cwh_active_buyer');
          window.location.href = 'index.html';
        }
      });
    });
  }

  const searchInput = document.getElementById('admin-order-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderAdminDashboard();
    });
  }

  const tabs = document.querySelectorAll('#order-filter-tabs .nav-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-status');
      renderAdminDashboard();
    });
  });

  const flowerSearchInput = document.getElementById('admin-flower-search');
  if (flowerSearchInput) {
    flowerSearchInput.addEventListener('input', (e) => {
      flowerSearchQuery = e.target.value.toLowerCase().trim();
      renderAdminFlowers();
    });
  }

  const flowerTabs = document.querySelectorAll('#flower-filter-tabs .nav-link');
  flowerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      flowerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      flowerCategoryFilter = tab.getAttribute('data-cat');
      renderAdminFlowers();
    });
  });

  const customerSearchInput = document.getElementById('admin-customer-search');
  if (customerSearchInput) {
    customerSearchInput.addEventListener('input', (e) => {
      customerSearchQuery = e.target.value.toLowerCase().trim();
      renderAdminCustomers();
    });
  }

  const customerTabs = document.querySelectorAll('#customer-filter-tabs .nav-link');
  customerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      customerTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      customerFilter = tab.getAttribute('data-status');
      renderAdminCustomers();
    });
  });

  renderAdminDashboard();
  initAdminChatList();
  renderAdminFlowers();
  renderAdminCustomers();
  updateSidebarBadges();

  if (sessionStorage.getItem('cwh_admin_just_logged_in') === 'true') {
    sessionStorage.removeItem('cwh_admin_just_logged_in');
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back, Admin!',
        text: 'Access to Orders Dashboard Granted',
        showConfirmButton: false,
        timer: 1500,
        width: '320px',
        customClass: { popup: 'compact-swal-popup' }
      });
    }, 150);
  }

  // Keyboard shortcut: Escape key clears active search filter
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (searchQuery || flowerSearchQuery || customerSearchQuery)) {
      searchQuery = '';
      flowerSearchQuery = '';
      customerSearchQuery = '';
      if (searchInput) searchInput.value = '';
      if (flowerSearchInput) flowerSearchInput.value = '';
      if (customerSearchInput) customerSearchInput.value = '';
      renderAdminDashboard();
      renderAdminFlowers();
      renderAdminCustomers();
    }
  });
});

function switchAdminView(view) {
  currentAdminView = view;

  const ordersSec = document.getElementById('orders-view-section');
  const chatSec = document.getElementById('chat-view-section');
  const productsSec = document.getElementById('products-view-section');
  const customersSec = document.getElementById('customers-view-section');
  const navOrdersBtn = document.getElementById('nav-orders-btn');
  const navChatBtn = document.getElementById('nav-chat-btn');
  const navProductsBtn = document.getElementById('nav-products-btn');
  const navCustomersBtn = document.getElementById('nav-customers-btn');

  if (ordersSec) ordersSec.style.display = view === 'orders' ? 'block' : 'none';
  if (chatSec) chatSec.style.display = view === 'chat' ? 'block' : 'none';
  if (productsSec) productsSec.style.display = view === 'products' ? 'block' : 'none';
  if (customersSec) customersSec.style.display = view === 'customers' ? 'block' : 'none';

  if (navOrdersBtn) navOrdersBtn.classList.toggle('active', view === 'orders');
  if (navChatBtn) navChatBtn.classList.toggle('active', view === 'chat');
  if (navProductsBtn) navProductsBtn.classList.toggle('active', view === 'products');
  if (navCustomersBtn) navCustomersBtn.classList.toggle('active', view === 'customers');

  if (view === 'orders') {
    renderAdminDashboard();
  } else if (view === 'chat') {
    initAdminChatList();
  } else if (view === 'products') {
    renderAdminFlowers();
  } else if (view === 'customers') {
    renderAdminCustomers();
  }

  updateSidebarBadges();
}

function updateSidebarBadges() {
  const orders = getOrders();
  const badgeOrders = document.getElementById('badge-nav-orders');
  if (badgeOrders) {
    badgeOrders.textContent = orders.length;
  }

  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  const badgeChats = document.getElementById('badge-nav-chats');
  if (badgeChats) {
    badgeChats.textContent = buyers.length;
  }

  const badgeCustomers = document.getElementById('badge-nav-customers');
  if (badgeCustomers) {
    badgeCustomers.textContent = buyers.length;
  }

  const catalog = typeof getStoreCatalog === 'function' ? getStoreCatalog() : [];
  const badgeProducts = document.getElementById('badge-nav-products');
  if (badgeProducts) {
    badgeProducts.textContent = catalog.length;
  }
}

function getOrders() {
  const data = localStorage.getItem('flower_orders');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem('flower_orders', JSON.stringify(orders));
  updateSidebarBadges();
}

function renderAdminDashboard() {
  const orders = getOrders();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Order Placed').length;
  const confirmedOrders = orders.filter(o => o.status === 'Confirmed' || o.status === 'In Crafting').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled' && o.status !== 'Pending' && o.status !== 'Order Placed')
    .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

  const statTotal = document.getElementById('stat-total-orders');
  const statPending = document.getElementById('stat-pending-orders');
  const statConfirmed = document.getElementById('stat-confirmed-orders');
  const statRevenue = document.getElementById('stat-total-revenue');

  if (statTotal) statTotal.textContent = totalOrders;
  if (statPending) statPending.textContent = pendingOrders;
  if (statConfirmed) statConfirmed.textContent = confirmedOrders;
  if (statRevenue) statRevenue.textContent = formatCurrency(totalRevenue);

  let filtered = orders;
  if (currentFilter !== 'ALL') {
    filtered = filtered.filter(o => {
      const st = o.status || 'Order Placed';
      if (currentFilter === 'Order Placed') return st === 'Order Placed' || st === 'Pending';
      if (currentFilter === 'In Crafting') return st === 'In Crafting' || st === 'Confirmed';
      if (currentFilter === 'Out for Delivery') return st === 'Out for Delivery' || st === 'Delivery' || st === 'Meet up / Pick up' || st === 'Pickup';
      if (currentFilter === 'Delivered') return st === 'Delivered' || st === 'Completed';
      if (currentFilter === 'Cancelled') return st === 'Cancelled';
      return st === currentFilter;
    });
  }
  if (searchQuery !== '') {
    filtered = filtered.filter(o => {
      const matchId = (o.orderId || '').toLowerCase().includes(searchQuery);
      const matchName = (o.customerName || '').toLowerCase().includes(searchQuery);
      const matchContact = (o.contactNumber || '').toLowerCase().includes(searchQuery);
      const matchLocation = (o.location || '').toLowerCase().includes(searchQuery);
      return matchId || matchName || matchContact || matchLocation;
    });
  }

  const container = document.getElementById('orders-list-container');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 bg-white rounded-3 border p-4" style="border-color: #f0e2e7 !important;">
        <i class="bi bi-inbox text-muted display-6"></i>
        <h5 class="fw-semibold text-dark mt-2 mb-1">No Orders Found</h5>
        <p class="text-muted small mb-3">${searchQuery ? 'No results matched your search query.' : 'Customer orders will appear here automatically.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(order => {
    const formattedDate = new Date(order.createdAt || Date.now()).toLocaleString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const status = order.status || 'Order Placed';
    const isOrderPlaced = status === 'Order Placed' || status === 'Pending';
    const isInCrafting = status === 'In Crafting' || status === 'Confirmed';
    const isOutForDelivery = status === 'Out for Delivery' || status === 'Delivery' || status === 'Meet up / Pick up' || status === 'Pickup';

    let quickActionBtn = '';
    if (isOrderPlaced) {
      quickActionBtn = `
        <button class="btn btn-sm btn-admin-confirm" onclick="quickUpdateStatus('${order.orderId}', 'In Crafting')" title="Confirm and Start Crafting">
          <i class="bi bi-check-circle-fill me-1"></i> Confirm
        </button>
      `;
    } else if (isInCrafting) {
      quickActionBtn = `
        <button class="btn btn-sm btn-primary rounded-pill px-3 py-1" onclick="quickUpdateStatus('${order.orderId}', 'Out for Delivery')" title="Mark as Out for Delivery">
          <i class="bi bi-truck me-1"></i> Deliver
        </button>
      `;
    } else if (isOutForDelivery) {
      quickActionBtn = `
        <button class="btn btn-sm btn-success rounded-pill px-3 py-1" onclick="quickUpdateStatus('${order.orderId}', 'Delivered')" title="Mark as Delivered">
          <i class="bi bi-check2-circle me-1"></i> Complete
        </button>
      `;
    }

    return `
      <div class="order-card-clean p-3 mb-2 rounded-3 bg-white border" style="border-color: #eedde4 !important;">
        <div class="row align-items-center g-2">
          <div class="col-12 col-md-5">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="fw-bold font-monospace text-dark fs-6">#${order.orderId}</span>
              <span class="status-badge status-${status.replace(/\s+/g, '')}">${status}</span>
            </div>
            <div class="fw-bold text-dark" style="font-size: 0.92rem;">${order.customerName}</div>
            <div class="small text-muted" style="font-size: 0.78rem;">${formattedDate} • <span class="fw-semibold text-dark-rose">${order.fulfillmentMode || 'Pick Up'}</span></div>
          </div>

          <div class="col-6 col-md-3 text-start text-md-center">
            <div class="small text-muted" style="font-size: 0.74rem;">Total Amount</div>
            <div class="fw-bold fs-5 text-dark-rose">${formatCurrency(order.grandTotal)}</div>
          </div>

          <div class="col-6 col-md-4 text-end d-flex justify-content-end align-items-center gap-2">
            ${quickActionBtn}
            <button class="btn btn-sm btn-admin-view-white rounded-pill px-3 py-1" onclick="viewOrderDetails('${order.orderId}')" title="View Order Details">
              <i class="bi bi-eye text-pink me-1"></i> View
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function quickUpdateStatus(orderId, newStatus) {
  let title = 'Update Order Status?';
  let text = `Change status of Order #${orderId} to "${newStatus}"?`;
  let confirmBtnText = 'Yes, Update';
  let confirmColor = '#e8839b';

  if (newStatus === 'In Crafting') {
    title = 'Accept Order?';
    text = `Accept Order #${orderId} and start crafting?`;
    confirmBtnText = 'Yes, Accept Order';
    confirmColor = '#22c55e';
  } else if (newStatus === 'Out for Delivery') {
    title = 'Dispatch for Delivery?';
    text = `Mark Order #${orderId} as Out for Delivery / Ready for Pickup?`;
    confirmBtnText = 'Yes, Dispatch';
    confirmColor = '#0d6efd';
  } else if (newStatus === 'Delivered') {
    title = 'Mark as Delivered?';
    text = `Confirm that Order #${orderId} has been successfully completed and delivered?`;
    confirmBtnText = 'Yes, Complete Order';
    confirmColor = '#198754';
  }

  Swal.fire({
    title: title,
    text: text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmBtnText,
    confirmButtonColor: confirmColor,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    customClass: { popup: 'compact-swal-popup' }
  }).then((result) => {
    if (result.isConfirmed) {
      applyOrderStatusChange(orderId, newStatus);
    }
  });
}

function viewOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;

  const firstItem = order.items && order.items[0] ? order.items[0] : {};
  const parseStem = (str) => {
    if (!str) return { name: '', qty: '1x', price: '' };
    let match = str.match(/^(.+?)(?:\s*\((?:(\d+x|\d+\s*pcs?))?\s*(?:[@\-]\s*([^)]+))?\))$/);
    if (match) {
      return {
        name: match[1].trim(),
        qty: match[2] ? match[2].trim() : '1x',
        price: match[3] ? match[3].trim() : ''
      };
    }
    match = str.match(/^(.+?)(?:\s*\((?:(\d+x|\d+\s*pcs?))\))?\s*(?:[-@]\s*(.+))?$/);
    if (match) {
      return {
        name: match[1].trim(),
        qty: match[2] ? match[2].trim() : '1x',
        price: match[3] ? match[3].trim() : ''
      };
    }
    return { name: str, qty: '1x', price: '' };
  };

  let itemsHTML = '';

  if (firstItem.flowerDetails && firstItem.flowerDetails.length > 0) {
    const rawFlowers = [];
    firstItem.flowerDetails.forEach(item => {
      if (typeof item === 'string' && item.includes('),')) {
        item.split('),').forEach((part, idx, arr) => {
          rawFlowers.push(idx < arr.length - 1 ? part.trim() + ')' : part.trim());
        });
      } else {
        rawFlowers.push(item);
      }
    });

    rawFlowers.forEach(str => {
      const s = parseStem(str);
      itemsHTML += `
        <div class="d-flex justify-content-between align-items-center py-1 text-dark" style="font-size: 0.86rem;">
          <span>${s.name} <small class="text-muted fw-normal">${s.qty}</small></span>
          <span class="fw-semibold text-dark">${s.price}</span>
        </div>
      `;
    });
  }

  if (firstItem.fillerDetails && firstItem.fillerDetails.length > 0) {
    firstItem.fillerDetails.forEach(str => {
      const s = parseStem(str);
      itemsHTML += `
        <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.84rem;">
          <span>${s.name} <small class="text-muted fw-normal">${s.qty}</small></span>
          <span class="fw-semibold">${s.price || 'Included'}</span>
        </div>
      `;
    });
  }

  if (firstItem.wrapper) {
    itemsHTML += `
      <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.84rem;">
        <span>Wrapper: ${firstItem.wrapper}</span>
        <span class="fw-semibold">${firstItem.wrapperCost > 0 ? '+₱' + firstItem.wrapperCost : 'Included'}</span>
      </div>
    `;
  }

  if (firstItem.ribbon) {
    itemsHTML += `
      <div class="d-flex justify-content-between align-items-center py-1 text-muted" style="font-size: 0.84rem;">
        <span>Ribbon: ${firstItem.ribbon}</span>
        <span class="fw-semibold">Included</span>
      </div>
    `;
  }

  if (firstItem.addOns && firstItem.addOns.length > 0) {
    firstItem.addOns.forEach(addon => {
      itemsHTML += `
        <div class="d-flex justify-content-between align-items-center py-1 text-dark" style="font-size: 0.84rem;">
          <span>${addon.name}</span>
          <span class="fw-semibold text-dark-rose">+${formatCurrency(addon.price)}</span>
        </div>
      `;
    });
  }

  if (!itemsHTML) {
    itemsHTML = `
      <div class="d-flex justify-content-between align-items-center py-1 text-dark" style="font-size: 0.86rem;">
        <span>${firstItem.name || 'Custom Bouquet'}</span>
        <span class="fw-semibold text-dark">${formatCurrency(order.grandTotal)}</span>
      </div>
    `;
  }

  const inspoPhotoHTML = firstItem.inspoPhoto ? `
    <div class="mt-2 pt-2 border-top">
      <span class="small text-muted d-block mb-1">Inspo Photo Reference:</span>
      <img src="${firstItem.inspoPhoto}" style="max-height: 85px; border-radius: 8px; border: 1px solid #eedde4;" />
    </div>
  ` : '';

  const currentStatus = order.status || 'Order Placed';
  const scheduleText = `${order.dateNeeded || 'N/A'}${order.timeNeeded ? ' (' + order.timeNeeded + ')' : ''} • ${order.fulfillmentMode || 'Pick Up'}`;

  Swal.fire({
    title: `<div class="d-flex align-items-center justify-content-between w-100 pb-2 border-bottom">
      <span class="fs-6 fw-bold text-dark font-monospace">#${order.orderId}</span>
      <span class="status-badge status-${currentStatus.replace(/\s+/g, '')}">${currentStatus}</span>
    </div>`,
    html: `
      <div class="text-start mt-2" style="font-size: 0.86rem;">
        <div class="p-3 rounded-3 border mb-2.5" style="border-color: #eedde4 !important; background-color: #fffbfc;">
          <div class="d-flex justify-content-between py-1 border-bottom" style="border-color: #f4e8ed !important;">
            <span class="text-muted">Customer:</span>
            <span class="fw-semibold text-dark text-end">${order.customerName}</span>
          </div>
          <div class="d-flex justify-content-between py-1 border-bottom" style="border-color: #f4e8ed !important;">
            <span class="text-muted">Contact:</span>
            <span class="fw-semibold text-dark text-end">${order.contactNumber || 'N/A'}</span>
          </div>
          <div class="d-flex justify-content-between py-1 border-bottom gap-2" style="border-color: #f4e8ed !important;">
            <span class="text-muted" style="white-space: nowrap;">Location:</span>
            <span class="fw-semibold text-dark text-end" style="word-break: break-word;">${order.location || 'N/A'}</span>
          </div>
          <div class="d-flex justify-content-between py-1 border-bottom gap-2" style="border-color: #f4e8ed !important;">
            <span class="text-muted" style="white-space: nowrap;">Schedule:</span>
            <span class="fw-semibold text-dark text-end">${scheduleText}</span>
          </div>

          <div class="py-2 border-bottom" style="border-color: #f4e8ed !important;">
            <div class="fw-bold text-dark-rose mb-1" style="font-size: 0.88rem;">${firstItem.name || 'Custom Bouquet'}</div>
            ${itemsHTML}
            ${inspoPhotoHTML}
          </div>

          <div class="d-flex justify-content-between py-1 border-bottom" style="border-color: #f4e8ed !important;">
            <span class="text-muted">Payment:</span>
            <span class="fw-semibold text-success text-end"><i class="bi bi-cash-stack me-1"></i>Cash on Delivery / Pick Up</span>
          </div>
          <div class="d-flex justify-content-between align-items-center pt-2">
            <span class="fw-bold text-dark fs-6">Total Amount:</span>
            <span class="fw-bold fs-5 text-dark-rose">${formatCurrency(order.grandTotal)}</span>
          </div>
        </div>

        <!-- Status Controller -->
        <div class="p-2.5 rounded-3 bg-white border" style="border-color: #eedde4 !important;">
          <label class="form-label fw-semibold mb-1.5 d-block text-dark small">
            <i class="bi bi-sliders me-1 text-pink"></i> Update Order Status:
          </label>
          <select class="form-select form-select-sm fw-semibold" id="modal-status-select" onchange="updateOrderStatus('${order.orderId}', this.value)">
            <option value="Order Placed" ${currentStatus === 'Order Placed' || currentStatus === 'Pending' ? 'selected' : ''}>1. Order Placed</option>
            <option value="In Crafting" ${currentStatus === 'In Crafting' || currentStatus === 'Confirmed' ? 'selected' : ''}>2. In Crafting</option>
            <option value="Out for Delivery" ${currentStatus === 'Out for Delivery' || currentStatus === 'Delivery' ? 'selected' : ''}>3. Out for Delivery</option>
            <option value="Delivered" ${currentStatus === 'Delivered' || currentStatus === 'Completed' ? 'selected' : ''}>4. Delivered</option>
            <option value="Cancelled" ${currentStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Delete Order',
    confirmButtonColor: '#dc3545',
    cancelButtonText: 'Close',
    cancelButtonColor: '#64748b',
    customClass: { popup: 'receipt-swal-popup' }
  }).then((result) => {
    if (result.isConfirmed) {
      deleteOrder(order.orderId);
    }
  });
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  const oldStatus = order ? order.status : 'Order Placed';
  if (oldStatus === newStatus) return;

  let title = 'Change Order Status?';
  let text = `Update Order #${orderId} from "${oldStatus}" to "${newStatus}"?`;
  let confirmBtnText = 'Yes, Update';
  let confirmColor = '#e8839b';

  if (newStatus === 'In Crafting') {
    title = 'Accept Order?';
    text = `Accept Order #${orderId} and start crafting?`;
    confirmBtnText = 'Yes, Accept Order';
    confirmColor = '#22c55e';
  } else if (newStatus === 'Out for Delivery') {
    title = 'Dispatch for Delivery?';
    text = `Mark Order #${orderId} as Out for Delivery / Ready for Pickup?`;
    confirmBtnText = 'Yes, Dispatch';
    confirmColor = '#0d6efd';
  } else if (newStatus === 'Delivered') {
    title = 'Mark as Delivered?';
    text = `Confirm that Order #${orderId} has been successfully completed and delivered?`;
    confirmBtnText = 'Yes, Complete Order';
    confirmColor = '#198754';
  } else if (newStatus === 'Cancelled') {
    title = 'Cancel Order?';
    text = `Are you sure you want to cancel Order #${orderId}?`;
    confirmBtnText = 'Yes, Cancel Order';
    confirmColor = '#dc3545';
  }

  Swal.fire({
    title: title,
    text: text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmBtnText,
    confirmButtonColor: confirmColor,
    cancelButtonText: 'No, Keep Current',
    cancelButtonColor: '#64748b',
    customClass: { popup: 'compact-swal-popup' }
  }).then((result) => {
    if (result.isConfirmed) {
      applyOrderStatusChange(orderId, newStatus);
    } else {
      const select = document.getElementById('modal-status-select');
      if (select) select.value = oldStatus;
    }
  });
}

function applyOrderStatusChange(orderId, newStatus) {
  let orders = getOrders();
  const index = orders.findIndex(o => o.orderId === orderId);
  if (index !== -1) {
    orders[index].status = newStatus;
    saveOrders(orders);
    renderAdminDashboard();
    Swal.close();
    showToast(`Order #${orderId} updated to: ${newStatus}`, "success");
  }
}

function deleteOrder(orderId) {
  Swal.fire({
    title: 'Delete Order?',
    text: `Are you sure you want to permanently delete Order #${orderId}? This cannot be undone.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete',
    confirmButtonColor: '#dc3545',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    customClass: { popup: 'compact-swal-popup' }
  }).then((result) => {
    if (result.isConfirmed) {
      let orders = getOrders();
      orders = orders.filter(o => o.orderId !== orderId);
      saveOrders(orders);
      renderAdminDashboard();
      showToast(`Order #${orderId} deleted.`, "success");
    }
  });
}

function seedSampleOrder() {
  const sampleOrder = {
    orderId: 'CWH-' + Math.floor(100000 + Math.random() * 900000),
    customerName: 'Maria Santos',
    dateNeeded: '2026-08-10',
    timeNeeded: '02:00 PM',
    fulfillmentMode: 'Delivery',
    location: 'Baliwag, Bulacan',
    contactNumber: '0917-888-9999',
    paymentMode: 'Cash',
    dpOption: 'Full Payment (Cash)',
    items: [
      {
        name: 'Custom Addons Handcrafted Bouquet',
        category: 'Fuzzy Wire',
        unitPrice: 520,
        quantity: 1,
        flowerDetails: ['Rose Bloom (2x - ₱90)', 'Tulips (1x - ₱80)'],
        fillerDetails: ['Baby\'s Breath (1x - ₱80)', 'Spiral (2x - ₱5)'],
        color: 'Light Pink, Cream',
        wrapper: 'Kraft Paper',
        ribbon: 'Light Yellow Satin Ribbon',
        addOns: [{ name: 'Fairy Lights', price: 20 }, { name: 'Bouquet Bag', price: 20 }]
      }
    ],
    grandTotal: 670,
    dpRequiredAmount: 335,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  let orders = getOrders();
  orders.unshift(sampleOrder);
  saveOrders(orders);
  renderAdminDashboard();
  showToast("Sample Order Created!", "success");
}

function getAdminAllChatUsers() {
  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  const usersMap = new Map();

  // 1. Add all registered buyers
  buyers.forEach(buyer => {
    const cleanEmail = (buyer.email || '').toLowerCase().trim();
    if (cleanEmail) {
      usersMap.set(cleanEmail, {
        name: buyer.name || cleanEmail.split('@')[0],
        email: cleanEmail,
        mobile: buyer.mobile || ''
      });
    }
  });

  // 2. Discover any other customers who have chat records in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('cwh_chat_history_')) {
      const email = key.replace('cwh_chat_history_', '').toLowerCase().trim();
      if (email && !usersMap.has(email)) {
        usersMap.set(email, {
          name: email.split('@')[0],
          email: email,
          mobile: ''
        });
      }
    }
  }

  // 3. Populate chat histories, last message, and timestamps
  const userList = Array.from(usersMap.values()).map(user => {
    let history = [];
    try {
      const data = localStorage.getItem('cwh_chat_history_' + user.email);
      if (data) history = JSON.parse(data);
    } catch (e) {}

    const lastMsg = history.length > 0 ? history[history.length - 1] : null;

    return {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      lastMessage: lastMsg ? (lastMsg.text.replace(/<[^>]*>?/gm, '')) : 'Started a conversation',
      lastTime: lastMsg ? (lastMsg.time || '') : '',
      lastTimestamp: lastMsg ? (lastMsg.timestamp || 0) : 0,
      history: history
    };
  });

  // Sort by latest message timestamp so most active conversation stays at the top
  userList.sort((a, b) => (b.lastTimestamp || 0) - (a.lastTimestamp || 0));

  return userList;
}

function initAdminChatList() {
  const users = getAdminAllChatUsers();
  const container = document.getElementById('admin-chat-users-list');
  if (!container) return;

  if (!selectedCustomerEmail && users.length > 0) {
    selectedCustomerEmail = users[0].email;
  }

  renderAdminChatUserItems(users);
  renderActiveAdminConversation();

  if (!window._adminChatSyncInitialized) {
    window._adminChatSyncInitialized = true;

    // Real-time storage listener across tabs
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('cwh_chat_history_')) {
        const u = getAdminAllChatUsers();
        renderAdminChatUserItems(u);
        renderActiveAdminConversation();
      }
    });

    // Auto-sync polling every 1.2s when admin is viewing chat
    setInterval(() => {
      const chatSection = document.getElementById('chat-view-section');
      if (!chatSection || chatSection.style.display === 'none') return;
      if (!selectedCustomerEmail) return;

      const cleanEmail = selectedCustomerEmail.toLowerCase().trim();
      try {
        const data = localStorage.getItem('cwh_chat_history_' + cleanEmail);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length !== (window._lastAdminChatCount || 0)) {
            window._lastAdminChatCount = parsed.length;
            renderActiveAdminConversation();
            renderAdminChatUserItems(getAdminAllChatUsers());
          }
        }
      } catch (e) {}
    }, 1200);
  }
}

function filterAdminChatUsers() {
  const query = document.getElementById('admin-chat-search')?.value.toLowerCase().trim() || '';
  const users = getAdminAllChatUsers();
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query) ||
    u.email.toLowerCase().includes(query) ||
    u.lastMessage.toLowerCase().includes(query)
  );
  renderAdminChatUserItems(filtered);
}

function renderAdminChatUserItems(users) {
  const container = document.getElementById('admin-chat-users-list');
  if (!container) return;

  if (users.length === 0) {
    container.innerHTML = `
      <div class="text-center py-4 px-3 text-muted small">
        <i class="bi bi-chat-left-dots display-6 text-muted mb-2 d-block"></i>
        No customer conversations found.
      </div>
    `;
    return;
  }

  container.innerHTML = users.map(user => {
    const isActive = user.email.toLowerCase() === (selectedCustomerEmail || '').toLowerCase();
    const initial = (user.name || 'C').charAt(0).toUpperCase();

    return `
      <div class="admin-chat-user-item ${isActive ? 'active' : ''}" onclick="selectAdminChatUser('${user.email}')">
        <div class="chat-user-avatar">${initial}</div>
        <div class="chat-user-info">
          <div class="d-flex justify-content-between align-items-center">
            <span class="chat-user-name">${user.name}</span>
            <span class="chat-user-time">${user.lastTime}</span>
          </div>
          <div class="chat-user-snippet">${user.lastMessage}</div>
        </div>
      </div>
    `;
  }).join('');
}

function selectAdminChatUser(email) {
  selectedCustomerEmail = (email || '').toLowerCase().trim();
  const users = getAdminAllChatUsers();
  renderAdminChatUserItems(users);
  renderActiveAdminConversation();
}

function renderActiveAdminConversation() {
  const allUsers = getAdminAllChatUsers();
  const cleanSelected = (selectedCustomerEmail || '').toLowerCase().trim();
  let buyer = allUsers.find(u => (u.email || '').toLowerCase().trim() === cleanSelected);

  if (!buyer) {
    const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
    buyer = buyers.find(b => (b.email || '').toLowerCase().trim() === cleanSelected);
  }

  if (!buyer && allUsers.length > 0) {
    buyer = allUsers[0];
    selectedCustomerEmail = buyer.email;
  }

  if (!buyer) return;

  const avatarEl = document.getElementById('active-chat-avatar');
  const nameEl = document.getElementById('active-chat-name');
  const emailEl = document.getElementById('active-chat-email');

  if (avatarEl) avatarEl.textContent = (buyer.name || 'C').charAt(0).toUpperCase();
  if (nameEl) nameEl.textContent = buyer.name;
  if (emailEl) emailEl.textContent = `${buyer.email}${buyer.mobile ? ' • ' + buyer.mobile : ''}`;

  let history = [];
  const cleanEmail = (buyer.email || '').toLowerCase().trim();
  try {
    const data = localStorage.getItem('cwh_chat_history_' + cleanEmail);
    if (data) {
      history = JSON.parse(data);
    } else {
      const initial = [
        {
          sender: 'seller',
          text: `Hi ${(buyer.name || '').split(' ')[0]}! Welcome to Craft & Wrapped Haven 🌸 How can we help you today?`,
          time: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
          timestamp: Date.now()
        }
      ];
      localStorage.setItem('cwh_chat_history_' + cleanEmail, JSON.stringify(initial));
      history = initial;
    }
  } catch (e) {
    history = [];
  }

  const body = document.getElementById('admin-chat-messages-body');
  if (!body) return;

  if (history.length === 0) {
    body.innerHTML = `
      <div class="text-center text-muted my-auto py-5">
        <i class="bi bi-chat-heart display-6 text-pink mb-2 d-block"></i>
        <div class="fw-semibold">No messages yet with ${buyer.name}</div>
        <div class="small">Send a friendly greeting below!</div>
      </div>
    `;
    return;
  }

  body.innerHTML = history.map(msg => {
    const isSeller = msg.sender === 'seller';
    return `
      <div class="admin-bubble ${isSeller ? 'admin-bubble-seller' : 'admin-bubble-customer'}">
        <div>${msg.text}</div>
        <div class="admin-bubble-time">${msg.time || ''}</div>
      </div>
    `;
  }).join('');

  body.scrollTop = body.scrollHeight;
}

function handleAdminChatSend() {
  const input = document.getElementById('admin-chat-input-field');
  if (!input) return;

  const text = input.value.trim();
  if (!text || !selectedCustomerEmail) return;

  const cleanEmail = selectedCustomerEmail.toLowerCase().trim();

  let history = [];
  try {
    const data = localStorage.getItem('cwh_chat_history_' + cleanEmail);
    if (data) history = JSON.parse(data);
  } catch (e) {}

  if (!Array.isArray(history)) history = [];

  const nowTime = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  history.push({
    sender: 'seller',
    text: text,
    time: nowTime,
    timestamp: Date.now()
  });

  localStorage.setItem('cwh_chat_history_' + cleanEmail, JSON.stringify(history));
  localStorage.setItem('cwh_admin_engaged_' + cleanEmail, 'true');
  input.value = '';

  renderActiveAdminConversation();

  const users = getAdminAllChatUsers();
  renderAdminChatUserItems(users);
}

function insertAdminQuickReply(text) {
  const input = document.getElementById('admin-chat-input-field');
  if (input) {
    input.value = text;
    input.focus();
  }
}

function viewActiveCustomerOrders() {
  if (!selectedCustomerEmail) return;

  const cleanEmail = selectedCustomerEmail.toLowerCase().trim();
  const orders = getOrders();
  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  const buyer = buyers.find(b => (b.email || '').toLowerCase().trim() === cleanEmail);
  const buyerName = buyer ? buyer.name : '';

  const customerOrders = orders.filter(o =>
    (o.customerName && o.customerName.toLowerCase().includes(buyerName.toLowerCase())) ||
    (o.contactNumber && buyer && o.contactNumber.includes(buyer.mobile))
  );

  if (customerOrders.length === 0) {
    Swal.fire({
      title: 'Customer Orders',
      text: `${buyerName || 'This customer'} has no placed orders yet.`,
      icon: 'info',
      confirmButtonColor: '#e8839b',
      customClass: { popup: 'compact-swal-popup' }
    });
    return;
  }

  const listHTML = customerOrders.map(o => `
    <div class="p-2.5 rounded-3 mb-2 bg-light border text-start">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <span class="fw-bold text-dark">#${o.orderId}</span>
        <span class="status-badge status-${(o.status || 'Order Placed').replace(/\s+/g, '')}">${o.status || 'Order Placed'}</span>
      </div>
      <div class="small text-muted">Total: <strong>${formatCurrency(o.grandTotal)}</strong> • Needed: ${o.dateNeeded || 'N/A'}</div>
    </div>
  `).join('');

  Swal.fire({
    title: `${buyerName}'s Orders (${customerOrders.length})`,
    html: `<div class="font-sans" style="max-height: 350px; overflow-y: auto;">${listHTML}</div>`,
    confirmButtonColor: '#e8839b',
    confirmButtonText: 'Done',
    width: '440px',
    customClass: { popup: 'compact-swal-popup' }
  });
}

// ==========================================
// FLOWER SHOP & CATALOG MANAGEMENT (ADMIN)
// ==========================================

function getFlowerModalInstance() {
  const modalEl = document.getElementById('flowerModal');
  if (!modalEl) return null;
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    return bootstrap.Modal.getOrCreateInstance(modalEl);
  }
  return {
    show: () => {
      modalEl.classList.add('show');
      modalEl.style.display = 'block';
      document.body.classList.add('modal-open');
    },
    hide: () => {
      modalEl.classList.remove('show');
      modalEl.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
    }
  };
}

function renderAdminFlowers() {
  const container = document.getElementById('admin-flowers-grid');
  if (!container) return;

  const catalog = typeof getStoreCatalog === 'function' ? getStoreCatalog() : [];

  // Update statistics
  const statTotal = document.getElementById('stat-total-flowers');
  const statBestsellers = document.getElementById('stat-bestseller-flowers');
  const statNewArrivals = document.getElementById('stat-newarrival-flowers');
  const statCategories = document.getElementById('stat-total-categories');

  if (statTotal) statTotal.textContent = catalog.length;
  if (statBestsellers) statBestsellers.textContent = catalog.filter(p => p.bestseller).length;
  if (statNewArrivals) statNewArrivals.textContent = catalog.filter(p => p.newArrival).length;
  if (statCategories) {
    const cats = new Set(catalog.map(p => p.category ? p.category.trim() : '').filter(Boolean));
    statCategories.textContent = cats.size;
  }

  // Filter catalog
  let filtered = [...catalog];

  if (flowerCategoryFilter === 'BESTSELLER') {
    filtered = filtered.filter(p => p.bestseller);
  } else if (flowerCategoryFilter === 'NEWARRIVAL') {
    filtered = filtered.filter(p => p.newArrival);
  } else if (flowerCategoryFilter !== 'ALL') {
    filtered = filtered.filter(p => (p.category || '').toLowerCase() === flowerCategoryFilter.toLowerCase());
  }

  if (flowerSearchQuery) {
    filtered = filtered.filter(p =>
      (p.name || '').toLowerCase().includes(flowerSearchQuery) ||
      (p.category || '').toLowerCase().includes(flowerSearchQuery) ||
      (p.description || '').toLowerCase().includes(flowerSearchQuery)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <div class="p-4 rounded-4" style="background: #faf6f8; border: 1.5px dashed #f0cdd8;">
          <i class="bi bi-flower3" style="font-size: 2.5rem; color: #e8839b;"></i>
          <h5 class="fw-bold mt-2 text-dark">No Flowers Found</h5>
          <p class="text-muted small mb-3">No handcrafted flowers match your search or filter criteria.</p>
          <button class="btn btn-sm btn-bloom-primary rounded-pill px-3 py-1.5" onclick="openAddFlowerModal()" style="background: #e8839b; border: none; color: #fff;">
            <i class="bi bi-plus-circle me-1"></i> Add New Flower
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(flower => `
    <div class="col-12 col-sm-6 col-md-4 col-xl-3">
      <div class="flower-admin-card shadow-sm">
        <div class="flower-admin-img-box">
          <div class="admin-card-badges">
            ${flower.bestseller ? '<span class="admin-pill-tag tag-bestseller"><i class="bi bi-star-fill text-warning"></i> Best Seller</span>' : ''}
            ${flower.newArrival ? '<span class="admin-pill-tag tag-newarrival"><i class="bi bi-sparkles"></i> New Arrival</span>' : ''}
          </div>
          <img src="${flower.image}" alt="${flower.name}" onerror="this.src='assets/images/fw-1.png';" loading="lazy">
        </div>
        <div class="p-3 d-flex flex-column flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="badge bg-pink-soft text-dark-rose rounded-pill" style="font-size: 0.7rem; font-weight: 600;">
              ${flower.category || 'Handcrafted'}
            </span>
            <span class="text-dark-rose fw-bold" style="font-size: 1rem;">
              ${formatCurrency(flower.price)}
            </span>
          </div>
          <h6 class="fw-bold text-dark mb-1 text-truncate" title="${flower.name}">${flower.name}</h6>
          <p class="text-muted small mb-3" style="font-size: 0.74rem; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2rem;">
            ${flower.description || 'Artisanal handcrafted flower for bouquets and floral arrangements.'}
          </p>

          <!-- Quick Toggle Badges -->
          <div class="d-flex flex-wrap gap-1.5 mb-3 pt-2 border-top">
            <button type="button" class="btn-toggle-badge ${flower.bestseller ? 'active-bestseller' : ''}" onclick="quickToggleFlowerFlag('${flower.id}', 'bestseller')" title="Toggle Best Seller status">
              <i class="bi bi-star${flower.bestseller ? '-fill text-warning' : ''}"></i>
              <span>${flower.bestseller ? 'Best Seller' : 'Not Best Seller'}</span>
            </button>
            <button type="button" class="btn-toggle-badge ${flower.newArrival ? 'active-newarrival' : ''}" onclick="quickToggleFlowerFlag('${flower.id}', 'newArrival')" title="Toggle New Arrival status">
              <i class="bi bi-sparkles${flower.newArrival ? ' text-success' : ''}"></i>
              <span>${flower.newArrival ? 'New Arrival' : 'Not New'}</span>
            </button>
          </div>

          <!-- Action buttons -->
          <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
            <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1" onclick="openEditFlowerModal('${flower.id}')" style="font-size: 0.76rem; font-weight: 600;">
              <i class="bi bi-pencil-square me-1"></i> Edit
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1" onclick="confirmDeleteFlower('${flower.id}')" title="Delete flower" style="font-size: 0.76rem;">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openAddFlowerModal() {
  const form = document.getElementById('flower-manage-form');
  if (form) form.reset();

  const editIdInput = document.getElementById('flower-edit-id');
  if (editIdInput) editIdInput.value = '';

  const modalTitle = document.getElementById('flowerModalTitle');
  if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-flower1" style="color: #e8839b;"></i> <span>Add New Flower</span>';

  const defaultImg = 'assets/images/fw-1.png';
  const previewImg = document.getElementById('flower-modal-preview-img');
  const imgData = document.getElementById('flower-image-data');
  if (previewImg) previewImg.src = defaultImg;
  if (imgData) imgData.value = defaultImg;

  const customCatInput = document.getElementById('flower-input-custom-cat');
  if (customCatInput) {
    customCatInput.classList.add('d-none');
    customCatInput.value = '';
  }

  const modal = getFlowerModalInstance();
  if (modal) modal.show();
}

function openEditFlowerModal(id) {
  const catalog = typeof getStoreCatalog === 'function' ? getStoreCatalog() : [];
  const flower = catalog.find(p => String(p.id) === String(id));
  if (!flower) return;

  const editIdInput = document.getElementById('flower-edit-id');
  if (editIdInput) editIdInput.value = flower.id;

  const modalTitle = document.getElementById('flowerModalTitle');
  if (modalTitle) modalTitle.innerHTML = `<i class="bi bi-pencil-square" style="color: #e8839b;"></i> <span>Edit: ${flower.name}</span>`;

  const nameInput = document.getElementById('flower-input-name');
  if (nameInput) nameInput.value = flower.name || '';

  const catSelect = document.getElementById('flower-input-category');
  const customCatInput = document.getElementById('flower-input-custom-cat');
  if (catSelect) {
    const knownCats = ['Fuzzy Wire', 'Satin Ribbon', 'Fillers', 'Bouquets'];
    if (knownCats.includes(flower.category)) {
      catSelect.value = flower.category;
      if (customCatInput) customCatInput.classList.add('d-none');
    } else {
      catSelect.value = '__custom__';
      if (customCatInput) {
        customCatInput.classList.remove('d-none');
        customCatInput.value = flower.category || '';
      }
    }
  }

  const priceInput = document.getElementById('flower-input-price');
  if (priceInput) priceInput.value = flower.price || 90;

  const descInput = document.getElementById('flower-input-description');
  if (descInput) descInput.value = flower.description || '';

  const checkBestseller = document.getElementById('flower-check-bestseller');
  if (checkBestseller) checkBestseller.checked = Boolean(flower.bestseller);

  const checkNewArrival = document.getElementById('flower-check-newarrival');
  if (checkNewArrival) checkNewArrival.checked = Boolean(flower.newArrival);

  const previewImg = document.getElementById('flower-modal-preview-img');
  const imgData = document.getElementById('flower-image-data');
  if (previewImg) previewImg.src = flower.image || 'assets/images/fw-1.png';
  if (imgData) imgData.value = flower.image || 'assets/images/fw-1.png';

  const modal = getFlowerModalInstance();
  if (modal) modal.show();
}

function handleFlowerFileSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (typeof compressImageFile === 'function') {
    compressImageFile(file, 640, 640, 0.82).then(dataUrl => {
      const previewImg = document.getElementById('flower-modal-preview-img');
      const imgData = document.getElementById('flower-image-data');
      if (previewImg) previewImg.src = dataUrl;
      if (imgData) imgData.value = dataUrl;

      const presetSelect = document.getElementById('flower-preset-select');
      if (presetSelect) presetSelect.value = '';
      const urlInput = document.getElementById('flower-url-input');
      if (urlInput) urlInput.value = '';
    }).catch(err => {
      console.error("Error compressing image:", err);
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewImg = document.getElementById('flower-modal-preview-img');
        const imgData = document.getElementById('flower-image-data');
        if (previewImg) previewImg.src = e.target.result;
        if (imgData) imgData.value = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}

function handlePresetSelectChange() {
  const presetSelect = document.getElementById('flower-preset-select');
  if (!presetSelect || !presetSelect.value) return;

  const val = presetSelect.value;
  const previewImg = document.getElementById('flower-modal-preview-img');
  const imgData = document.getElementById('flower-image-data');
  if (previewImg) previewImg.src = val;
  if (imgData) imgData.value = val;

  const fileInput = document.getElementById('flower-file-upload');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('flower-url-input');
  if (urlInput) urlInput.value = '';
}

function handleUrlInputChange() {
  const urlInput = document.getElementById('flower-url-input');
  if (!urlInput || !urlInput.value.trim()) return;

  const val = urlInput.value.trim();
  const previewImg = document.getElementById('flower-modal-preview-img');
  const imgData = document.getElementById('flower-image-data');
  if (previewImg) previewImg.src = val;
  if (imgData) imgData.value = val;

  const fileInput = document.getElementById('flower-file-upload');
  if (fileInput) fileInput.value = '';
  const presetSelect = document.getElementById('flower-preset-select');
  if (presetSelect) presetSelect.value = '';
}

function handleCategorySelectChange() {
  const catSelect = document.getElementById('flower-input-category');
  const customCatInput = document.getElementById('flower-input-custom-cat');
  if (!catSelect || !customCatInput) return;

  if (catSelect.value === '__custom__') {
    customCatInput.classList.remove('d-none');
    customCatInput.focus();
  } else {
    customCatInput.classList.add('d-none');
  }
}

function handleSaveFlowerSubmit() {
  const editId = (document.getElementById('flower-edit-id')?.value || '').trim();
  const name = (document.getElementById('flower-input-name')?.value || '').trim();
  const price = Number(document.getElementById('flower-input-price')?.value) || 0;
  const desc = (document.getElementById('flower-input-description')?.value || '').trim();
  const image = (document.getElementById('flower-image-data')?.value || '').trim() || 'assets/images/fw-1.png';
  const bestseller = Boolean(document.getElementById('flower-check-bestseller')?.checked);
  const newArrival = Boolean(document.getElementById('flower-check-newarrival')?.checked);

  let category = document.getElementById('flower-input-category')?.value || 'Fuzzy Wire';
  if (category === '__custom__') {
    const customCat = (document.getElementById('flower-input-custom-cat')?.value || '').trim();
    category = customCat || 'Special';
  }

  if (!name) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Flower Name',
      text: 'Please enter a name for the handcrafted flower.',
      confirmButtonColor: '#e8839b',
      customClass: { popup: 'compact-swal-popup' }
    });
    return;
  }

  if (price <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Price',
      text: 'Please enter a valid price greater than ₱0.',
      confirmButtonColor: '#e8839b',
      customClass: { popup: 'compact-swal-popup' }
    });
    return;
  }

  const flowerPayload = {
    name,
    category,
    price,
    description: desc || `Artisanal handcrafted ${name} for bouquets and flower arrangements.`,
    image,
    bestseller,
    newArrival,
    featured: bestseller || newArrival
  };

  if (editId) {
    updateStoreProduct(editId, flowerPayload);
    Swal.fire({
      icon: 'success',
      title: 'Flower Updated!',
      text: `"${name}" has been updated in the shop catalog.`,
      timer: 1600,
      showConfirmButton: false,
      customClass: { popup: 'compact-swal-popup' }
    });
  } else {
    addStoreProduct(flowerPayload);
    Swal.fire({
      icon: 'success',
      title: 'Flower Added!',
      text: `"${name}" is now live in the shop catalog!`,
      timer: 1800,
      showConfirmButton: false,
      customClass: { popup: 'compact-swal-popup' }
    });
  }

  const modal = getFlowerModalInstance();
  if (modal) modal.hide();

  renderAdminFlowers();
  updateSidebarBadges();
}

function quickToggleFlowerFlag(id, flagName) {
  const newVal = toggleProductFlag(id, flagName);
  renderAdminFlowers();
  updateSidebarBadges();

  const label = flagName === 'bestseller' ? 'Best Seller' : 'New Arrival';
  if (typeof showToast === 'function') {
    showToast(`${label} ${newVal ? 'Activated' : 'Removed'}!`, 'info');
  }
}

function confirmDeleteFlower(id) {
  const catalog = typeof getStoreCatalog === 'function' ? getStoreCatalog() : [];
  const flower = catalog.find(p => String(p.id) === String(id));
  const flowerName = flower ? flower.name : 'this flower';

  Swal.fire({
    title: 'Remove Flower?',
    text: `Are you sure you want to remove "${flowerName}" from the shop? Customers won't be able to buy it anymore.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Delete',
    customClass: { popup: 'compact-swal-popup' }
  }).then(result => {
    if (result.isConfirmed) {
      deleteStoreProduct(id);
      renderAdminFlowers();
      updateSidebarBadges();
      Swal.fire({
        icon: 'success',
        title: 'Flower Removed',
        text: `"${flowerName}" has been removed.`,
        timer: 1400,
        showConfirmButton: false,
        customClass: { popup: 'compact-swal-popup' }
      });
    }
  });
}

function promptResetCatalog() {
  Swal.fire({
    title: 'Reset Flower Catalog?',
    text: 'This will restore all default 20 handcrafted flowers and clear any custom additions.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#e8839b',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, Reset',
    customClass: { popup: 'compact-swal-popup' }
  }).then(result => {
    if (result.isConfirmed) {
      resetStoreCatalogToDefault();
      renderAdminFlowers();
      updateSidebarBadges();
      Swal.fire({
        icon: 'success',
        title: 'Catalog Restored!',
        text: 'Flower catalog has been restored to default handcrafted stems.',
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'compact-swal-popup' }
      });
    }
  });
}

/* ========================================================
   CUSTOMER ACCOUNTS & USER MANAGEMENT
   ======================================================== */

function renderAdminCustomers() {
  const container = document.getElementById('customers-list-container');
  if (!container) return;

  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  const orders = getOrders();

  const totalCount = buyers.length;
  const bannedCount = buyers.filter(b => typeof isEmailBanned === 'function' && isEmailBanned(b.email)).length;
  const activeCount = totalCount - bannedCount;

  const statTotalEl = document.getElementById('stat-total-customers');
  const statActiveEl = document.getElementById('stat-active-customers');
  const statBannedEl = document.getElementById('stat-banned-customers');

  if (statTotalEl) statTotalEl.textContent = totalCount;
  if (statActiveEl) statActiveEl.textContent = activeCount;
  if (statBannedEl) statBannedEl.textContent = bannedCount;

  let filtered = buyers.filter(buyer => {
    const isBanned = typeof isEmailBanned === 'function' && isEmailBanned(buyer.email);
    if (customerFilter === 'ACTIVE' && isBanned) return false;
    if (customerFilter === 'BANNED' && !isBanned) return false;

    if (customerSearchQuery) {
      const q = customerSearchQuery;
      const matchName = (buyer.name || '').toLowerCase().includes(q);
      const matchEmail = (buyer.email || '').toLowerCase().includes(q);
      const matchPhone = (buyer.mobile || '').toLowerCase().includes(q);
      const matchAddr = (buyer.address || '').toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchAddr) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5 bg-light rounded-4 border p-4 my-2">
        <i class="bi bi-people display-4 text-muted mb-2 d-block"></i>
        <h6 class="fw-bold text-dark">No Customer Accounts Found</h6>
        <p class="text-muted small mb-0">No registered customers match your current filter or search criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(buyer => {
    const isBanned = typeof isEmailBanned === 'function' && isEmailBanned(buyer.email);
    const initial = (buyer.name || 'C').charAt(0).toUpperCase();
    const cleanEmail = (buyer.email || '').toLowerCase().trim();

    const userOrders = orders.filter(o => {
      const oEmail = (o.customerEmail || '').toLowerCase().trim();
      const oName = (o.customerName || '').toLowerCase().trim();
      return (cleanEmail && oEmail === cleanEmail) || (oName === (buyer.name || '').toLowerCase().trim());
    });

    const regDate = buyer.registeredAt ? new Date(buyer.registeredAt).toLocaleDateString('en-PH', {
      month: 'short', day: 'numeric', year: 'numeric'
    }) : 'Aug 2026';

    return `
      <div class="customer-card-premium ${isBanned ? 'banned-account' : 'active-account'}">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <!-- Left: Customer Details (Name & Status) -->
          <div class="d-flex align-items-center gap-3">
            <div class="customer-avatar-circle ${isBanned ? 'banned' : ''}">
              ${initial}
            </div>
            <div>
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <span class="fw-bold text-dark fs-6" style="letter-spacing: -0.2px;">${buyer.name}</span>
                ${isBanned ? `
                  <span class="customer-status-badge badge-banned">
                    <span class="status-dot"></span> Banned
                  </span>
                ` : `
                  <span class="customer-status-badge badge-active">
                    <span class="status-dot"></span> Active
                  </span>
                `}
                <span class="customer-orders-pill">
                  <i class="bi bi-bag-check me-1"></i> ${userOrders.length} ${userOrders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>
            </div>
          </div>

          <!-- Right: Ban / Reactivate Action Button + View Info Button at the end -->
          <div class="ms-auto d-flex align-items-center gap-2 flex-wrap">
            ${isBanned ? `
              <button class="btn-customer-unban" onclick="handleToggleBanCustomer('${cleanEmail}')">
                <i class="bi bi-arrow-counterclockwise"></i>
                <span>Reactivate</span>
              </button>
            ` : `
              <button class="btn-customer-ban" onclick="handleToggleBanCustomer('${cleanEmail}')">
                <i class="bi bi-slash-circle"></i>
                <span>Ban Customer</span>
              </button>
            `}
            <button class="btn-customer-view" onclick="viewCustomerDetails('${cleanEmail}')">
              <i class="bi bi-eye"></i>
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function viewCustomerDetails(email) {
  if (!email) return;
  const cleanEmail = email.toLowerCase().trim();
  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  let buyer = buyers.find(b => (b.email || '').toLowerCase().trim() === cleanEmail);

  if (!buyer) {
    const orders = typeof getOrders === 'function' ? getOrders() : [];
    const matchingOrder = orders.find(o => (o.customerEmail || '').toLowerCase().trim() === cleanEmail);
    if (matchingOrder) {
      buyer = {
        name: matchingOrder.customerName || 'Customer',
        email: matchingOrder.customerEmail,
        mobile: matchingOrder.customerPhone || 'None provided',
        address: matchingOrder.customerAddress || 'None provided',
        registeredAt: matchingOrder.createdAt || null
      };
    } else {
      buyer = {
        name: 'Customer Account',
        email: cleanEmail,
        mobile: 'None provided',
        address: 'None provided',
        registeredAt: null
      };
    }
  }

  const isBanned = typeof isEmailBanned === 'function' && isEmailBanned(cleanEmail);
  const banReason = (typeof getCustomerBanReason === 'function' ? getCustomerBanReason(cleanEmail) : null) || buyer.banReason || 'Deactivated by store owner';

  const orders = typeof getOrders === 'function' ? getOrders() : [];
  const userOrders = orders.filter(o => {
    const oEmail = (o.customerEmail || '').toLowerCase().trim();
    const oName = (o.customerName || '').toLowerCase().trim();
    return (cleanEmail && oEmail === cleanEmail) || (oName === (buyer.name || '').toLowerCase().trim());
  });

  const initial = (buyer.name || 'C').charAt(0).toUpperCase();

  const formattedDate = buyer.registeredAt ? new Date(buyer.registeredAt).toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }) : 'Aug 1, 2026';

  const escapeHtmlSafe = (str) => {
    if (typeof escapeHtml === 'function') return escapeHtml(str);
    if (str === null || str === undefined) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  };

  Swal.fire({
    title: `<div class="d-flex align-items-center gap-2 justify-content-center pt-2">
      <div style="width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #7a2236 0%, #e8839b 100%); color: #fff; font-size: 1.05rem; font-weight: 700; display: inline-flex; align-items: center; justify-content: center;">${initial}</div>
      <span style="font-size: 1.15rem; font-weight: 700; color: #2b1820;">Customer Registration Details</span>
    </div>`,
    html: `
      <div class="text-start font-sans" style="font-size: 0.88rem; color: #374151;">
        <!-- Status Banner -->
        <div class="d-flex align-items-center justify-content-between gap-3 p-2.5 px-3 rounded-3 mb-3" style="background: ${isBanned ? '#fff1f2' : '#f0fdf4'}; border: 1px solid ${isBanned ? '#fecdd3' : '#bbf7d0'};">
          <div>
            <div style="font-size: 0.68rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; color: ${isBanned ? '#be123c' : '#15803d'};">Account Status</div>
            <div class="fw-bold" style="color: ${isBanned ? '#991b1b' : '#166534'}; font-size: 0.82rem;">
              ${isBanned ? '<i class="bi bi-slash-circle-fill me-1"></i> Banned Account' : '<i class="bi bi-check-circle-fill me-1"></i> Active Account'}
            </div>
          </div>
          <span class="customer-orders-pill" style="font-size: 0.72rem; white-space: nowrap; flex-shrink: 0; display: inline-flex; align-items: center; gap: 5px; padding: 0.25rem 0.65rem;">
            <i class="bi bi-bag-check me-0.5"></i> <span>${userOrders.length} ${userOrders.length === 1 ? 'Order' : 'Orders'}</span>
          </span>
        </div>

        <!-- Info Grid -->
        <div style="display: flex; flex-direction: column; gap: 9px;">
          <!-- Full Name -->
          <div class="p-2.5 px-3 rounded-3" style="background: #ffffff; border: 1px solid #f0e2e7;">
            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #9c6e7a; margin-bottom: 2px;">
              <i class="bi bi-person-fill text-pink me-1"></i> Full Name
            </div>
            <div class="fw-bold text-dark" style="font-size: 0.95rem;">
              ${escapeHtmlSafe(buyer.name)}
            </div>
          </div>

          <!-- Email -->
          <div class="p-2.5 px-3 rounded-3" style="background: #ffffff; border: 1px solid #f0e2e7;">
            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #9c6e7a; margin-bottom: 2px;">
              <i class="bi bi-envelope-fill text-pink me-1"></i> Email Address
            </div>
            <div class="fw-semibold font-monospace text-dark" style="font-size: 0.9rem;">
              ${escapeHtmlSafe(buyer.email)}
            </div>
          </div>

          <!-- Contact Number -->
          <div class="p-2.5 px-3 rounded-3" style="background: #ffffff; border: 1px solid #f0e2e7;">
            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #9c6e7a; margin-bottom: 2px;">
              <i class="bi bi-telephone-fill text-pink me-1"></i> Mobile Contact Number
            </div>
            <div class="fw-semibold text-dark" style="font-size: 0.9rem;">
              ${escapeHtmlSafe(buyer.mobile || 'None provided')}
            </div>
          </div>

          <!-- Address -->
          <div class="p-2.5 px-3 rounded-3" style="background: #ffffff; border: 1px solid #f0e2e7;">
            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #9c6e7a; margin-bottom: 2px;">
              <i class="bi bi-geo-alt-fill text-pink me-1"></i> Delivery / Home Address
            </div>
            <div class="fw-semibold text-dark" style="font-size: 0.9rem; line-height: 1.4;">
              ${escapeHtmlSafe(buyer.address || 'No address provided')}
            </div>
          </div>

          <!-- Date Joined -->
          <div class="p-2.5 px-3 rounded-3" style="background: #ffffff; border: 1px solid #f0e2e7;">
            <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #9c6e7a; margin-bottom: 2px;">
              <i class="bi bi-calendar3 text-pink me-1"></i> Registration Timestamp
            </div>
            <div class="fw-semibold text-dark" style="font-size: 0.88rem;">
              ${formattedDate}
            </div>
          </div>

          ${isBanned ? `
            <!-- Ban Reason if Banned -->
            <div class="p-2.5 px-3 rounded-3" style="background: #fff5f5; border: 1px solid #fed7d7;">
              <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #c53030; margin-bottom: 2px;">
                <i class="bi bi-exclamation-triangle-fill me-1"></i> Reason for Ban
              </div>
              <div class="fw-semibold text-danger" style="font-size: 0.88rem;">
                ${escapeHtmlSafe(banReason)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: 'Close',
    confirmButtonColor: '#7a2236',
    width: '490px',
    customClass: { popup: 'compact-swal-popup' }
  });
}
window.viewCustomerDetails = viewCustomerDetails;

function handleToggleBanCustomer(email) {
  const isBanned = typeof isEmailBanned === 'function' && isEmailBanned(email);

  if (!isBanned) {
    Swal.fire({
      title: 'Ban / Deactivate Customer?',
      html: `
        <div class="text-start font-sans" style="font-size: 0.88rem;">
          <p class="text-muted mb-2">Are you sure you want to ban customer <strong>${email}</strong>? They will be blocked from logging in and registering.</p>
          <div class="mb-2">
            <label class="form-label small fw-semibold text-dark mb-1">Reason for ban:</label>
            <input type="text" id="swal-ban-reason" class="form-control form-control-sm" placeholder="e.g. Repeated cancellation / bogus order" value="Deactivated by store owner" />
          </div>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Ban Account',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'compact-swal-popup' },
      width: '400px'
    }).then((res) => {
      if (res.isConfirmed) {
        const reason = document.getElementById('swal-ban-reason')?.value.trim() || 'Deactivated by store owner';
        banCustomerEmail(email, reason);
        renderAdminCustomers();
        updateSidebarBadges();
        Swal.fire({
          icon: 'success',
          title: 'Customer Banned',
          text: `Account ${email} has been deactivated.`,
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: 'compact-swal-popup' },
          width: '320px'
        });
      }
    });
  } else {
    Swal.fire({
      title: 'Reactivate Customer?',
      text: `Do you want to unban ${email}? They will be able to log in and order again.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Reactivate',
      cancelButtonText: 'Cancel',
      customClass: { popup: 'compact-swal-popup' },
      width: '380px'
    }).then((res) => {
      if (res.isConfirmed) {
        unbanCustomerEmail(email);
        renderAdminCustomers();
        updateSidebarBadges();
        Swal.fire({
          icon: 'success',
          title: 'Customer Reactivated',
          text: `${email} is now active.`,
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: 'compact-swal-popup' },
          width: '320px'
        });
      }
    });
  }
}

function adminFilterOrdersByCustomer(query) {
  const searchInput = document.getElementById('admin-order-search');
  if (searchInput) searchInput.value = query;
  searchQuery = (query || '').toLowerCase().trim();
  switchAdminView('orders');
}

function adminOpenChatWithCustomer(email) {
  selectedCustomerEmail = (email || '').toLowerCase().trim();
  switchAdminView('chat');
  const chatSearch = document.getElementById('admin-chat-search');
  if (chatSearch) chatSearch.value = '';
  initAdminChatList();
}
