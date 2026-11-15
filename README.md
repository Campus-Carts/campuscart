# 🛒 CampusCart — Campus Marketplace (Customer UI)

CampusCart is a student-first peer-to-peer and vendor marketplace designed specifically for university campuses. It eliminates off-campus shipping fees and dispatches by enabling students to browse food, textbooks, dorm essentials, and electronics, and arrange quick on-campus public meetups.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed.

### 2. Install Dependencies
Open your terminal in this directory:
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Then visit `http://localhost:3000` in your browser.

---

## 📱 Pages Built (Customer Experience)

1. **Home (`/`)**:
   - Hero banner with quick search and category highlights
   - Hottest dorm deals and spotlight cards
   - Live campus stats (e.g. 15-min handoffs, ₦0 delivery fee)
   - Campus safety and pickup guide banner

2. **Browse (`/browse` and `/browse/:category`)**:
   - Category filter pills (Food, Textbooks, Tech, Dorm, Fashion, Services)
   - Price bracket filter (≤ ₦2,000, ₦2k–₦5k, > ₦5k)
   - Sorting by Price (Low/High), Rating, and Recommended

3. **Product Detail (`/product/:id`)**:
   - High-res image display with condition badge
   - Designated campus pickup spot & verified student seller info
   - Add to Cart with feedback & Wishlist toggle
   - Interactive vendor chat simulator to ask questions before ordering

4. **Cart (`/cart`)**:
   - Stepper quantity controls (+ / −)
   - Subtotal calculations with automatic free campus pickup indicator
   - Empty state with student-friendly micro-copy

5. **Campus Pickup Checkout (`/checkout`)**:
   - Student contact input (Name, Phone, WhatsApp)
   - Campus pickup point selector (Library walkway, SUB, Hall Porter desks, Faculty quads)
   - Flexible payment preferences (Inspect & Pay on Meetup or Direct Student Transfer)
   - Order confirmation and reference generation (`#CC-XXXXXX`)

6. **Student Profile (`/profile`)**:
   - Verified student profile card
   - Tabbed view: **Order History & Handoff tracking** vs **Saved For Later** (Wishlist)

7. **Search Results (`/search?q=...`)**:
   - Instant search across product titles, categories, vendor names, and pickup spots

---

## 🎨 Tech Stack
- **React 18**
- **Vite**
- **React Router v6**
- **Vanilla CSS Modules / Design System** (Variables, responsive grids, mobile-optimized cards)
- **Local Storage State Persistence** for Cart, Wishlist, and Order History
