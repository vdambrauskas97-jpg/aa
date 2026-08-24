# BidPort - car auction brokerage platform

A web platform for finding cars at US auctions (Copart / IAAI), checking a
vehicle's full sale history by VIN, and requesting a brokered import to
Klaipėda. The look and feel follows the minimalist bid.cars style: navy
chrome, a single red-orange accent, and dense, honest data cards.

**Status: frontend preview.** Every vehicle, price, and stat on the site is
sample content served by a mock data layer. The live auction API plugs into
one file when it is ready (see "Connecting the real API" below).

## What's on the site

- **Home** - hero VIN/lot/keyword search, archive stats, recently sold grid,
  browse by make, and the brokerage "how it works" section.
- **Search** (`/search`) - the archive and live lots with URL-driven filters
  (status, auction, make, year range, damage, fuel), facet counts, sorting,
  and pagination. `Auction archive` and `Live auctions` in the nav are this
  page pre-filtered.
- **Vehicle detail** (`/vehicle/:id`) - gallery (placeholder until the API
  delivers lot photos), sale panel with final/current bid and buy-now,
  full specs, **sale history for the VIN** (every recorded auction
  appearance with odometer trail and final bids), and similar vehicles.
- **Talk to a broker** (`/contact`) - quote request form, pre-filled with the
  VIN when opened from a vehicle page. Not wired to a backend yet.

## Stack

React 18 + Vite 5, Tailwind CSS 3, react-router-dom 6,
Phosphor icons, self-hosted Geist / Geist Mono (no external font CDN).
Plain JavaScript (JSX), no TypeScript.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the production build
```

## Project layout

```
src/
  api/
    client.js     the data-access contract every page talks to
    mockData.js   sample vehicles, stats, makes (delete when API lands)
  components/     header, footer, cards, badges, filters, skeletons...
  pages/          Home, Search, Vehicle, Contact, NotFound
  lib/            formatters, useAsync fetch hook
tailwind.config.js  design tokens (palette, fonts, radii)
```

## Connecting the real API

The UI never touches mock data directly; everything goes through
`src/api/client.js`:

- `searchVehicles(params)` - filtered, sorted, paginated search + facet counts
- `getVehicle(id)` / `getVinHistory(vin)` - one vehicle with its full
  `records[]` sale history (newest first)
- `getRecentlySold(limit)`, `getSimilarVehicles(vehicle, limit)`
- `getStats()`, `getPopularMakes()`

Replace the bodies of those functions with `fetch` calls that return the same
shapes (the JSDoc typedefs at the top of the file document them) and delete
`mockData.js`. Loading, empty, and error states are already handled by every
page.

Also still open: real lot photos in `VehiclePhoto`, wiring the contact form
to the broker inbox, and authentication if user accounts are needed.

## CI

`.github/workflows/build.yml` builds the site on every push and uploads the
`dist/` bundle as an artifact.
