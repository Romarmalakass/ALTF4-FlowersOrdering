# 🌸 Craft & Wrapped Haven

> **Luxury Handcrafted Flowers & Custom Bouquets E-Commerce System**  
> *Final Project - Week 5: Frontend Project Setup & Code Repository*

[![GitHub Repository](https://img.shields.io/badge/GitHub-ALTF4--FlowersOrdering-181717?style=for-the-badge&logo=github)](https://github.com/Romarmalakass/ALTF4-FlowersOrdering)
[![Status](https://img.shields.io/badge/Frontend-Active%20Prototype-success?style=for-the-badge)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Bootstrap%205%20%7C%20Vanilla%20JS-blue?style=for-the-badge)](#technologies-used)

---

## 👥 Group Information

- **Group Name:** ALT F4
- **Repository URL:** [https://github.com/Romarmalakass/ALTF4-FlowersOrdering](https://github.com/Romarmalakass/ALTF4-FlowersOrdering)
- **Project Manager:** Romar Malakas ([@Romarmalakass](https://github.com/Romarmalakass))

### 🧑‍💻 Team Members & Roles

| Member | GitHub Username | Role & Contribution Area |
| :--- | :--- | :--- |
| **Romar Malakas** | [@Romarmalakass](https://github.com/Romarmalakass) | **Project Manager / Lead Frontend** — Repository initialization, architecture, Home page, & Global setup |
| **Divine** | [@Divine253](https://github.com/Divine253) | **Frontend Developer** — Reusable Navigation (`bloom-navbar`), Footer, and Mobile drawer integration |
| **Ariza Garcia** | [@arizagarcia217-ops](https://github.com/arizagarcia217-ops) | **Frontend Developer** — Shop page (`shop.html`), category filter layout, and card components |
| **BEEMO0508** | [@BEEMO0508](https://github.com/BEEMO0508) | **Frontend Developer** — Cart & Checkout UI layout (`cart.html`, `checkout.html`) |
| **Dyisiefdyi** | [@Dyisiefdyi](https://github.com/Dyisiefdyi) | **Frontend Developer** — Contact page (`contact.html`) & Customer Account views (`account.html`) |
| **oriaxxxx** | [@oriaxxxx](https://github.com/oriaxxxx) | **Frontend Developer** — Custom Bouquet builder interface (`product-details.html`) & Design styling |

---

## 📖 Project Description

**Craft & Wrapped Haven** is a modern, responsive web application designed for a bespoke floral boutique. The application allows customers to browse curated fresh flower arrangements (such as Ecuador roses, tulips, and sunflowers), design and configure their own personalized bouquets (custom flower choices, wrapper styles, ribbons, and greeting cards), manage their shopping cart, and complete orders smoothly.

This milestone establishes the **Week 5 Frontend Foundation**, successfully translating the approved Figma wireframes into clean, modular, and responsive code.

---

## ✨ Implemented Features & Completed Pages

- [x] **Main Landing Page (`index.html`)**: Features an elegant Hero section, handpicked Featured Bouquets, Customer Best Sellers, and value proposition cards.
- [x] **Shop & Catalog (`shop.html`)**: Interactive catalog grid with category filters (All, Roses, Sunflowers, Tulips, Occasions), search, and sorting.
- [x] **Custom Bouquet Builder & Details (`product-details.html`)**: Detailed view with quantity counter, wrapper selection, ribbon choices, and live price recalculation.
- [x] **Shopping Cart (`cart.html`)**: Real-time item listing, quantity modifier, subtotal computation, and promo code support.
- [x] **Checkout Flow (`checkout.html`)**: Multi-step delivery address form, date-time selector, payment method selection, and order summary.
- [x] **Contact & Inquiries (`contact.html`)**: Customer support form, store location information, and FAQ section.
- [x] **Customer Portal (`account.html`)**: Profile overview, active order tracking, and order history view.
- [x] **Admin Management Screen (`admin.html`, `admin-login.html`)**: Back-office dashboard for reviewing orders, catalog products, and inventory.

---

## 🧩 Reusable UI Components

To maintain consistency and maintainability across all pages, the following modular UI components were designed and implemented:

1. **Header & Sticky Navigation (`.bloom-navbar`)**
   - Brand logo and boutique typography.
   - Dynamic cart badge counter indicating total items in cart.
   - User authentication entry point (Login/Register modal trigger).
   - Fully responsive hamburger collapse for mobile and tablet devices.

2. **Product & Arrangement Cards (`.bloom-card`)**
   - High-resolution product showcase image with hover elevation.
   - Price display, floral rating stars, and quick "Add to Cart" or "Customize" action buttons.

3. **Custom Buttons (`.btn-bloom-primary`, `.btn-bloom-outline`)**
   - Cohesive pink/blush floral design tokens with rounded pills and subtle micro-interactions.

4. **Feedback & Alert Modals**
   - Integrated SweetAlert2 notifications for cart additions, validation errors, and confirmation dialogues.

5. **Site Footer**
   - Comprehensive footer with store hours, customer support hotline, social media handles, and newsletter sign-up.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic web markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **CSS3 / Vanilla CSS**: Custom modular styling (`global.css`, `home.css`, `shop.css`, `cart.css`, etc.) using CSS variables and modern flex/grid layouts.
- **Bootstrap 5.3.2**: Utility classes and responsive grid system for fluid cross-device adaptation.
- **Bootstrap Icons 1.11.1**: Clean, lightweight iconography.
- **JavaScript (Vanilla ES6+)**: Modular client-side scripts, DOM manipulation, and dynamic data rendering.
- **SweetAlert2 (v11)**: Elegant modal notifications and user feedback dialogs.
- **Apache / XAMPP**: Local server environment.

---

## 📁 Folder and File Structure

```text
FlowersOrdering/
│
├── .gitignore                      # Git ignore file for temporary & OS files
├── .htaccess                       # Server configuration rules
├── README.md                       # Complete project documentation and guide
│
├── index.html                      # Homepage / Landing page
├── shop.html                       # Product catalog with filter & sort
├── product-details.html            # Custom bouquet builder & product specs
├── cart.html                       # Shopping cart management
├── checkout.html                   # Checkout and shipping details
├── contact.html                    # Contact details & customer inquiry
├── account.html                    # Customer profile & order tracker
├── admin-login.html                # Admin authentication entry
├── admin.html                      # Store administration dashboard
│
└── assets/
    ├── css/
    │   ├── global.css              # Global styles, variables, typography, and nav/footer
    │   ├── home.css                # Styles specific to the homepage & hero
    │   ├── shop.css                # Catalog layout & filter panel styling
    │   ├── product-details.css     # Custom bouquet customization styles
    │   ├── cart.css                # Cart table & summary panel styling
    │   ├── checkout.css            # Checkout forms & order review styling
    │   ├── contact.css             # Contact form & location styling
    │   └── account.css             # Customer profile & order history styling
    │
    ├── js/
    │   ├── global.js               # Global scripts, cart badge updater, and modal handlers
    │   ├── home.js                 # Dynamic product rendering on homepage
    │   ├── shop.js                 # Catalog filtering, search, and sort logic
    │   ├── product-details.js      # Customization calculation & add-to-cart logic
    │   ├── cart.js                 # Cart manipulation & totals calculation
    │   ├── checkout.js             # Checkout validation & mock order submission
    │   ├── contact.js              # Contact form submission handling
    │   └── admin.js                # Admin table rendering & status updates
    │
    └── images/
        ├── logo.png                # Boutique brand logo
        ├── fl-*.png                # Flower bouquet product images
        ├── fw-*.png                # Wrapper texture options
        ├── sr-*.png                # Ribbon styles & accessories
        └── colors/                 # Color swatches
```

---

## 🚀 Setup & Installation Instructions

Follow these steps to run the project locally on your machine:

### Option A: Using XAMPP (Recommended)

1. **Install XAMPP**: Make sure [XAMPP](https://www.apachefriends.org/) is installed on your computer.
2. **Clone the Repository**:
   Open Git Bash or Command Prompt and clone the repository directly into your XAMPP `htdocs` directory:
   ```bash
   cd c:/xampp/htdocs/
   git clone https://github.com/Romarmalakass/ALTF4-FlowersOrdering.git FlowersOrdering
   ```
3. **Start Apache**:
   - Open the **XAMPP Control Panel**.
   - Click **Start** beside the **Apache** module.
4. **Access in Browser**:
   Open any web browser and navigate to:
   ```text
   http://localhost/FlowersOrdering/
   ```

---

### Option B: Using VS Code Live Server

1. **Open VS Code**:
   Launch Visual Studio Code and open the `FlowersOrdering` folder (`File > Open Folder...`).
2. **Install Live Server Extension**:
   Install the **Live Server** extension by *Ritwick Dey* from the VS Code Extensions Marketplace (`Ctrl+Shift+X`).
3. **Launch Server**:
   - Right-click on `index.html`.
   - Select **"Open with Live Server"** (or click **Go Live** at the bottom-right status bar).
4. The site will automatically launch at `http://127.0.0.1:5500/index.html`.

---

## 🌿 Git Collaboration Guidelines for Members

To ensure all team members have valid contributions recorded on GitHub:

1. **Accept GitHub Invitation**:
   Every team member must check their email or open [GitHub Invitations](https://github.com/Romarmalakass/ALTF4-FlowersOrdering/invitations) to accept their collaborator invite.
2. **Clone the Project Locally**:
   ```bash
   git clone https://github.com/Romarmalakass/ALTF4-FlowersOrdering.git
   cd ALTF4-FlowersOrdering
   ```
3. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: updated component/page details"
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request (PR)**:
   Create a Pull Request on GitHub to merge your work into the `master` branch.
