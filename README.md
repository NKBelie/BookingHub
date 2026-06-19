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

### Create React Project

```bash
npm create vite@latest
```

### Installation

```bash
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

```text
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
│   │   ├── Footer.jsx               # Footer with links and copyright
│   │   ├── Layout.jsx               # Page layout wrapper (Header + Outlet + Footer)
│   │   ├── HeroSection.jsx          # Hero banner with search card
│   │   ├── PropertyCard.jsx         # Property card (vertical & horizontal layouts)
│   │   ├── PropertyTypeTabs.jsx     # Filterable tabs (Hotels, Apartments, Resorts, Villas)
│   │   ├── TrendingDestinations.jsx # Destination image grid
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
```

---

## Navigation & Routing

This app uses **React Router DOM v7** for client-side navigation. No full page reloads happen — React swaps components in and out based on the URL.

### How routing is set up — `App.jsx`

```jsx
<BrowserRouter>
  <SearchProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="property/:id" element={<PropertyDetailPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  </SearchProvider>
</BrowserRouter>
```

- `BrowserRouter` — enables URL-based navigation using the browser history API
- `SearchProvider` — wraps the whole app so every page can access search state
- `Routes` — container that matches the current URL to a route
- `Route element={<Layout />}` — a parent route that renders the shared Header and Footer via `<Outlet />`
- `<Route index>` — matches the root path `/` exactly
- `path="property/:id"` — `:id` is a dynamic segment; the value is read with `useParams()` inside the page

### Route map

```text
/                    → HomePage       (inside Layout)
/search              → SearchPage     (inside Layout)
/search?type=hotel   → SearchPage     (filters by type on load)
/property/:id        → PropertyDetailPage (inside Layout)
/login               → LoginPage      (no Layout — full screen)
/signup              → SignupPage     (no Layout — full screen)
```

### Layout component — `Layout.jsx`

`Layout.jsx` wraps every main page with the sticky `Header` at the top and `Footer` at the bottom. The `<Outlet />` is where the matched child page renders.

```jsx
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />   {/* HomePage, SearchPage, or PropertyDetailPage renders here */}
      </main>
      <Footer />
    </div>
  )
}
```

Login and Signup are placed **outside** the Layout route so they render as standalone full-screen pages without the header and footer.

### Navigation between pages

Pages link to each other using React Router's `<Link>` and `<NavLink>` components instead of plain `<a>` tags. This prevents full page reloads.

```jsx
// Plain navigation link
<Link to="/search">Search</Link>

// Programmatic navigation after form submit
const navigate = useNavigate()
navigate('/search')

// Active-aware link (adds styling when URL matches)
<NavLink to="/search" className={({ isActive }) => isActive ? 'text-white' : 'text-white/70'}>
  Stays
