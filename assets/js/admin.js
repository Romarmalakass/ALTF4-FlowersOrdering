/**
 * CRAFT & WRAPPED HAVEN - ADMIN PANEL JAVASCRIPT (assets/js/admin.js)
 * Clean Minimalist Order Management, Left Sidebar Navigation, and Messenger-style Live Chat
 */

let currentAdminView = 'orders'; // 'orders' or 'chat'
let currentFilter = 'ALL';
let searchQuery = '';
let selectedCustomerEmail = null;
let chatSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  // Auth Check: Redirect to index.html if not authenticated
  if (sessionStorage.getItem('cwh_admin_auth') !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  // Logout listener with confirmation
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

  // Orders Search Input listener
  const searchInput = document.getElementById('admin-order-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderAdminDashboard();
    });
  }

  // Filter Tabs listeners
  const tabs = document.querySelectorAll('#order-filter-tabs .nav-link');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-status');
      renderAdminDashboard();
    });
  });

  // Initial render
  renderAdminDashboard();
  initAdminChatList();
  updateSidebarBadges();

  // Welcome Back Alert upon entering dashboard
  if (sessionStorage.getItem('cwh_admin_just_logged_in') === 'true') {
    sessionStorage.removeItem('cwh_admin_just_logged_in');
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Welcome Back, Admin! 🌸',
        text: 'Access to Orders Dashboard Granted',
        showConfirmButton: false,
        timer: 1500,
        width: '320px',
        customClass: { popup: 'compact-swal-popup' }
      });
    }, 150);
  }
});

// --- View Switcher: Orders vs. Chat ---
function switchAdminView(view) {
  currentAdminView = view;

  const ordersSec = document.getElementById('orders-view-section');
  const chatSec = document.getElementById('chat-view-section');
  const navOrdersBtn = document.getElementById('nav-orders-btn');
  const navChatBtn = document.getElementById('nav-chat-btn');

  if (view === 'orders') {
    if (ordersSec) ordersSec.style.display = 'block';
    if (chatSec) chatSec.style.display = 'none';
    if (navOrdersBtn) navOrdersBtn.classList.add('active');
    if (navChatBtn) navChatBtn.classList.remove('active');
    renderAdminDashboard();
  } else if (view === 'chat') {
    if (ordersSec) ordersSec.style.display = 'none';
    if (chatSec) chatSec.style.display = 'block';
    if (navOrdersBtn) navOrdersBtn.classList.remove('active');
    if (navChatBtn) navChatBtn.classList.add('active');
    initAdminChatList();
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
}

// --- Order Store Helpers ---
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

// --- Render Admin Dashboard (Orders) ---
function renderAdminDashboard() {
  const orders = getOrders();

  // Calculate global KPI statistics
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

  // Apply Filter and Search Query
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

    // Contextual Quick Action Button
    let quickActionBtn = '';
    if (isOrderPlaced) {
      quickActionBtn = `
        <button class="btn btn-sm btn-admin-confirm" onclick="quickUpdateStatus('${order.orderId}', 'In Crafting')" title="Confirm 50% DP and Start Crafting">
          <i class="bi bi-check-circle-fill"></i> Confirm
        </button>
      `;
    } else if (isInCrafting) {
      quickActionBtn = `
        <button class="btn btn-sm btn-primary rounded-pill px-3 py-1" onclick="quickUpdateStatus('${order.orderId}', 'Out for Delivery')" title="Mark as Out for Delivery">
          <i class="bi bi-truck"></i> Deliver
        </button>
      `;
    } else if (isOutForDelivery) {
      quickActionBtn = `
        <button class="btn btn-sm btn-success rounded-pill px-3 py-1" onclick="quickUpdateStatus('${order.orderId}', 'Delivered')" title="Mark as Delivered">
          <i class="bi bi-check2-circle"></i> Complete
        </button>
      `;
    }

    return `
      <div class="order-card-clean">
        <div class="row align-items-center g-3">
          <div class="col-12 col-md-3">
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="fw-bold font-monospace text-dark fs-6">#${order.orderId}</span>
              <span class="status-badge status-${status.replace(/\s+/g, '')}">${status}</span>
            </div>
            <div class="fw-semibold text-dark" style="font-size: 0.88rem;"><i class="bi bi-person me-1 text-danger"></i>${order.customerName}</div>
            <div class="small text-muted" style="font-size: 0.76rem;"><i class="bi bi-clock me-1"></i>${formattedDate}</div>
          </div>

          <div class="col-12 col-md-4">
            <div class="small text-dark mb-1">
              <i class="bi bi-geo-alt me-1 text-danger"></i><strong>Address:</strong> ${order.location || 'N/A'}
            </div>
            <div class="small text-muted" style="font-size: 0.78rem;">
              <i class="bi bi-calendar-event me-1"></i>Needed: ${order.dateNeeded || 'N/A'} (${order.timeNeeded || 'N/A'}) [${order.fulfillmentMode || 'Delivery'}]
            </div>
          </div>

          <div class="col-6 col-md-2">
            <div class="small text-muted" style="font-size: 0.75rem;">Total / 50% DP</div>
            <div class="fw-bold text-dark fs-6">${formatCurrency(order.grandTotal)}</div>
            <div class="small text-muted" style="font-size: 0.75rem;">DP: <strong class="text-danger">${formatCurrency(order.dpRequiredAmount)}</strong></div>
          </div>

          <div class="col-6 col-md-3 text-end d-flex justify-content-end align-items-center gap-2">
            ${quickActionBtn}
            <button class="btn btn-sm btn-admin-view-white" onclick="viewOrderDetails('${order.orderId}')" title="View Full Order Details">
              <i class="bi bi-eye text-pink"></i> View
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function quickUpdateStatus(orderId, newStatus) {
  let orders = getOrders();
  const index = orders.findIndex(o => o.orderId === orderId);
  if (index !== -1) {
    orders[index].status = newStatus;
    saveOrders(orders);
    renderAdminDashboard();
    
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Status Updated!',
        text: `Order #${orderId} is now "${newStatus}"`,
        showConfirmButton: false,
        timer: 1500,
        width: '330px',
        customClass: { popup: 'compact-swal-popup' }
      });
    }
  }
}

function viewOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) return;

  const firstItem = order.items && order.items[0] ? order.items[0] : {};
  const orderFlowers = firstItem.flowerDetails ? firstItem.flowerDetails.join(', ') : (firstItem.name || 'Custom Bouquet');
  const orderFillers = firstItem.fillerDetails ? firstItem.fillerDetails.join(', ') : 'None';
  const orderWrapper = firstItem.wrapper || 'Standard Wrapper';
  const orderRibbon = firstItem.ribbon || 'Standard Ribbon';
  const orderAddons = firstItem.addOns && firstItem.addOns.length > 0 ? firstItem.addOns.map(a => a.name).join(', ') : 'None';
  const inspoPhotoHTML = firstItem.inspoPhoto ? `
    <div class="mt-2.5 pt-2 border-top">
      <span class="d-block fw-semibold text-dark mb-1" style="font-size: 0.78rem;">📷 Reference Photo:</span>
      <img src="${firstItem.inspoPhoto}" style="max-height: 110px; border-radius: 10px; border: 1.5px solid #e8839b;" />
    </div>
  ` : '';

  const currentStatus = order.status || 'Order Placed';

  Swal.fire({
    title: `<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 w-100 border-bottom pb-2">
      <span class="fs-6 fw-bold text-dark font-monospace">#${order.orderId}</span>
      <span class="status-badge status-${currentStatus.replace(/\s+/g, '')}">${currentStatus}</span>
    </div>`,
    html: `
      <div class="text-start" style="font-family: 'Poppins', sans-serif; color: #2d2428; font-size: 0.8rem; line-height: 1.5;">
        <!-- Single Clean Minimalist Box: Customer Details -->
        <div class="p-2.5 rounded-3 mb-2 bg-white border" style="border-color: #f0e2e7 !important;">
          <div class="fw-bold text-dark mb-1 pb-1 border-bottom d-flex align-items-center gap-1.5" style="font-size: 0.82rem;">
            <i class="bi bi-person me-1 text-danger"></i> Customer & Delivery Details
          </div>
          <div><strong>Recipient:</strong> ${order.customerName} <span class="text-muted">(${order.contactNumber || 'N/A'})</span></div>
          <div><strong>Location:</strong> ${order.location || 'N/A'}</div>
          <div><strong>Needed Slot:</strong> ${order.dateNeeded || 'N/A'} (${order.timeNeeded || 'N/A'})</div>
          <div><strong>Mode:</strong> ${order.fulfillmentMode || 'Delivery'}</div>
        </div>

        <!-- Single Clean Minimalist Box: Bouquet Specifications -->
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

        <!-- Single Clean Minimalist Box: Payment -->
        <div class="p-2.5 rounded-3 mb-2 bg-white border" style="border-color: #f0e2e7 !important;">
          <div class="d-flex justify-content-between align-items-center">
            <span>Payment: <strong>${order.paymentMode || 'Cash'}</strong> (${order.dpOption || '50% DP'})</span>
            <span>Grand Total: <strong class="fs-6 text-dark">${formatCurrency(order.grandTotal)}</strong></span>
          </div>
          <div class="d-flex justify-content-between align-items-center pt-1 mt-1 border-top small text-muted">
            <span>50% Down Payment Required:</span>
            <span class="fw-bold text-danger">${formatCurrency(order.dpRequiredAmount)}</span>
          </div>
        </div>

        <!-- Status Controller -->
        <div class="p-2 rounded-3 bg-white border" style="border-color: #f0e2e7 !important;">
          <label class="form-label fw-semibold mb-1 d-block text-dark" style="font-size: 0.76rem;">
            <i class="bi bi-sliders me-1 text-danger"></i> Update Live Stage:
          </label>
          <select class="form-select form-select-sm fw-semibold" id="modal-status-select" onchange="updateOrderStatus('${order.orderId}', this.value)" style="border: 1px solid #e0cfd6; font-size: 0.8rem; padding: 0.35rem 0.65rem; border-radius: 6px;">
            <option value="Order Placed" ${currentStatus === 'Order Placed' || currentStatus === 'Pending' ? 'selected' : ''}>1. 📝 Order Placed (Pending 50% DP)</option>
            <option value="In Crafting" ${currentStatus === 'In Crafting' || currentStatus === 'Confirmed' ? 'selected' : ''}>2. ✂️ In Crafting (DP Confirmed)</option>
            <option value="Out for Delivery" ${currentStatus === 'Out for Delivery' || currentStatus === 'Delivery' ? 'selected' : ''}>3. 🚚 Out for Delivery</option>
            <option value="Delivered" ${currentStatus === 'Delivered' || currentStatus === 'Completed' ? 'selected' : ''}>4. ✅ Delivered (Completed)</option>
            <option value="Cancelled" ${currentStatus === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
          </select>
        </div>
      </div>
    `,
    width: '480px',
    showCancelButton: true,
    confirmButtonText: 'Delete Order',
    confirmButtonColor: '#dc3545',
    cancelButtonText: 'Close',
    cancelButtonColor: '#64748b',
    customClass: { popup: 'admin-order-modal' }
  }).then((result) => {
    if (result.isConfirmed) {
      deleteOrder(order.orderId);
    }
  });
}

