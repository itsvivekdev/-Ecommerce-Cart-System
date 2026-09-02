# ShopSee — Mini E-Commerce & Cart System

ShopSee is a clean, responsive mini e-commerce web application built using vanilla JavaScript and CSS, fetching live product data from the DummyJSON API. It features real-time search, category sorting, and an interactive slide-out cart with live counters and dynamic price calculations.

🔗 **Live Demo:** [itsvivekdev.github.io/-Ecommerce-Cart-System](https://itsvivekdev.github.io/-Ecommerce-Cart-System/)

---

## ✨ Features

- **Dynamic Product Feed:** Fetches real-time catalog items from the DummyJSON API with titles, prices, categories, and images.
- **One-Click Add to Cart:** Click `+ Add` directly from any product card to immediately push items into the cart without page refreshes.
- **Live Item Counter Badge:** Real-time counter badge in the navbar (`0 Items`) that dynamically tracks total unit counts as you modify cart items.
- **Quantity Adjustments (`+` / `-`):** Increment or decrement product units directly inside the drawer, automatically recalculating the subtotal.
- **Item Removal (`✕`):** Instantly remove specific items from the list with immediate UI and total price adjustments.
- **Real-Time Total Calculation:** Automatic math updates that instantly reflect quantity additions, subtractions, and removals down to exact decimals.
- **LocalStorage Sync:** Preserves cart state, item quantities, and count badges across browser refreshes and sessions.
- **Search, Filter & Sort:** Instant keyword matching, category selection dropdowns, and sorting options.
- **Slide-Out Drawer UI:** Smooth side-cart animation with clean checkout summary, built completely with custom CSS.

---

## 🛠 Tech Stack

- **Markup:** HTML5
- **Styling:** Vanilla CSS (Flexbox, CSS Grid, Sliding Animations)
- **Logic:** Vanilla JavaScript (ES6+, Fetch API, Dynamic DOM Manipulation)
- **Data Source:** [DummyJSON API](https://dummyjson.com/)
- **Storage:** Browser LocalStorage API
- **Deployment:** GitHub Pages

---

## 📂 Project Structure

```text
-Ecommerce-Cart-System/
├── index.html     # Semantic page structure & cart drawer layout
├── index.css      # Custom styles, responsive grid & slide-in drawer
└── index.js       # Fetch requests, cart state, counter logic & LocalStorage
