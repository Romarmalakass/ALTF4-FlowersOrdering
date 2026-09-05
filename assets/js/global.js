
// --- Craft & Wrapped Haven Master Catalog ---

const FUZZY_WIRE_FLOWERS = [
  { id: 'fw-1', name: "Rose Bloom", price: 90, image: "assets/images/fw-1.png", type: "Fuzzy Wire" },
  { id: 'fw-2', name: "Lady Rose", price: 130, image: "assets/images/fw-2.png", type: "Fuzzy Wire" },
  { id: 'fw-3', name: "Tulips", price: 80, image: "assets/images/fw-3.png", type: "Fuzzy Wire" },
  { id: 'fw-4', name: "Big Daisy / Mini Daisy", price: 70, image: "assets/images/fw-4.png", type: "Fuzzy Wire" },
  { id: 'fw-5', name: "Lily", price: 90, image: "assets/images/fw-5.png", type: "Fuzzy Wire" },
  { id: 'fw-6', name: "Calla Lily", price: 100, image: "assets/images/fw-6.png", type: "Fuzzy Wire" },
  { id: 'fw-7', name: "Poppy", price: 100, image: "assets/images/fw-7.png", type: "Fuzzy Wire" },
  { id: 'fw-8', name: "Sunflower A", price: 140, image: "assets/images/fw-8.png", type: "Fuzzy Wire" },
  { id: 'fw-9', name: "Sunflower B", price: 140, image: "assets/images/fw-9.png", type: "Fuzzy Wire" },
  { id: 'fw-10', name: "Lavender", price: 100, image: "assets/images/fw-10.png", type: "Fuzzy Wire" }
];

const SATIN_RIBBON_FLOWERS = [
  { id: 'sr-1', name: "Rose", price: 70, image: "assets/images/sr-1.png", type: "Satin Ribbon" },
  { id: 'sr-2', name: "2 Colored Rose", price: 75, image: "assets/images/sr-2.png", type: "Satin Ribbon" },
  { id: 'sr-3', name: "Tulips", price: 90, image: "assets/images/sr-3.png", type: "Satin Ribbon" },
  { id: 'sr-4', name: "Sunflower", price: 150, image: "assets/images/sr-4.png", type: "Satin Ribbon" },
  { id: 'sr-5', name: "Daisy", price: 150, image: "assets/images/sr-5.png", type: "Satin Ribbon" }
];

const FILLERS_DATA = [
  { id: 'fl-1', name: "Baby's Breath", price: 80, image: "assets/images/fl-1.png" },
  { id: 'fl-2', name: "Spiral", price: 5, image: "assets/images/fl-2.png" },
  { id: 'fl-3', name: "Long Leaf", price: 10, image: "assets/images/fl-3.png" },
  { id: 'fl-4', name: "Leaves", price: 20, image: "assets/images/fl-4.png" },
  { id: 'fl-5', name: "Eucalyptus", price: 20, image: "assets/images/fl-5.png" }
];

const FUZZY_COLORS_DATA = [
  { name: "White", image: "assets/images/colors/fw-color-1.png" },
  { name: "Cream", image: "assets/images/colors/fw-color-2.png" },
  { name: "Light Pink", image: "assets/images/colors/fw-color-3.png" },
  { name: "Pink", image: "assets/images/colors/fw-color-4.png" },
  { name: "Rose Pink", image: "assets/images/colors/fw-color-5.png" },
  { name: "Bright Pink", image: "assets/images/colors/fw-color-6.png" },
  { name: "Dark Brown", image: "assets/images/colors/fw-color-7.png" },
  { name: "Maroon", image: "assets/images/colors/fw-color-8.png" },
  { name: "Red", image: "assets/images/colors/fw-color-9.png" },
  { name: "Orange", image: "assets/images/colors/fw-color-10.png" },
  { name: "Golden", image: "assets/images/colors/fw-color-11.png" },
  { name: "Yellow", image: "assets/images/colors/fw-color-12.png" },
  { name: "Green", image: "assets/images/colors/fw-color-13.png" },
  { name: "Army Green", image: "assets/images/colors/fw-color-14.png" },
  { name: "Blue", image: "assets/images/colors/fw-color-15.png" },
  { name: "Dark Purple", image: "assets/images/colors/fw-color-16.png" },
  { name: "Light Purple", image: "assets/images/colors/fw-color-17.png" },
  { name: "Sky Blue", image: "assets/images/colors/fw-color-18.png" }
];

const SATIN_COLORS_DATA = [
  { name: "Cream", image: "assets/images/colors/sr-color-1.png" },
  { name: "Light Yellow", image: "assets/images/colors/sr-color-2.png" },
  { name: "Yellow", image: "assets/images/colors/sr-color-3.png" },
  { name: "Light Pink", image: "assets/images/colors/sr-color-4.png" },
  { name: "Red", image: "assets/images/colors/sr-color-5.png" },
  { name: "Maroon", image: "assets/images/colors/sr-color-6.png" },
  { name: "Blue", image: "assets/images/colors/sr-color-7.png" },
  { name: "Sky Blue", image: "assets/images/colors/sr-color-8.png" },
  { name: "Light Purple", image: "assets/images/colors/sr-color-9.png" },
  { name: "Green", image: "assets/images/colors/sr-color-10.png" },
  { name: "Gray", image: "assets/images/colors/sr-color-11.png" },
  { name: "Black", image: "assets/images/colors/sr-color-12.png" },
  { name: "JFY Small ('Just for you')", image: "assets/images/colors/sr-color-13.png" },
  { name: "JFY Big ('Just for you')", image: "assets/images/colors/sr-color-14.png" }
];

const WRAPPER_OPTIONS = [
  { id: 'wr-1', name: "White", price: 0, image: "assets/images/wrappers/wr-1.png" },
  { id: 'wr-2', name: "Yellow", price: 0, image: "assets/images/wrappers/wr-2.png" },
  { id: 'wr-3', name: "Pink", price: 0, image: "assets/images/wrappers/wr-3.png" },
  { id: 'wr-4', name: "Purple", price: 0, image: "assets/images/wrappers/wr-4.png" },
  { id: 'wr-5', name: "Sky Blue", price: 0, image: "assets/images/wrappers/wr-5.png" },
  { id: 'wr-6', name: "Black & Red (Bigger)", price: 10, image: "assets/images/wrappers/wr-6.png" },
  { id: 'wr-7', name: "Kraft Paper", price: 0, image: "assets/images/wrappers/wr-7.png" },
  { id: 'wr-8', name: "LWY Pink Paper", price: 20, image: "assets/images/wrappers/wr-8.png" },
  { id: 'wr-9', name: "Dotted Pink Paper", price: 20, image: "assets/images/wrappers/wr-9.png" }
];

