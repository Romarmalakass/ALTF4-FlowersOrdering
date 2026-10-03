# Craft and Wrapped Haven

Online flower ordering and custom bouquet website for handcrafted flowers and customized floral arrangements.

Project Details:
Course Milestone: Week 9 - Usability Testing & Project Refinement
Group Name: ALT F4
Project Manager: Divine Grace Antigo
Lead Developer: Romar Villafuerte (Romarmalakass)
Repository Link: https://github.com/Romarmalakass/ALTF4-FlowersOrdering
Live Prototype URL: https://romarmalakass.github.io/ALTF4-FlowersOrdering/
Deployment Platform: GitHub Pages
Deployment Date: September 29, 2026 (Updated with Week 9 Refinements)

Group Members:
- Divine Grace Antigo / Project Manager
- Romar Villafuerte / Lead Frontend Developer
- Jann Christopher Abacan / UI/UX Designer
- Mike Lacebal Jr / QA Tester
- Ariza Garcia / Systems Analyst
- Ivan Wayne Biore / QA Tester

---

Project Description:
Craft and Wrapped Haven is a luxury ordering website for handcrafted flowers and customized floral bouquets. Users can browse the catalog, assemble custom bouquets with wrappers and ribbons, manage cart items, and complete order checkout with delivery, pickup, or meetup scheduling.

---

Project Progress: Week 9 Milestone (Usability Testing & Project Refinement)

Key Usability Improvements & Refinements Implemented:
- Catalog Search & Filter Clarity: Added real-time stem counter ("Showing X handcrafted stems") and an inline one-tap "Clear Search" button (×) in the Floral Catalog.
- Custom Bouquet Builder Streamlined Management: Replaced redundant bottom reset button with an inline one-tap "Clear All" action and instant per-item remove buttons (✕) in the Live Order Total summary for effortless customization without having to search for stems.
- Checkout Scheduling & Fulfillment UX: Added strict date constraints (min date set to current date to prevent invalid past delivery dates) and dynamic contextual address helpers for Delivery, Studio Pick Up, and Public Meet Up.
- Interactive Feedback & Ergonomics: Enhanced SweetAlert2 toast notifications, improved mobile drawer touch targets (min 44px), and refined component transitions.

Completed Frontend Prototype Screens & Modules:
- Home (index.html) - Brand landing page with hero showcase, trust badges, and quick CTA buttons.
- Shop Catalog (shop.html) - Handcrafted product catalog with live category filters, search, and quick add-to-cart.
- Custom Bouquet Builder (product-details.html) - Interactive multi-step stem customizer, wrapper/ribbon selection & dynamic real-time price calculation.
- Shopping Cart (cart.html) - Cart items review, quantity adjustments, subtotal computation, and checkout transition.
- Checkout & Order Form (checkout.html) - Delivery, Pick Up, and Meet Up scheduling, customer address details, and Cash payment confirmation.
- Customer Account & Order Tracking (account.html / cart.html?tab=orders) - Buyer profile settings and live multi-stage order pipeline tracker.
- Admin Store Management (admin.html) - Order monitoring by status, fulfillment stage transitions, customer chat preview, and order details review.
- Contact & Customer Inquiries (contact.html) - Customer support messaging form and FAQ accordion.

---

Deployment & Live Demo:
- Platform: GitHub Pages
- Live Website URL: https://romarmalakass.github.io/ALTF4-FlowersOrdering/
- Accessibility: Publicly accessible across all web browsers without local server requirements.
- Target Devices: Tested & responsive on Mobile (Android / iOS), Tablet, and Desktop resolutions.

---

Reusable Components:
- Navigation bar with cart badge
- Product card for flowers
- Primary and secondary buttons
- Login modal popup
- Footer section

---

Technologies Used:
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- SweetAlert2
- Visual Studio Code
- Figma

---

Folder Structure:
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

---

How to Run:
Option 1: Direct in Browser
1. Open the project folder.
2. Double-click or open index.html in any web browser.

Option 2: Using VS Code Live Server
1. Open the FlowersOrdering folder in VS Code.
2. Right click index.html and click Open with Live Server.