</NavLink>
```

---

## Pages

### Home (`/`)

The landing page. Composed of multiple sections stacked vertically:

1. **HeroSection** — navy banner with the search card overlapping below it
2. **USP strip** — 4 trust cards (free cancellation, reviews, properties, 24/7 support)
3. **PropertyTypeTabs** — pill buttons filtering the featured property grid
4. **TrendingDestinations** — 2-row image grid of popular cities
5. **Genius banner** — sign-in prompt with Register and Sign in buttons
6. **DealsCarousel** — 3 deal cards at a time with prev/next pagination
7. **Homes guests love** — 4 property cards filtered by the active tab

### Search (`/search`)

Displays filtered and sorted property results.

- Compact search bar at the top (reuses `SearchCard` in compact mode)
- Left sidebar with property type checkboxes, price range slider, and amenities filters (desktop only)
- Mobile filter drawer — slides in from the right on small screens
- Sort dropdown — Recommended, Price low/high, Top reviewed
- Results count with destination label
- Horizontal `PropertyCard` layout for each result

URL query params are read on load:

```text
/search?type=hotel          → pre-selects Hotels filter
/search?destination=Paris   → pre-filters by destination name
```

### Property Detail (`/property/:id`)

Detailed view for a single property. The `:id` param is matched against `properties.json`.

- Breadcrumb: Home / Search / Property name
- Photo gallery — 2-column grid (1 large + 4 smaller), click any to open lightbox
- Lightbox — fullscreen overlay with prev/next arrow navigation
- Title, star rating, location, review score badge
- About section — property description
- Amenities grid with checkmark icons
- Available rooms table — select a room to update the booking widget price
- Guest reviews — author, score badge, comment, date
- Sticky booking widget (desktop) — date inputs, guest selector, price breakdown, Reserve button

### Login (`/login`)

Standalone full-screen page (no header/footer).

- Email and password inputs
- Google sign-in button (UI only)
- Link to Register page

### Register (`/signup`)

Standalone full-screen page (no header/footer).

- First name, last name, email, password inputs
- Terms and Privacy Policy links
- Link to Sign in page

---

## Key Components

### Header — `src/components/Header.jsx`

Sticky header that stays at the top of the screen as you scroll. Contains two rows:

1. **Top row** — BookStay logo, language/currency buttons, List your property, Sign in, Register
2. **Service tabs row** — Stays, Flights, Car rentals, Attractions, Airport taxis (each with an SVG icon)

On mobile the service tabs are hidden and replaced with a hamburger button that toggles a full-width dropdown menu. Uses `useState` for `menuOpen`.

### HeroSection — `src/components/HeroSection.jsx`

Renders the navy hero banner with the heading and subtitle. The `SearchCard` sits outside the section with a negative top margin (`-mt-16`) so it visually overlaps the bottom of the banner.

### SearchCard — `src/components/ui/SearchCard.jsx`

The main search form. Accepts a `compact` prop — when `true` it renders in a smaller single-line layout for the Search page header.

Fields:

| Field | State | Behaviour |
| --- | --- | --- |
| Destination | `localDest` | Free text input |
| Dates | `localCheckIn`, `localCheckOut` | Click to open date picker dropdown |
| Guests | `localGuests` | Click to open guests/rooms counter |

On submit, values are written to `SearchContext` via `updateSearch()` and the user is navigated to `/search`.

The "I'm traveling for work" checkbox at the bottom matches the real Booking.com search bar.

### PropertyCard — `src/components/PropertyCard.jsx`

Reusable card that supports two layouts controlled by the `layout` prop:

- `layout="vertical"` — image on top, details below. Used in the homepage grid.
- `layout="horizontal"` — image on the left, details on the right. Used in search results.

Both layouts show name, location, star rating, description excerpt, amenities chips, price per night, and a rating badge.

### PropertyTypeTabs — `src/components/PropertyTypeTabs.jsx`

Horizontally scrollable row of pill buttons on the home page. Clicking a tab filters the "Homes guests love" grid below it. Uses local `useState` for `activeType`. On the Search page, filters are handled separately in the sidebar.

### TrendingDestinations — `src/components/TrendingDestinations.jsx`

Two-row image grid matching Booking.com's destination postcard layout:

- Row 1 — two wide cards at `2:1` aspect ratio
- Row 2 — three portrait cards at `4:3` aspect ratio

Each card links to `/search?destination=CityName`.

### DealsCarousel — `src/components/DealsCarousel.jsx`

Shows 3 deal cards at a time from the properties list. Prev/next arrow buttons shift the visible window by one. Uses `useState` for `start` index. Each card shows a heart wishlist toggle button.

### RatingBadge — `src/components/ui/RatingBadge.jsx`

Displays a score like `8.5` in a navy rounded badge with a label like "Excellent". The label is derived from the score range.

| Score | Label |
| --- | --- |
| 9+ | Exceptional |
| 8–9 | Excellent |
| 7–8 | Very Good |
| 6–7 | Good |
| Below 6 | Okay |

### StarRating — `src/components/ui/StarRating.jsx`

Renders a row of filled/empty star SVG icons based on a `stars` prop (1–5). Used on property cards and the detail page.

---

## State Management

### Local state with useState

`useState` is used in individual components for UI state that only that component needs to know about.

**Syntax:**

```jsx
const [value, setValue] = useState(initialValue)
```

- `value` — the current value you read in JSX
- `setValue` — call this to update the value and trigger a re-render
- `initialValue` — what the value starts as (runs only on first render)

**Where it is used in this project:**

```text
Header.jsx            → menuOpen       controls mobile menu open/closed
HomePage.jsx          → activeType     tracks which property type tab is active
SearchCard.jsx        → localDest      destination text input value
                      → localCheckIn   selected check-in date
                      → localCheckOut  selected check-out date
                      → localGuests    object with adults, children, rooms counts
                      → showDates      controls date picker dropdown visibility
                      → showGuests     controls guests dropdown visibility