const RIBBON_OPTIONS = [
  { id: 'rb-1', name: "Solid Cream", type: "Standard" },
  { id: 'rb-2', name: "Solid Light Pink", type: "Standard" },
  { id: 'rb-3', name: "Solid Red", type: "Standard" },
  { id: 'rb-4', name: "Solid Maroon", type: "Standard" },
  { id: 'rb-5', name: "Solid Blue", type: "Standard" },
  { id: 'rb-6', name: "Solid Sky Blue", type: "Standard" },
  { id: 'rb-7', name: "Solid Light Purple", type: "Standard" },
  { id: 'rb-8', name: "Solid Green", type: "Standard" },
  { id: 'rb-9', name: "Solid Black", type: "Standard" },
  { id: 'rb-10', name: "JFY Small ('Just for you')", type: "Special" },
  { id: 'rb-11', name: "JFY Big ('Just for you')", type: "Special" }
];

const CRAFT_ADDONS = [
  { id: 'ao-1', name: "Fairy Lights", price: 20, icon: "bi-stars" },
  { id: 'ao-2', name: "Bouquet Bag", price: 20, icon: "bi-bag-heart" },
  { id: 'ao-3', name: "Printed Letter", price: 10, icon: "bi-file-text" },
  { id: 'ao-4', name: "Greeting Card", price: 30, icon: "bi-card-heading" },
  { id: 'ao-5', name: "Gourmet Chocolates", price: 180, icon: "bi-box-seam" },
  { id: 'ao-6', name: "Teddy Bear Plushie", price: 250, icon: "bi-heart-fill" }
];

// Master catalog for shop grid
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Fuzzy Wire Rose Bloom",
    category: "Fuzzy Wire",
    price: 90,
    rating: 4.9,
    reviewsCount: 42,
    image: "assets/images/fw-1.png",
    description: "Soft velvet fuzzy wire rose stem handcrafted with intricate petal detailing. Long-lasting keepsake.",
    popular: true,
    bestseller: true
  },
  {
    id: 2,
    name: "Satin Ribbon Sunflower",
    category: "Satin Ribbon",
    price: 150,
    rating: 5.0,
    reviewsCount: 56,
    image: "assets/images/sr-4.png",
    description: "Shimmering satin ribbon sunflower with handcrafted woven center. Perfect for graduation and birthdays.",
    popular: true,
    bestseller: true
  },
  {
    id: 3,
    name: "Fuzzy Wire Lady Rose",
    category: "Fuzzy Wire",
    price: 130,
    rating: 4.8,
    reviewsCount: 38,
    image: "assets/images/fw-2.png",
    description: "Elegant crimson lady rose created with ultra-soft wire plush. Never wilts.",
    popular: false,
    bestseller: true
  },
  {
    id: 4,
    name: "Satin Ribbon Tulips",
    category: "Satin Ribbon",
    price: 90,
    rating: 4.9,
    reviewsCount: 31,
    image: "assets/images/sr-3.png",
    description: "Shiny satin tulips stem handcrafted for long lasting beauty.",
    popular: true,
    bestseller: false
  },
  {
    id: 5,
    name: "Fuzzy Wire Calla Lily",
    category: "Fuzzy Wire",
    price: 100,
    rating: 4.7,
    reviewsCount: 24,
    image: "assets/images/fw-6.png",
    description: "Pure white fuzzy wire calla lily with golden center.",
    popular: false,
    bestseller: false
  },
  {
    id: 6,
    name: "Satin Ribbon 2-Colored Rose",
    category: "Satin Ribbon",
    price: 75,
    rating: 4.9,
    reviewsCount: 49,
    image: "assets/images/sr-2.png",
    description: "Dual-tone satin ribbon rose handcrafted with contrasting inner and outer petals.",
    popular: true,
    bestseller: true
  }
];

// --- LocalStorage Cart Helpers ---
const CART_STORAGE_KEY = 'craft_wrapped_haven_cart';

function getCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateNavbarCartCount();
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
}

function addToCart(cartItem) {
  const buyer = typeof getActiveBuyer === 'function' ? getActiveBuyer() : null;
  if (!buyer) {
    promptLoginToAddCart(cartItem);
    return false;
  }

  const cart = getCart();
  cart.push(cartItem);
  saveCart(cart);
  showToast(`Added "${cartItem.name}" to your shopping cart!`, "success");
  return true;
}

function promptLoginToAddCart(pendingCartItem = null) {
  if (typeof Swal === 'undefined') {
    openBuyerLoginModal();
    return;
  }

  Swal.fire({
    title: 'Login Required',
    html: `
      <div class="text-center font-sans">
        <div class="mx-auto mb-2.5 d-flex align-items-center justify-content-center" style="width: 65px; height: 65px; border-radius: 50%; background: #fffafc; border: 1.5px solid #f0e2e7;">
          <i class="bi bi-bag-heart text-danger display-6"></i>
        </div>
        <h5 class="fw-bold text-dark mb-1" style="font-size: 1.15rem;">Please log in to add to cart</h5>
        <p class="text-muted small mb-0" style="font-size: 0.82rem;">
          You can browse and view all flower designs freely, but a buyer account is required to place items in your cart and order.
        </p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: '<i class="bi bi-box-arrow-in-right me-1"></i> Log In',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Create Account',
    cancelButtonColor: '#64748b',
    showCloseButton: true,
    width: '390px',
    customClass: { popup: 'compact-swal-popup' }
  }).then((result) => {
    if (result.isConfirmed) {
      openBuyerLoginModal();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      openBuyerRegisterModal();
    }
  });
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed item from cart.`, "info");
  }
}

function updateCartQuantity(index, newQty) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].quantity = newQty;
      saveCart(cart);
    }
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateNavbarCartCount();
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

function updateNavbarCartCount() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// --- Global Order Store & Live Tracking Functions ---
const ORDERS_STORAGE_KEY = 'flower_orders';

function getOrders() {
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading orders from localStorage", e);
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Error saving orders to localStorage", e);
  }
}

function cancelCustomerOrder(orderId, reason = "Customer requested cancellation") {
  const orders = getOrders();
  const index = orders.findIndex(o => o.orderId === orderId);
  if (index !== -1) {
    orders[index].status = 'Cancelled';
    orders[index].cancelledAt = new Date().toISOString();
    orders[index].cancelReason = reason;
    saveOrders(orders);
    return true;
  }
  return false;
}

/// ==========================================================================
// BUYER AUTHENTICATION & DEMO LOCAL STORAGE STATE
// ==========================================================================
const BUYER_STORAGE_KEY = 'cwh_active_buyer';
const BUYERS_DB_KEY = 'cwh_registered_buyers';
const CHAT_STORAGE_PREFIX = 'cwh_chat_history_';

// Pre-seeded demo accounts
const DEFAULT_DEMO_BUYERS = [
  {
    name: 'Maria Santos',
    email: 'maria@gmail.com',
    mobile: '09171234567',
    password: 'password123',
    registeredAt: '2026-08-01T10:00:00Z'
  },
  {
    name: 'Juan Dela Cruz',
    email: 'juan@gmail.com',
    mobile: '09189876543',
    password: 'password123',
    registeredAt: '2026-08-10T14:30:00Z'
  }
];

