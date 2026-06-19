# BookingHub

A Booking.com-inspired hotel and property booking web application built with React, Vite, and Tailwind CSS.

---

## Tech Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 19 | UI library |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Vite | 8 | Build tool & dev server |
| ESLint | 10 | Code linting |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd bookinghub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Project Structure

``
bookinghub/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Static assets (images, SVGs)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── SearchCard.jsx       # Main search form with destination, dates, guests
│   │   │   ├── RatingBadge.jsx      # Score badge (e.g. 9.6 Exceptional)
│   │   │   ├── StarRating.jsx       # Star rating display
│   │   │   └── Button.jsx           # Reusable button component
│   │   ├── Header.jsx               # Sticky header with service tabs & nav
│   │   ├── Footer.jsx               # Footer with links, payment icons, app download
│   │   ├── Layout.jsx               # Page layout wrapper (Header + Outlet + Footer)
│   │   ├── HeroSection.jsx          # Hero banner with sign-in prompt & search card
│   │   ├── PropertyCard.jsx         # Property card (vertical & horizontal layouts)
│   │   ├── PropertyTypeTabs.jsx     # Filterable tabs (Hotels, Apartments, Resorts, Villas)
│   │   ├── TrendingDestinations.jsx # Mosaic destination grid
│   │   └── DealsCarousel.jsx        # Deals & special offers carousel
│   ├── context/
│   │   └── SearchContext.jsx        # Global search state (destination, dates, guests)
│   ├── data/
│   │   └── properties.json          # Mock property data (10 properties)
│   ├── pages/
│   │   ├── HomePage.jsx             # Landing page
│   │   ├── SearchPage.jsx           # Search results with filters & sorting
│   │   ├── PropertyDetailPage.jsx   # Property detail with gallery, rooms & booking widget
│   │   ├── LoginPage.jsx            # Sign in page
│   │   └── SignupPage.jsx           # Register page
│   ├── utils/
│   │   └── helpers.js               # Utility functions (formatPrice, nightsBetween, etc.)
│   ├── App.jsx                      # Root component with routes
│   ├── index.css                    # Global styles & Tailwind theme tokens
│   └── main.jsx                     # App entry point
├── package.json
├── vite.config.js
└── README.md
``

---

## Pages

### Home (`/`)

- Hero section with sign-in savings banner and search card
- "I'm travelling for work" checkbox
- USP strip — 4 trust cards (free cancellation, reviews, properties, support)
- Trending destinations mosaic grid
- Deals & special offers carousel with heart wishlist toggle
- Property type tabs (All, Hotels, Apartments, Resorts, Villas) filtering property cards

### Search (`/search`)

- Compact search bar at the top
- Left sidebar filters: property type, max price slider, amenities checkboxes
- Sort options: Recommended, Price low/high, Top reviewed
- Results count with destination label
- Mobile filter drawer
- Horizontal property cards with heart toggle

### Property Detail (`/property/:id`)

- Breadcrumb navigation
- Photo gallery with lightbox (click to open, arrow navigation)
- Title, star rating, Genius badge, location, review score
- Free cancellation banner
- About the property description
- Amenities grid
- Available rooms table with Reserve button
- Guest reviews with avatar initials
- Sticky booking widget with date picker, guest selector, price breakdown

### Login (`/login`)

- Email & password form
- Google sign-in option
- Link to register

### Register (`/signup`)

- First name, last name, email, password
- Terms & Privacy Policy links
- Link to sign in

---

## Key Components

### SearchCard

Located in `src/components/ui/SearchCard.jsx`. Connects to `SearchContext` for global state. Features:

- Destination text input with search icon
- Check-in / Check-out date pickers
- Guests dropdown (Adults, Children, Rooms) with +/− controls
- Navigates to `/search` on submit

### SearchContext

Located in `src/context/SearchContext.jsx`. Provides global state for:

- `destination`, `checkIn`, `checkOut`, `guests`
- `propertyType`, `sortBy`, `priceRange`, `selectedAmenities`
- `updateSearch()`, `resetFilters()`, `toggleAmenity()`

> The `SearchProvider` must wrap the app in `App.jsx` for all pages to access search state.

### PropertyCard

Located in `src/components/PropertyCard.jsx`. Supports two layouts:

- `layout="vertical"` — used in homepage grid (image top, details below)
- `layout="horizontal"` — used in search results (image left, details right)

Both layouts include a heart wishlist button with `useState` toggle (outline → filled red).

### PropertyTypeTabs

Located in `src/components/PropertyTypeTabs.jsx`. Self-contained with its own `useState`:

- Tabs: All stays, Hotels, Apartments, Resorts, Villas
- Filters and renders property cards below
- Scrollable on mobile/tablet, wraps statically on large screens

---

## Data

Mock data lives in `src/data/properties.json` with 10 properties. Each property has:

```json
{
  "id": "1",
  "name": "Grand Horizon Hotel",
  "location": "Paris, France",
  "type": "hotel",
  "pricePerNight": 189,
  "rating": 4.8,
  "reviewCount": 1243,
  "stars": 5,
  "amenities": ["Free WiFi", "Pool", "Spa", ...],
  "images": ["url1", "url2", ...],
  "description": "...",
  "roomTypes": [{ "name": "Classic Double", "capacity": 2, "price": 189 }],
  "reviews": [{ "author": "Marie L.", "score": 9.2, "comment": "...", "date": "2025-11-12" }]
}
```

**Property types available:** `hotel`, `apartment`, `resort`, `villa`

---

## Theming

Custom theme tokens are defined in `src/index.css` using Tailwind v4 `@theme`:

```css
--color-primary: #003580       /* Booking.com navy blue */
--color-primary-dark: #00224f
--color-primary-light: #0057b8
--color-accent: #febb02        /* Booking.com yellow */
--color-border: #e7e7e7
--color-muted: #6b6b6b
--color-success: #008009
```

---

## Features Overview

| Feature | Status |
| --- | --- |
| Property search with filters | ✅ |
| Sort by price / rating | ✅ |
| Property detail page | ✅ |
| Photo gallery with lightbox | ✅ |
| Room selection | ✅ |
| Booking price breakdown | ✅ |
| Wishlist / heart toggle | ✅ |
| Responsive design (mobile → desktop) | ✅ |
| Sticky header with service tabs | ✅ |
| Mobile hamburger menu | ✅ |
| Global search context | ✅ |
| Login / Register pages | ✅ |

---

## Responsive Breakpoints

| Breakpoint | Width | Behaviour |
| --- | --- | --- |
| `sm` | 640px | Service tabs visible in header, 2-col grids |
| `md` | 768px | Nav links (Sign in, Register) appear |
| `lg` | 1024px | Sidebar filters visible, 4-col grids, tabs wrap |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

This project is for educational purposes only. Design inspired by [Booking.com](https://www.booking.com).