DealsCarousel.jsx     → start          index of first visible deal card
PropertyDetailPage.jsx → activeImg     index of photo shown in lightbox
                       → lightbox      controls lightbox overlay visibility
                       → localCheckIn  booking widget check-in date
                       → localCheckOut booking widget check-out date
                       → localGuests   booking widget guest count
                       → selectedRoom  which room type the user has selected
```

**Example — toggling the mobile menu:**

```jsx
const [menuOpen, setMenuOpen] = useState(false)

<button onClick={() => setMenuOpen(!menuOpen)}>
  Menu
</button>

{menuOpen && <nav>...</nav>}
```

**Example — updating a nested object (guests):**

```jsx
// Always spread the previous state to keep other fields intact
setLocalGuests((g) => ({ ...g, adults: Math.max(1, g.adults - 1) }))
```

**Rules:**

1. Never mutate state directly — always use the setter function
2. Use the function form `(prev) => newValue` when the new value depends on the previous value
3. Each `useState` call is independent — updating one does not affect others
4. State is local to the component — other components cannot see it unless you pass it as a prop or lift it to a shared context

### Global state with SearchContext

`SearchContext` holds the search values that need to be shared across multiple pages (Home, Search, Property Detail). It is created with React's Context API and provided at the app root in `App.jsx`.

```text
SearchProvider (App.jsx)
├── HomePage     → reads/writes destination, dates, guests via updateSearch()
├── SearchPage   → reads destination, type to filter results
└── PropertyDetailPage → reads checkIn, checkOut, guests for booking widget defaults
```

Any component can access search state by calling:

```jsx
const { destination, checkIn, checkOut, guests, updateSearch } = useSearch()
```

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
  "amenities": ["Free WiFi", "Pool", "Spa"],
  "images": ["url1", "url2"],
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
--color-primary: #003580       /* navy blue */
--color-primary-dark: #00224f
--color-primary-light: #0057b8
--color-accent: #febb02        /* yellow */
--color-border: #e7e7e7
--color-muted: #6b6b6b
--color-success: #008009
```

---

## Features Overview

| Feature | Status |
| --- | --- |
| Property search with filters | Done |
| Sort by price / rating | Done |
| Property detail page | Done |
| Photo gallery with lightbox | Done |
| Room selection | Done |
| Booking price breakdown | Done |
| Deals carousel with pagination | Done |
| Trending destinations grid | Done |
| Responsive design (mobile to desktop) | Done |
| Sticky header with service tabs | Done |
| Mobile hamburger menu | Done |
| Global search context | Done |
| Login / Register pages | Done |

---

## Responsive Breakpoints

| Breakpoint | Width | Behaviour |
| --- | --- | --- |
| `sm` | 640px | 2-column grids, date inputs in a row |
| `md` | 768px | Auth buttons appear in header |
| `lg` | 1024px | Sidebar filters visible, 4-column grids, full search bar row |

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