function getRegisteredBuyers() {
  try {
    const data = localStorage.getItem(BUYERS_DB_KEY);
    if (!data) {
      localStorage.setItem(BUYERS_DB_KEY, JSON.stringify(DEFAULT_DEMO_BUYERS));
      return DEFAULT_DEMO_BUYERS;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_DEMO_BUYERS;
  }
}

function saveRegisteredBuyers(buyers) {
  localStorage.setItem(BUYERS_DB_KEY, JSON.stringify(buyers));
}

function getActiveBuyer() {
  try {
    const data = localStorage.getItem(BUYER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function setActiveBuyer(buyer) {
  localStorage.setItem(BUYER_STORAGE_KEY, JSON.stringify(buyer));
  updateNavbarAuth();
  if (typeof renderProductsGrid === 'function') renderProductsGrid();
  if (typeof renderActionButtons === 'function') renderActionButtons();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function logoutBuyer() {
  localStorage.removeItem(BUYER_STORAGE_KEY);
  updateNavbarAuth();
  closeSellerChat();
  if (typeof renderProductsGrid === 'function') renderProductsGrid();
  if (typeof renderActionButtons === 'function') renderActionButtons();
  if (typeof renderCartPage === 'function') renderCartPage();
}

function closeMobileNav() {
  const navCollapse = document.getElementById('bloomNavbar');
  if (navCollapse && navCollapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse, { toggle: false });
    bsCollapse.hide();
  }
}

function updateNavbarAuth() {
  const buyer = getActiveBuyer();

  // Toggle buyer-logged-in class on body
  document.body.classList.toggle('buyer-logged-in', !!buyer);

  // Hide cart button in navbar for guests, show for logged-in buyers
  const cartBtns = document.querySelectorAll('.cart-icon-btn');
  cartBtns.forEach(btn => {
    btn.style.display = buyer ? 'flex' : 'none';
  });

  // 1. Desktop Navbar Auth Slot (Hidden on mobile <992px)
  const navContainers = document.querySelectorAll('.bloom-navbar .d-flex.align-items-center.gap-2.order-lg-3');
  
  navContainers.forEach(container => {
    let authSlot = container.querySelector('.navbar-auth-slot');
    if (!authSlot) {
      const oldBtn = container.querySelector('button[onclick*="LoginModal"]');
      if (oldBtn) {
        authSlot = document.createElement('div');
        authSlot.className = 'navbar-auth-slot d-none d-lg-inline-block ms-1';
        oldBtn.replaceWith(authSlot);
      }
    }

    if (!authSlot) return;
    authSlot.className = 'navbar-auth-slot d-none d-lg-inline-block ms-1';

    if (buyer) {
      const firstName = buyer.name.split(' ')[0] || 'My Account';
      authSlot.innerHTML = `
        <div class="dropdown">
          <button class="buyer-account-btn dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle text-pink"></i>
            <span>${firstName}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border rounded-3 p-2 font-sans" style="min-width: 205px; border-color: #f0e2e7 !important;">
            <li class="px-2 py-1.5 border-bottom mb-1">
              <div class="fw-bold text-dark text-truncate" style="font-size: 0.85rem;">${buyer.name}</div>
              <div class="text-muted text-truncate" style="font-size: 0.72rem;">${buyer.email}</div>
            </li>
            <li>
              <a class="dropdown-item rounded-2 py-1.5 small" href="account.html">
                <i class="bi bi-person text-danger me-2"></i> My Profile
              </a>
            </li>
            <li>
              <a class="dropdown-item rounded-2 py-1.5 small" href="cart.html?tab=orders">
                <i class="bi bi-bag-check text-danger me-2"></i> My Orders
              </a>
            </li>
            <li>
              <a class="dropdown-item rounded-2 py-1.5 small" href="javascript:void(0)" onclick="openSellerChat()">
                <i class="bi bi-chat-dots text-danger me-2"></i> Chat
              </a>
            </li>
            <li><hr class="dropdown-divider my-1"></li>
            <li>
              <a class="dropdown-item rounded-2 py-1.5 small text-danger" href="javascript:void(0)" onclick="logoutBuyer()">
                <i class="bi bi-box-arrow-right me-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      `;
    } else {
      authSlot.innerHTML = `
        <button class="btn btn-sm btn-bloom-outline" onclick="openBuyerLoginModal()" style="border-radius: 20px; font-size: 0.85rem; padding: 0.35rem 0.85rem; font-weight: 600;">
          Login
        </button>
      `;
    }
  });

  // 2. Mobile Drawer for Guests Only (Hidden when logged in)
  const navCollapses = document.querySelectorAll('.bloom-navbar .navbar-collapse');
  navCollapses.forEach(collapse => {
    const navLists = collapse.querySelectorAll('.navbar-nav');
    let mobileAuthSlot = collapse.querySelector('.navbar-mobile-auth');
    if (!mobileAuthSlot) {
      mobileAuthSlot = document.createElement('div');
      collapse.appendChild(mobileAuthSlot);
    }

    if (!buyer) {
      navLists.forEach(nav => {
        nav.classList.remove('d-none');
      });

      mobileAuthSlot.className = 'navbar-mobile-auth d-lg-none mt-3 pt-3 border-top w-100';
      mobileAuthSlot.innerHTML = `
        <button class="btn btn-bloom-primary w-100 py-2.5 rounded-pill fw-semibold shadow-sm" onclick="openBuyerLoginModal(); closeMobileNav();" style="font-size: 0.9rem;">
          <i class="bi bi-box-arrow-in-right me-1.5"></i> Login / Register
        </button>
      `;
    }
  });

  // 3. Mobile App Bottom Navigation Bar (Picture 2 & 3 Design)
  let bottomNav = document.getElementById('bloom-mobile-bottom-nav');
  if (buyer) {
    if (!bottomNav) {
      bottomNav = document.createElement('nav');
      bottomNav.id = 'bloom-mobile-bottom-nav';
      document.body.appendChild(bottomNav);
    }
    const path = (window.location.pathname || '').toLowerCase().split('/').pop() || 'index.html';
    const isHome = path === '' || path === 'index.html';
    const isShop = path.includes('shop.html') || path.includes('product-details.html');
    const isOrders = path.includes('cart.html');
    const isAccount = path.includes('account.html');

    bottomNav.innerHTML = `
      <a href="index.html" onclick="closeSellerChat()" class="mobile-bottom-nav-item ${isHome ? 'active' : ''}">
        <i class="bi bi-house-door${isHome ? '-fill' : ''}"></i>
        <span>Home</span>
      </a>
      <a href="shop.html" onclick="closeSellerChat()" class="mobile-bottom-nav-item ${isShop ? 'active' : ''}">
        <i class="bi bi-flower1"></i>
        <span>Shop</span>
      </a>
      <a href="cart.html?tab=orders" onclick="closeSellerChat()" class="mobile-bottom-nav-item ${isOrders ? 'active' : ''}">
        <i class="bi bi-clock-history"></i>
        <span>Orders</span>
      </a>
      <button type="button" id="bottom-nav-chat-btn" onclick="openSellerChat()" class="mobile-bottom-nav-item">
        <i class="bi bi-chat-dots"></i>
        <span>Chat</span>
      </button>
      <a href="account.html" onclick="closeSellerChat()" class="mobile-bottom-nav-item ${isAccount ? 'active' : ''}">
        <i class="bi bi-person-circle"></i>
        <span>Account</span>
      </a>
    `;
  } else {
    if (bottomNav) bottomNav.remove();
  }
}

function updateFloatingChatVisibility() {
  const chatTrigger = document.getElementById('floating-chat-trigger');
  if (chatTrigger) chatTrigger.style.display = 'none';
}

// Helper: Toggle Password Visibility
function togglePasswordVisibility(inputId, btnEl) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  const icon = btnEl.querySelector('i');
  if (icon) {
    icon.className = isPass ? 'bi bi-eye-slash text-pink' : 'bi bi-eye text-muted';
  }
}

// --- Dedicated Fullscreen Auth Overlay DOM Management ---
function getOrCreateAuthModalContainer() {
  let container = document.getElementById('bloom-auth-modal');
  if (!container) {
    container = document.createElement('div');
    container.id = 'bloom-auth-modal';
    document.body.appendChild(container);
  }
  return container;
}

function closeAuthModal() {
  const container = document.getElementById('bloom-auth-modal');
  if (container) {
    container.classList.remove('active');
    container.style.display = 'none';
    container.innerHTML = '';
  }
  document.body.style.overflow = '';
}

// --- Buyer Login Modal (Full Screen Layout) ---
function openBuyerLoginModal() {
  closeMobileNav();
  if (typeof Swal !== 'undefined' && Swal.isVisible()) Swal.close();

  const modal = getOrCreateAuthModalContainer();
  modal.innerHTML = `
    <button type="button" class="auth-close-btn" onclick="closeAuthModal()" title="Close">
      <i class="bi bi-x-lg"></i>
    </button>
    <div class="auth-fullscreen-wrapper font-sans">
      <!-- Top Center Logo -->
      <div class="auth-center-logo">
        <img src="assets/images/logo.png" alt="Craft & Wrapped Haven Logo" />
      </div>

      <!-- Title & Subtitle -->
      <h2 class="auth-center-title">Welcome Back</h2>
      <p class="auth-center-subtitle">Sign in to access your flower orders<br>& artisan chat</p>

      <!-- Login Form -->
      <form id="buyer-login-form" onsubmit="event.preventDefault(); handleBuyerLoginSubmit();">
        <!-- Email Address -->
        <div class="auth-field-group">
          <label class="auth-field-label">Email Address</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-envelope"></i></span>
            <input type="email" id="buyer-login-email" placeholder="maria@gmail.com" value="maria@gmail.com" required autocomplete="email">
          </div>
        </div>

        <!-- Password -->
        <div class="auth-field-group">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <label class="auth-field-label mb-0">Password</label>
            <a href="javascript:void(0)" onclick="handleForgotPassword()" class="auth-forgot-link">Forgot?</a>
          </div>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-lock"></i></span>
            <input type="password" id="buyer-login-pass" placeholder="••••••••" value="password123" required autocomplete="current-password">
            <button type="button" class="auth-eye-btn" onclick="togglePasswordVisibility('buyer-login-pass', this)" title="Show/Hide password">
              <i class="bi bi-eye text-muted"></i>
            </button>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="auth-remember-row">
          <label class="auth-checkbox-pink">
            <input type="checkbox" id="buyer-remember" checked>
            <span>Remember Me</span>
          </label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-auth-bloom">
          Log In
        </button>
      </form>

      <div class="auth-bottom-switch">
        <span>Don't have an account? </span>
        <a href="javascript:void(0)" onclick="openBuyerRegisterModal()">Create Account</a>
      </div>

      <div class="text-center mt-3">
        <a href="javascript:void(0)" onclick="openAdminLoginModal()" class="text-muted text-decoration-none" style="font-size: 0.76rem;">
          <i class="bi bi-shield-lock me-1"></i> Admin Portal
        </a>
      </div>
    </div>
  `;
  modal.style.display = 'flex';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function handleBuyerLoginSubmit() {
  const email = document.getElementById('buyer-login-email')?.value.trim().toLowerCase();
  const pass = document.getElementById('buyer-login-pass')?.value.trim();

  if (!email || !pass) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Notice',
      text: 'Please fill in both email and password.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#e8839b',
      width: '320px',
      customClass: { popup: 'compact-swal-popup' }
    });
    return;
  }

  const buyers = getRegisteredBuyers();
  const found = buyers.find(b => b.email.toLowerCase() === email && b.password === pass);

  if (!found) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid email or password. Please try again.',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#e8839b',
      width: '320px',
      customClass: { popup: 'compact-swal-popup' }
    });
    return;
  }

  closeAuthModal();
  setActiveBuyer(found);
  
  // Compact centered 1.5s auto-closing SweetAlert
  Swal.fire({
    icon: 'success',
    title: `Welcome back, ${found.name.split(' ')[0]}! 🌸`,
    text: 'Logged in successfully',
    showConfirmButton: false,
    timer: 1500,
    width: '320px',
    customClass: { popup: 'compact-swal-popup' }
  });
}

