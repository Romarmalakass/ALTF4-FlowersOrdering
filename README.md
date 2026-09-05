# Craft & Wrapped Haven
An online flower ordering and custom bouquet website for handcrafted flowers, fresh roses, sunflowers, and customized floral arrangements.

## Project Details
- **Course Milestone:** Week 5 - Frontend Project Setup and Code Repository
- **Group Name:** ALT F4
- **Project Manager:** Divine ([@Divine253](https://github.com/Divine253))
- **Repository Link:** https://github.com/Romarmalakass/ALTF4-FlowersOrdering

### Group Members
- **Divine** (Project Manager) - @Divine253
- **Romar Malakas** - @Romarmalakass
- **Ariza Garcia** - @arizagarcia217-ops
- **BEEMO0508** - @BEEMO0508
- **Dyisiefdyi** - @Dyisiefdyi
- **oriaxxxx** - @oriaxxxx

---

## Project Description
Craft & Wrapped Haven is a web application created to showcase handcrafted and fresh flower arrangements. Customers can browse different flower categories, customize their own bouquet by selecting flowers, wrappers, and ribbons, and proceed through a shopping cart and checkout process.

This Week 5 submission establishes our frontend project foundation, implementing our approved Figma design, file structure, reusable UI components, and initial functional pages.

---

## Pages and Components
### Completed Pages
- **Home (`index.html`)** - Main landing page with hero banner, featured bouquets, and best sellers.
- **Shop (`shop.html`)** - Flower catalog with search, filter by category, and sorting.
- **Custom Bouquet (`product-details.html`)** - Bouquet customization page with options for flowers, wrappers, and ribbons.
- **Cart (`cart.html`)** - Shopping cart view for reviewing selected items and totals.
- **Checkout (`checkout.html`)** - Order form with delivery details and payment options.
- **Contact Us (`contact.html`)** - Inquiry form, store location, and FAQs.
- **Account (`account.html`)** - Profile overview and order tracker.
- **Admin (`admin.html`)** - Store management view for tracking incoming orders.

### Reusable UI Components
- **Navigation Bar (`bloom-navbar`)** - Responsive sticky header with page links and cart counter badge.
- **Product Cards (`flower-card`)** - Reusable card displaying product image, price, rating, and action buttons.
- **Buttons** - Consistent button styles (`btn-bloom-primary`, `btn-bloom-outline`).
- **Modal Dialogs** - Login/registration popup modal and feedback alerts.
- **Footer** - Standard site footer with contact details and quick links.

---

## Technologies Used
- HTML5
- CSS3 (Vanilla CSS with custom stylesheets)
- JavaScript (Vanilla ES6)
- Bootstrap 5.3.2
- Bootstrap Icons 1.11.1
- SweetAlert2
- XAMPP / Apache

---

## Project Structure
```text
FlowersOrdering/
├── index.html
├── shop.html
├── product-details.html
├── cart.html
├── checkout.html
├── contact.html
├── account.html
├── admin.html
├── admin-login.html
├── .gitignore
├── .htaccess
├── README.md
└── assets/
    ├── css/
    ├── js/
    └── images/
```

---

## Setup and Installation
### Running with XAMPP
1. Move or clone this project folder into your XAMPP `htdocs` directory:
   ```bash
   c:/xampp/htdocs/FlowersOrdering
   ```
2. Open XAMPP Control Panel and start the **Apache** server.
3. Open your browser and go to:
   ```text
   http://localhost/FlowersOrdering/
   ```

### Running with VS Code Live Server
1. Open the `FlowersOrdering` folder in VS Code.
2. Right-click on `index.html` and select **Open with Live Server**.