function updateOrderStatus(orderId, newStatus) {
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
  let orders = getOrders();
  orders = orders.filter(o => o.orderId !== orderId);
  saveOrders(orders);
  renderAdminDashboard();
  showToast(`Order ${orderId} deleted.`, "info");
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
    paymentMode: 'GCash',
    dpOption: '50% Down Payment',
    items: [
      {
        name: 'Custom Addons Handcrafted Bouquet',
        category: 'Fuzzy Wire',
        unitPrice: 520,
        quantity: 1,
        flowerDetails: ['Rose Bloom (2x @ ₱90)', 'Tulips (1x @ ₱80)'],
        fillerDetails: ['Baby\'s Breath (1x @ ₱80)', 'Spiral (2x @ ₱5)'],
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


// ==========================================================================
// ADMIN LIVE CUSTOMER CHAT MODULE (MESSENGER STYLE)
// ==========================================================================

function getAdminAllChatUsers() {
  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  
  // Map buyers with their latest message
  return buyers.map(buyer => {
    let history = [];
    const cleanEmail = (buyer.email || '').toLowerCase().trim();
    try {
      const data = localStorage.getItem('cwh_chat_history_' + cleanEmail);
      if (data) history = JSON.parse(data);
    } catch (e) {}

    const lastMsg = history.length > 0 ? history[history.length - 1] : null;

    return {
      name: buyer.name,
      email: cleanEmail,
      mobile: buyer.mobile || '',
      lastMessage: lastMsg ? (lastMsg.text.replace(/<[^>]*>?/gm, '')) : 'Started a conversation',
      lastTime: lastMsg ? (lastMsg.time || '') : '',
      history: history
    };
  });
}

function initAdminChatList() {
  const users = getAdminAllChatUsers();
  const container = document.getElementById('admin-chat-users-list');
  if (!container) return;

  // Set default active user if none selected
  if (!selectedCustomerEmail && users.length > 0) {
    selectedCustomerEmail = users[0].email;
  }

  renderAdminChatUserItems(users);
  renderActiveAdminConversation();

  // Listen for storage events (real-time chat sync across tabs)
  if (!window._adminChatSyncInitialized) {
    window._adminChatSyncInitialized = true;
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('cwh_chat_history_')) {
        const u = getAdminAllChatUsers();
        renderAdminChatUserItems(u);
        renderActiveAdminConversation();
      }
    });
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
  const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
  const cleanSelected = (selectedCustomerEmail || '').toLowerCase().trim();
  const buyer = buyers.find(b => (b.email || '').toLowerCase().trim() === cleanSelected) || (buyers.length > 0 ? buyers[0] : null);

  if (!buyer) return;

  // Update Convo Header
  const avatarEl = document.getElementById('active-chat-avatar');
  const nameEl = document.getElementById('active-chat-name');
  const emailEl = document.getElementById('active-chat-email');

  if (avatarEl) avatarEl.textContent = (buyer.name || 'C').charAt(0).toUpperCase();
  if (nameEl) nameEl.textContent = buyer.name;
  if (emailEl) emailEl.textContent = `${buyer.email} • ${buyer.mobile || 'Registered Customer'}`;

  // Get chat history
  let history = [];
  const cleanEmail = (buyer.email || '').toLowerCase().trim();
  try {
    const data = localStorage.getItem('cwh_chat_history_' + cleanEmail);
    if (data) {
      history = JSON.parse(data);
    } else {
      // Create initial greeting if empty
      const initial = [
        {
          sender: 'seller',
          text: `Hi ${buyer.name.split(' ')[0]}! Welcome to Craft & Wrapped Haven 🌸 How can we help you today?`,
          time: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
        }
      ];
      localStorage.setItem('cwh_chat_history_' + cleanEmail, JSON.stringify(initial));
      history = initial;
    }
  } catch (e) {
    history = [];
  }

  // Render Messages
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

  const nowTime = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  history.push({
    sender: 'seller',
    text: text,
    time: nowTime
  });

  localStorage.setItem('cwh_chat_history_' + cleanEmail, JSON.stringify(history));
  localStorage.setItem('cwh_admin_engaged_' + cleanEmail, 'true');
  input.value = '';

  renderActiveAdminConversation();
  
  // Update sidebar snippet
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