function handleForgotPassword() {
  Swal.fire({
    title: 'Password Reset',
    html: `
      <div class="text-start small font-sans">
        <p class="text-muted mb-2">Enter your registered email address to receive password reset instructions.</p>
        <input type="email" id="reset-email" class="form-control form-control-sm mb-2" placeholder="name@email.com" />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Send Reset Link',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Back to Login',
    cancelButtonColor: '#64748b',
    customClass: { popup: 'compact-swal-popup' }
  }).then((res) => {
    if (res.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Reset Link Sent!',
        text: 'Demo reset instructions sent to your email.',
        showConfirmButton: false,
        timer: 1500,
        width: '320px',
        customClass: { popup: 'compact-swal-popup' }
      });
    }
  });
}

// --- Buyer Registration Modal (Full Screen Layout) ---
function openBuyerRegisterModal(prefill = {}) {
  closeMobileNav();
  if (typeof Swal !== 'undefined' && Swal.isVisible()) Swal.close();

  const prefillName = prefill.name || '';
  const prefillEmail = prefill.email || '';
  const prefillPass = prefill.pass || '';
  const prefillPassConf = prefill.passConf || '';
  const prefillMobile = prefill.mobile || '';
  const prefillAddress = prefill.address || '';
  const prefillTerms = prefill.terms !== undefined ? prefill.terms : false;

  const modal = getOrCreateAuthModalContainer();
  modal.innerHTML = `
    <button type="button" class="auth-close-btn" onclick="closeAuthModal()" title="Close">
      <i class="bi bi-x-lg"></i>
    </button>
    <div class="auth-fullscreen-wrapper register-mode font-sans">
      <!-- Top Center Logo -->
      <div class="auth-center-logo">
        <img src="assets/images/logo.png" alt="Craft & Wrapped Haven Logo" />
      </div>

      <!-- Title & Subtitle -->
      <h2 class="auth-center-title">Create Your Account</h2>
      <p class="auth-center-subtitle">Join Craft & Wrapped Haven and start sending beautiful moments</p>

      <!-- Register Form -->
      <form id="buyer-register-form" onsubmit="event.preventDefault(); handleBuyerRegisterSubmit();">
        <!-- Full Name -->
        <div class="auth-field-group">
          <label class="auth-field-label">Full Name</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-person"></i></span>
            <input type="text" id="reg-name" placeholder="Enter your full name" value="${prefillName}" required autocomplete="name">
          </div>
          <div id="reg-name-indicator" class="small mt-1" style="font-size: 0.72rem; text-align: left;"></div>
        </div>

        <!-- Email Address -->
        <div class="auth-field-group">
          <label class="auth-field-label">Email Address</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-envelope"></i></span>
            <input type="email" id="reg-email" placeholder="Enter your email address" value="${prefillEmail}" required autocomplete="email">
          </div>
          <div id="reg-email-indicator" class="small mt-1" style="font-size: 0.72rem; text-align: left;"></div>
        </div>

        <!-- Password -->
        <div class="auth-field-group">
          <label class="auth-field-label">Password</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-lock"></i></span>
            <input type="password" id="reg-pass" placeholder="Create a password" value="${prefillPass}" required autocomplete="new-password">
            <button type="button" class="auth-eye-btn" onclick="togglePasswordVisibility('reg-pass', this)" title="Show/Hide password">
              <i class="bi bi-eye text-muted"></i>
            </button>
          </div>
          <div id="reg-pass-indicator" class="small mt-1" style="font-size: 0.72rem; text-align: left;"></div>
        </div>

        <!-- Confirm Password -->
        <div class="auth-field-group">
          <label class="auth-field-label">Confirm Password</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-lock"></i></span>
            <input type="password" id="reg-pass-confirm" placeholder="Confirm your password" value="${prefillPassConf}" required autocomplete="new-password">
            <button type="button" class="auth-eye-btn" onclick="togglePasswordVisibility('reg-pass-confirm', this)" title="Show/Hide password">
              <i class="bi bi-eye text-muted"></i>
            </button>
          </div>
          <div id="reg-pass-confirm-indicator" class="small mt-1" style="font-size: 0.72rem; text-align: left;"></div>
        </div>

        <!-- Phone Number (Strictly Numbers Only) -->
        <div class="auth-field-group">
          <label class="auth-field-label">Phone Number</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-telephone"></i></span>
            <input type="tel" id="reg-mobile" placeholder="Enter your phone number" value="${prefillMobile}" maxlength="11" inputmode="numeric" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 11);" required autocomplete="tel">
          </div>
          <div id="reg-mobile-indicator" class="small mt-1" style="font-size: 0.72rem; text-align: left;"></div>
        </div>

        <!-- Address -->
        <div class="auth-field-group">
          <label class="auth-field-label">Address</label>
          <div class="auth-field-box">
            <span class="input-icon"><i class="bi bi-geo-alt"></i></span>
            <input type="text" id="reg-address" placeholder="Enter your complete address" value="${prefillAddress}" autocomplete="street-address">
          </div>
        </div>

        <!-- Terms Checkbox -->
        <div class="auth-field-group mb-2">
          <label class="auth-checkbox-pink">
            <input type="checkbox" id="reg-terms" ${prefillTerms ? 'checked' : ''} required>
            <span style="font-size: 0.78rem;">I agree to the <a href="javascript:void(0)" class="text-pink text-decoration-none fw-bold">Terms of Service</a> and <a href="javascript:void(0)" class="text-pink text-decoration-none fw-bold">Privacy Policy</a></span>
          </label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-auth-bloom">
          Create Account
        </button>
      </form>

      <!-- Bottom Switch -->
      <div class="auth-bottom-switch">
        <span>Already have an account? </span>
        <a href="javascript:void(0)" onclick="openBuyerLoginModal()">Log In</a>
      </div>
    </div>
  `;
  modal.style.display = 'flex';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  setupRegisterLiveValidation();
}

function showRegisterSweetAlert(message, title = 'Registration Notice', icon = 'warning') {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: '#e8839b',
    width: '320px',
    customClass: { popup: 'compact-swal-popup' }
  });
}

function setupRegisterLiveValidation() {
  const nameInput = document.getElementById('reg-name');
  const nameInd = document.getElementById('reg-name-indicator');
  const emailInput = document.getElementById('reg-email');
  const emailInd = document.getElementById('reg-email-indicator');
  const mobileInput = document.getElementById('reg-mobile');
  const mobileInd = document.getElementById('reg-mobile-indicator');
  const passInput = document.getElementById('reg-pass');
  const passInd = document.getElementById('reg-pass-indicator');
  const confirmInput = document.getElementById('reg-pass-confirm');
  const confirmInd = document.getElementById('reg-pass-confirm-indicator');

  if (nameInput && nameInd) {
    nameInput.addEventListener('input', () => {
      const val = nameInput.value.trim();
      if (!val || val.length >= 5) {
        nameInd.innerHTML = '';
      } else {
        nameInd.innerHTML = `<span class="text-danger fw-semibold"><i class="bi bi-exclamation-circle me-1"></i> Full Name must be at least 5 characters (${val.length}/5)</span>`;
      }
    });
  }

  if (emailInput && emailInd) {
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const buyers = typeof getRegisteredBuyers === 'function' ? getRegisteredBuyers() : [];
      const isExisting = buyers.some(b => (b.email || '').toLowerCase() === val);

      if (!val) {
        emailInd.innerHTML = '';
      } else if (!emailRegex.test(val)) {
        emailInd.innerHTML = `<span class="text-danger fw-semibold"><i class="bi bi-exclamation-circle me-1"></i> Invalid email format</span>`;
      } else if (isExisting) {
        emailInd.innerHTML = `<span class="text-danger fw-semibold"><i class="bi bi-x-circle me-1"></i> Already registered! Please log in instead.</span>`;
      } else {
        emailInd.innerHTML = '';
      }
    });
  }

  if (mobileInput && mobileInd) {
    // Strictly prevent typing letters/symbols
    mobileInput.addEventListener('keydown', (e) => {
      if (['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      if (e.ctrlKey || e.metaKey) return;
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    mobileInput.addEventListener('input', () => {
      mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '').slice(0, 11);
      const val = mobileInput.value.trim();

      if (!val || (val.length === 11 && val.startsWith('09'))) {
        mobileInd.innerHTML = '';
      } else {
        mobileInd.innerHTML = `<span class="text-danger fw-semibold"><i class="bi bi-exclamation-circle me-1"></i> 11 digits starting with 09 (${val.length}/11)</span>`;
      }
    });
  }

  function validatePasswords() {
    const passVal = passInput ? passInput.value : '';
    const confirmVal = confirmInput ? confirmInput.value : '';

    if (passInput && passInd) {
      if (!passVal || passVal.length >= 6) {
        passInd.innerHTML = '';
      } else {
        passInd.innerHTML = `<span class="text-danger fw-semibold"><i class="bi bi-exclamation-circle me-1"></i> Password must be at least 6 characters (${passVal.length}/6)</span>`;
      }
    }

    if (confirmInput && confirmInd) {
      if (!confirmVal || confirmVal === passVal) {
        confirmInd.innerHTML = '';
      } else {
        confirmInd.innerHTML = `<span class="text-danger fw-semibold"><i class="bi bi-exclamation-circle me-1"></i> Passwords do not match</span>`;
      }
    }
  }

  if (passInput) passInput.addEventListener('input', validatePasswords);
  if (confirmInput) confirmInput.addEventListener('input', validatePasswords);
}

function handleBuyerRegisterSubmit() {
  const name = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim().toLowerCase();
  const mobile = document.getElementById('reg-mobile')?.value.trim();
  const pass = document.getElementById('reg-pass')?.value.trim();
  const passConf = document.getElementById('reg-pass-confirm')?.value.trim();
  const address = document.getElementById('reg-address')?.value.trim() || '';
  const terms = document.getElementById('reg-terms')?.checked;

  if (!name || !email || !mobile || !pass || !passConf) {
    showRegisterSweetAlert("Please fill in all required fields.");
    return;
  }

  if (name.length < 5) {
    showRegisterSweetAlert("Full name must be at least 5 characters.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showRegisterSweetAlert("Please enter a valid email address.");
    return;
  }

  const buyers = getRegisteredBuyers();
  if (buyers.some(b => (b.email || '').toLowerCase() === email)) {
    showRegisterSweetAlert("This email address is already registered! Please log in instead.");
    return;
  }

  if (mobile.length !== 11 || !mobile.startsWith('09')) {
    showRegisterSweetAlert("Phone number must be exactly 11 digits starting with 09.");
    return;
  }

  if (pass.length < 6) {
    showRegisterSweetAlert("Password must be at least 6 characters.");
    return;
  }

  if (pass !== passConf) {
    showRegisterSweetAlert("Passwords do not match. Please re-enter your password.");
    return;
  }

  if (!terms) {
    showRegisterSweetAlert("Please accept the Terms of Service & Privacy Policy to continue.");
    return;
  }

  const newBuyer = {
    name,
    email,
    mobile,
    address,
    password: pass,
    registeredAt: new Date().toISOString()
  };

  buyers.push(newBuyer);
  saveRegisteredBuyers(buyers);
  closeAuthModal();
  setActiveBuyer(newBuyer);

  Swal.fire({
    icon: 'success',
    title: `Welcome, ${name.split(' ')[0]}! 🌸`,
    text: 'Account created successfully',
    showConfirmButton: false,
    timer: 1500,
    width: '320px',
    customClass: { popup: 'compact-swal-popup' }
  });
}

// --- Buyer Profile Modal Navigation ---
function openBuyerProfileModal() {
  const buyer = getActiveBuyer();
  if (!buyer) {
    openBuyerLoginModal();
    return;
  }
  window.location.href = 'account.html';
}

// ==========================================================================
// CHAT WITH SELLER FLOATING ENGINE
// ==========================================================================
function initFloatingChat() {
  // Do not initialize floating chat widget on admin pages
  if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('admin-login.html')) {
    return;
  }
  if (document.getElementById('floating-chat-panel')) return;

  // Create floating chat panel
  const panel = document.createElement('div');
  panel.id = 'floating-chat-panel';
  panel.className = 'floating-chat-panel chat-hidden';
  panel.innerHTML = `
    <div class="chat-header">
      <div class="chat-seller-info">
        <div class="chat-seller-avatar">
          <img src="assets/images/logo.png" alt="Craft & Wrapped Haven" />
        </div>
        <div>
          <div class="fw-bold text-dark" style="font-size: 0.85rem; line-height: 1.2;">Craft & Wrapped Haven</div>
          <div class="text-muted" style="font-size: 0.68rem;"><span class="chat-status-dot"></span>Online • Usually replies quickly</div>
        </div>
      </div>
      <button class="btn btn-sm text-muted p-1 border-0" onclick="closeSellerChat()" title="Close chat"><i class="bi bi-x-lg fs-6"></i></button>
    </div>

    <div class="chat-body" id="chat-messages-container"></div>

    <div class="chat-footer">
      <form onsubmit="handleChatSubmit(event)" class="chat-input-row">
        <button type="button" class="chat-attach-btn" onclick="handleMockAttachment()" title="Send Reference Photo"><i class="bi bi-image"></i></button>
        <input type="text" id="chat-input-field" class="chat-input" placeholder="Ask about flowers or bouquets..." autocomplete="off" />
        <button type="submit" class="chat-send-btn" title="Send message"><i class="bi bi-send-fill"></i></button>
      </form>
    </div>
  `;
  document.body.appendChild(panel);

  // --- Mobile Keyboard Fix: keep chat footer above keyboard ---
  // Uses visualViewport API (supported on all modern mobile browsers)
  function adjustChatForKeyboard() {
    if (!panel || panel.classList.contains('chat-hidden')) return;
    const vvp = window.visualViewport;
    if (!vvp) return;
    const offsetBottom = window.innerHeight - vvp.height - vvp.offsetTop;
    if (offsetBottom > 30) {
      // Keyboard is open — lift the panel bottom above the keyboard
      panel.style.bottom = offsetBottom + 'px';
      panel.style.top = '0px';
      panel.style.height = vvp.height + 'px';
    } else {
      // Keyboard closed — restore to CSS defaults
      panel.style.bottom = '';
      panel.style.top = '';
      panel.style.height = '';
    }
    // Scroll to the latest message after resize
    const msgContainer = document.getElementById('chat-messages-container');
    if (msgContainer) {
      setTimeout(() => { msgContainer.scrollTop = msgContainer.scrollHeight; }, 50);
    }
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', adjustChatForKeyboard);
    window.visualViewport.addEventListener('scroll', adjustChatForKeyboard);
  }
  // Real-time synchronization across browser tabs
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith(CHAT_STORAGE_PREFIX)) {
      renderChatMessages();
    }
  });

  updateFloatingChatVisibility();
}

function handleChatTriggerClick() {
  const buyer = getActiveBuyer();
  if (!buyer) {
    if (typeof Swal === 'undefined') {
      openBuyerLoginModal();
      return;
    }
    Swal.fire({
      title: 'Chat with Florist',
      html: `
        <div class="text-center font-sans">
          <div class="mx-auto mb-2.5 d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; border-radius: 50%; background: #fff0f5; border: 1.5px solid #f0e2e7;">
            <i class="bi bi-chat-heart text-pink display-6"></i>
          </div>
          <h5 class="fw-bold text-dark mb-1" style="font-size: 1.15rem;">Login to Chat with Florist</h5>
          <p class="text-muted small mb-0" style="font-size: 0.82rem;">
            Please log in or create a buyer account to ask questions, request customizations, and get live updates.
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-box-arrow-in-right me-1"></i> Log In',
      confirmButtonColor: '#e8839b',
      cancelButtonText: 'Create Account',
      cancelButtonColor: '#64748b',
      showCloseButton: true,
      width: '390px',
      customClass: { popup: 'compact-swal-popup' }
    }).then((result) => {
      if (result.isConfirmed) {
        openBuyerLoginModal();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        openBuyerRegisterModal();
      }
    });
    return;
  }

  const panel = document.getElementById('floating-chat-panel');
  if (panel) {
    if (panel.classList.contains('chat-hidden')) {
      openSellerChat();
    } else {
      closeSellerChat();
    }
  }
}

