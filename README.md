# TrendCart

> Simple client-side product listing and shopping cart demo built with HTML, CSS, and vanilla JavaScript.

## Overview

TrendCart is a lightweight front-end e-commerce demo that showcases product browsing, searching, filtering by category, and a functional shopping cart. User authentication and registration are simulated with OTP verification, and all state is persisted using `localStorage`.

## Key Features

- **Product Browsing** — Display products across multiple categories (Electronics, Clothing, Books, Accessories).
- **Search & Filter** — Find products by name or browse by category.
- **Shopping Cart** — Add/remove items, adjust quantities, view totals.
- **Cart Drawer** — Side panel showing cart items with quick access.
- **Authentication** — Register and login flows with simulated OTP verification.
- **Persistent State** — User data, sessions, and cart contents saved to `localStorage`.
- **Responsive Design** — Mobile-friendly layout with hamburger menu for small screens.
- **Image Fade-in** — Smooth opacity transition when images load.

## Files & Structure

```
TrendCart/
├── index.html          # Main application file (HTML, CSS, JavaScript combined)
├── images/             # Product and hero image assets
├── README.md           # This file
└── .git/               # Git repository
```

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Python 3 or a local web server (recommended for best results)

### Run Locally

**Option 1: Direct File Open**
- Simply open `index.html` in your browser.

``
**Option 2: VS Code Live Server**
- Install the "Live Server" extension.
- Right-click `index.html` and select "Open with Live Server".

## How to Use

1. **Browse Products** — The homepage displays all available products.
2. **Search** — Use the search bar to find products by name.
3. **Filter by Category** — Select a category from the dropdown to narrow results.
4. **Add to Cart** — Click "Add to Cart" on any product card.
5. **View Cart** — Click the cart icon in the navbar to open the cart drawer.
6. **Adjust Quantity** — Use +/- buttons in the cart to change item quantities.
7. **Checkout** — Click "Buy Now" to simulate purchase (shows total, then resets cart).
8. **Register/Login** — Click the user icon to create an account or sign in.
   - Registration includes OTP verification (check browser console for simulated OTP).
   - Login persists your session across browser refreshes.

## Data Storage

All data is stored in browser `localStorage`:

| Key | Purpose |
|-----|---------|
| `users_v1` | Registered user accounts (email, name, password) |
| `session_v1` | Current logged-in user session |
| `cart_v1` | Current shopping cart items and quantities |

### Reset Demo Data
To clear all stored data and reset the app to its default state:

1. Open browser Developer Tools (F12 or right-click → Inspect).
2. Go to **Application** → **Local Storage**.
3. Find and delete entries for `users_v1`, `session_v1`, and `cart_v1`.
4. Refresh the page.

## Technical Notes

### Dependencies
- **Font Awesome** — Icon library (loaded via CDN).
- **Vanilla JavaScript** — No frameworks; pure ES6+ code.

### Browser Requirements
- Must support ES6+ syntax.
- `localStorage` support required.
- CSS Grid and Flexbox support.

### Known Limitations
- **OTP Verification** — Simulated via console/alert; not production-ready.
- **Password Security** — Passwords stored in plain `localStorage`; never use this for sensitive applications.
- **Image Assets** — Ensure all referenced images in the `images/` folder are present (or update `index.html` paths).

## Development & Future Improvements

### Current Architecture
- Single-file HTML document combining markup, styles, and scripts.
- Client-side state management using `localStorage`.

### Recommended Enhancements
1. **Separate Files** — Extract CSS into `styles.css` and JavaScript into `script.js`.
2. **Backend Integration** — Replace `localStorage` with a real API for user accounts, products, and orders.
3. **Build Tool** — Add Webpack, Vite, or Parcel for bundling and optimization.
4. **Email Service** — Integrate real OTP delivery via email (SendGrid, Twilio, etc.).
5. **Payment Gateway** — Add Stripe or PayPal for actual checkout.
6. **Unit Tests** — Add Jest or Vitest for testing.
7. **Accessibility** — Enhance ARIA labels and keyboard navigation.

## Project Structure for Future Refactoring

```
TrendCart/
├── public/
│   └── index.html
├── src/
│   ├── styles/
│   │   └── main.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── cart.js
│   │   └── products.js
│   └── images/
│       └── [product images]
├── package.json
├── vite.config.js
└── README.md
```

## License

This project is provided as-is for educational and demo purposes. Feel free to modify, extend, and redistribute while respecting any third-party image or asset licenses.

## Contact & Support

For questions or suggestions, refer to the project repository or create an issue.

---

**Last Updated:** November 2025