function openSellerChat() {
  const buyer = getActiveBuyer();
  if (!buyer) {
    openBuyerLoginModal();
    return;
  }

  const panel = document.getElementById('floating-chat-panel');
  if (!panel) return;

  panel.classList.remove('chat-hidden');
  renderChatMessages();

  // Highlight Chat button in mobile bottom nav
  const bottomNav = document.getElementById('bloom-mobile-bottom-nav');
  if (bottomNav) {
    bottomNav.querySelectorAll('.mobile-bottom-nav-item').forEach(item => item.classList.remove('active'));
    const chatBtn = document.getElementById('bottom-nav-chat-btn');
    if (chatBtn) chatBtn.classList.add('active');
  }

  setTimeout(() => {
    const input = document.getElementById('chat-input-field');
    if (input) input.focus();
  }, 100);
}

function closeSellerChat() {
  const panel = document.getElementById('floating-chat-panel');
  if (panel) panel.classList.add('chat-hidden');

  // Restore current page's active tab in mobile bottom nav
  const bottomNav = document.getElementById('bloom-mobile-bottom-nav');
  if (bottomNav) {
    const chatBtn = document.getElementById('bottom-nav-chat-btn');
    if (chatBtn) chatBtn.classList.remove('active');
    const path = (window.location.pathname || '').toLowerCase().split('/').pop() || 'index.html';
    if (path === '' || path === 'index.html') {
      bottomNav.querySelector('a[href="index.html"]')?.classList.add('active');
    } else if (path.includes('shop.html') || path.includes('product-details.html')) {
      bottomNav.querySelector('a[href="shop.html"]')?.classList.add('active');
    } else if (path.includes('cart.html')) {
      bottomNav.querySelector('a[href*="cart.html"]')?.classList.add('active');
    } else if (path.includes('account.html')) {
      bottomNav.querySelector('a[href*="account.html"]')?.classList.add('active');
    }
  }
}

function getChatHistory(buyerEmail) {
  if (!buyerEmail) return [];
  const cleanEmail = buyerEmail.toLowerCase().trim();
  try {
    const data = localStorage.getItem(CHAT_STORAGE_PREFIX + cleanEmail);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}

  // Initial greeting saved immediately
  const buyer = getActiveBuyer();
  const buyerName = buyer ? buyer.name.split(' ')[0] : 'Friend';
  const initial = [
    {
      sender: 'seller',
      text: `Hi ${buyerName}! Welcome to Craft & Wrapped Haven 🌸 How can we help you with your handcrafted flower bouquet today?`,
      time: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
    }
  ];
  localStorage.setItem(CHAT_STORAGE_PREFIX + cleanEmail, JSON.stringify(initial));
  return initial;
}

function saveChatHistory(buyerEmail, history) {
  if (!buyerEmail) return;
  const cleanEmail = buyerEmail.toLowerCase().trim();
  localStorage.setItem(CHAT_STORAGE_PREFIX + cleanEmail, JSON.stringify(history));
}

function renderChatMessages() {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const history = getChatHistory(buyer.email);

  container.innerHTML = history.map(msg => {
    const isBuyer = msg.sender === 'buyer';
    return `
      <div class="chat-msg ${isBuyer ? 'chat-msg-buyer' : 'chat-msg-seller'}">
        <div>${msg.text}</div>
        <div class="chat-msg-time">${msg.time || ''}</div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input-field');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  const buyer = getActiveBuyer();
  if (!buyer) return;

  const cleanEmail = (buyer.email || '').toLowerCase().trim();
  const history = getChatHistory(cleanEmail);
  const nowTime = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

  // Add buyer message
  history.push({
    sender: 'buyer',
    text: text,
    time: nowTime
  });
  saveChatHistory(cleanEmail, history);
  renderChatMessages();
  input.value = '';

  // Check if admin has already engaged in this conversation
  const isAdminEngaged = localStorage.getItem('cwh_admin_engaged_' + cleanEmail) === 'true';

  // Only simulate auto-reply if admin hasn't engaged yet
  if (!isAdminEngaged) {
    showSellerTypingIndicator(text);
  }
}

function showSellerTypingIndicator(userPrompt) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const typingEl = document.createElement('div');
  typingEl.className = 'chat-typing-indicator';
  typingEl.id = 'seller-typing-indicator';
  typingEl.innerHTML = `
    <span>Craft & Wrapped is typing</span>
    <span class="chat-typing-dots">
      <span></span><span></span><span></span>
    </span>
  `;
  container.appendChild(typingEl);
  container.scrollTop = container.scrollHeight;

  const delay = Math.floor(Math.random() * 600) + 1200; // 1.2s - 1.8s realistic delay

  setTimeout(() => {
    const ind = document.getElementById('seller-typing-indicator');
    if (ind) ind.remove();

    const buyer = getActiveBuyer();
    if (!buyer) return;

    const cleanEmail = (buyer.email || '').toLowerCase().trim();
    // Double check admin engagement before posting auto reply
    if (localStorage.getItem('cwh_admin_engaged_' + cleanEmail) === 'true') {
      return;
    }

    const responseText = generateSmartSellerReply(userPrompt, buyer);
    const history = getChatHistory(cleanEmail);
    history.push({
      sender: 'seller',
      text: responseText,
      time: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })
    });
    saveChatHistory(cleanEmail, history);
    renderChatMessages();
  }, delay);
}

function generateSmartSellerReply(prompt, buyer) {
  const q = prompt.toLowerCase();
  const firstName = buyer.name.split(' ')[0];

  if (q.includes('available') || q.includes('avail') || q.includes('stock')) {
    return `Yes po ${firstName}! 🌷 All our Fuzzy Wire & Satin Ribbon stems (Rose Bloom, Lady Rose, Tulips, Daisies) are available and handcrafted freshly upon order!`;
  }
  if (q.includes('custom') || q.includes('customize') || q.includes('color') || q.includes('wrapper') || q.includes('ribbon')) {
    return `Yes po! You can fully customize stem count, wrapper shades, and ribbon colors in our Custom Bouquet Builder tab 🪄 Would you like a specific color palette?`;
  }
  if (q.includes('price') || q.includes('magkano') || q.includes('cost') || q.includes('how much')) {
    return `Our handcrafted stems start at ₱70–₱140 per piece, with free wrappers on custom bouquets! We also have a 50% Down Payment option at checkout ✨`;
  }
  if (q.includes('rush') || q.includes('today') || q.includes('deliver') || q.includes('delivery') || q.includes('location')) {
    return `Standard handcrafted crafting takes 3–7 business days, and we deliver nationwide! We also offer express slots depending on current orders 🚚`;
  }
  if (q.includes('dp') || q.includes('down payment') || q.includes('gcash') || q.includes('payment') || q.includes('pay')) {
    return `We accept GCash and Cash on Delivery! A 50% Down Payment is confirmed before crafting starts to secure your slot 💖`;
  }
  if (q.includes('order') || q.includes('track') || q.includes('status')) {
    return `You can track your live crafting & delivery status anytime under the "Track My Orders" tab in your Shopping Cart! 📦`;
  }
  if (q.includes('hello') || q.includes('hi') || q.includes('good') || q.includes('kamusta')) {
    return `Hello po ${firstName}! 🌸 Glad to assist you today. Feel free to ask about our flower arrangements or custom designs!`;
  }
  if (q.includes('thank') || q.includes('salamat')) {
    return `You're always welcome po, ${firstName}! Let us know whenever you're ready to order 💐✨`;
  }

  // Courteous default reply
  const defaultReplies = [
    `Thank you for your message po, ${firstName}! We'll be happy to assist you with your flower bouquet. Would you like a custom design or from our catalog? 💐`,
    `Noted po! We craft each petal with love. Feel free to specify your preferred flower colors, wrapper, and date needed ✨`,
    `We received your request po! Let us know if you have a photo inspiration so we can replicate it for your special occasion 🌸`
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

function insertChatEmoji(emoji) {
  const input = document.getElementById('chat-input-field');
  if (input) {
    input.value += emoji;
    input.focus();
  }
}

function handleMockAttachment() {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  Swal.fire({
    title: 'Attach Photo / Inspo',
    html: `
      <div class="text-start small font-sans">
        <p class="text-muted mb-2">Select an inspiration photo URL or file to share with the florist:</p>
        <input type="text" id="chat-attach-url" class="form-control form-control-sm mb-2" placeholder="e.g. https://example.com/flower-inspo.jpg" value="assets/images/fw-2.png" />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Send Photo',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Cancel',
    customClass: { popup: 'compact-swal-popup' }
  }).then((res) => {
    if (res.isConfirmed) {
      const cleanEmail = (buyer.email || '').toLowerCase().trim();
      const history = getChatHistory(cleanEmail);
      const nowTime = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
      history.push({
        sender: 'buyer',
        text: `📷 [Shared Reference Photo] <br><img src="assets/images/fw-2.png" style="max-height: 85px; border-radius: 8px; margin-top: 4px;" />`,
        time: nowTime
      });
      saveChatHistory(cleanEmail, history);
      renderChatMessages();
      if (localStorage.getItem('cwh_admin_engaged_' + cleanEmail) !== 'true') {
        showSellerTypingIndicator("photo inspo attached");
      }
    }
  });
}

// --- Utility Helpers ---
function openAdminLoginModal() {
  closeAuthModal();
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      html: `
        <div class="text-center pt-2 px-2 font-sans">
          <div class="mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 75px; height: 75px; border-radius: 50%; background: #fffafc; border: 1.5px solid var(--pink-soft);">
            <img src="assets/images/logo.png" alt="Craft & Wrapped Haven Logo" style="max-width: 55px; max-height: 55px; object-fit: contain;" />
          </div>

          <h4 class="fw-bold text-dark-rose mb-1" style="font-size: 1.25rem;">ADMIN PORTAL</h4>
          <p class="text-muted small mb-3">Login to access order management & inspector</p>

          <form onsubmit="event.preventDefault(); handleSwalAdminLogin();">
            <div class="mb-3 text-start">
              <label class="form-label small fw-semibold text-dark mb-1 d-block" style="font-size: 0.8rem;">Username</label>
              <div class="input-group input-group-sm rounded-3 border overflow-hidden bg-light" style="border-color: #f0e2e7 !important;">
                <span class="input-group-text bg-transparent border-0 text-muted ps-3"><i class="bi bi-shield-lock"></i></span>
                <input type="text" id="swal-admin-user" class="form-control bg-transparent border-0 fs-7 ps-2 py-2" placeholder="admin" value="admin" autocomplete="username">
              </div>
            </div>

            <div class="mb-3.5 text-start">
              <label class="form-label small fw-semibold text-dark mb-1 d-block" style="font-size: 0.8rem;">Password</label>
              <div class="input-group input-group-sm rounded-3 border overflow-hidden bg-light" style="border-color: #f0e2e7 !important;">
                <span class="input-group-text bg-transparent border-0 text-muted ps-3"><i class="bi bi-key"></i></span>
                <input type="password" id="swal-admin-pass" class="form-control bg-transparent border-0 fs-7 ps-2 py-2" placeholder="••••••••" value="admin123" autocomplete="current-password">
                <button type="button" class="input-group-text bg-transparent border-0 pe-3" onclick="togglePasswordVisibility('swal-admin-pass', this)" title="Show/Hide password">
                  <i class="bi bi-eye text-muted"></i>
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn-bloom-primary w-100 py-2.5 rounded-pill fw-semibold fs-7 mb-2 mt-2 shadow-sm">
              Login to Admin
            </button>
          </form>

          <div class="mt-2 pt-2 border-top">
            <a href="javascript:void(0)" onclick="openBuyerLoginModal()" class="small text-pink text-decoration-none" style="font-size: 0.78rem;">
              <i class="bi bi-arrow-left me-1"></i> Back to Buyer Login
            </a>
          </div>
        </div>
      `,
      width: '380px',
      showConfirmButton: false,
      showCloseButton: true,
      background: '#ffffff',
      customClass: { popup: 'compact-swal-popup border-0' }
    });
  } else {
    window.location.href = 'admin-login.html';
  }
}

function handleSwalAdminLogin() {
  const u = document.getElementById('swal-admin-user')?.value.trim();
  const p = document.getElementById('swal-admin-pass')?.value.trim();

  if (!u || !p) {
    showToast("Please enter username and password.", "danger");
    return;
  }
  if (u !== 'admin' || p !== 'admin123') {
    showToast("Invalid admin credentials.", "danger");
    return;
  }

  sessionStorage.setItem('cwh_admin_auth', 'true');
  sessionStorage.setItem('cwh_admin_just_logged_in', 'true');
  Swal.close();
  window.location.href = 'admin.html';
}

function formatCurrency(amount) {
  return '₱' + Number(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function showToast(message, type = "success") {
  if (typeof Swal !== 'undefined') {
    let iconType = 'success';
    if (type === 'info') iconType = 'info';
    if (type === 'danger' || type === 'error') iconType = 'error';

    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: iconType,
      title: message,
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'bloom-swal-toast'
      }
    });
  } else {
    alert(message);
  }
}

// --- Global Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.bloom-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  updateNavbarCartCount();
  updateNavbarAuth();
  initFloatingChat();

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.bloom-navbar .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('login') === 'true') {
    setTimeout(() => {
      openBuyerLoginModal();
    }, 350);
  }
  if (urlParams.get('admin') === 'true') {
    setTimeout(() => {
      openAdminLoginModal();
    }, 350);
  }
  if (urlParams.get('chat') === 'true') {
    setTimeout(() => {
      openSellerChat();
    }, 450);
  }
});
