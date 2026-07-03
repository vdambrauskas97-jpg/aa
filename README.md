# Vehicle Import Calculator

Desktop app for quoting the landed cost of vehicles imported from US auctions
(Copart / IAAI) to Klaipėda, Lithuania — with client records, per-car customs
tax, debt tracking and automatic invoicing.

Built with **React + Vite** (renderer) inside **Electron** (desktop shell), and
packaged to a Windows installer with **electron-builder**.

---

## Prerequisites

- **Node.js 18 or newer** (includes npm) — https://nodejs.org
- To build the Windows installer, run on **Windows** (electron-builder produces
  the `.exe` for the platform it runs on).

## Install

```bash
npm install
```

## Run in development

Starts Vite with hot-reload and opens the Electron window against it:

```bash
npm run dev
```

## Build the Windows installer (the downloadable/installable program)

```bash
npm run dist
```

This bundles the app and writes an installer to **`release/`**:

```
release/Vehicle Import Calculator-Setup-1.0.0.exe
```

Double-click that `.exe` to install. It's a standard NSIS installer: it lets the
user choose the install location and creates a desktop + Start-menu shortcut.

## Get the `.exe` without installing anything (GitHub builds it for you)

The repo includes `.github/workflows/build-windows.yml`, so GitHub's free build
servers can produce the installer:

1. Create a free account at https://github.com and click **New repository**
   (private is fine). Don't add a README — keep it empty.
2. On the empty repo page, click **“uploading an existing file”**, then drag in
   **everything inside** the unzipped project folder (including the `.github`
   folder) and press **Commit changes**.
3. Open the **Actions** tab — a run named *Build Windows installer* starts
   automatically (≈5–8 min). If it didn't, select it and press **Run workflow**.
4. When it turns green, open the run and download the
   **Vehicle-Import-Calculator-Setup** artifact — a zip containing the `.exe`.


> Faster smoke-test without building the full installer — produces an unpacked
> app under `release/win-unpacked/`:
> ```bash
> npm run dist:dir
> ```

### App icon (optional)

No custom icon is bundled, so the default Electron icon is used. To brand it, add
`build/icon.ico` (256×256) and electron-builder will pick it up automatically.

---

## Where data is stored

The app persists everything (clients, cars, tax, invoices) as a single JSON file
in the OS user-data directory, written by the Electron main process:

```
%APPDATA%\Vehicle Import Calculator\data.json   (Windows)
```

Deleting that file resets the app.

## First-run sample data

On first launch — when no `data.json` exists yet — the app seeds a few sample
clients and cars so the screens aren't empty. To ship with an empty database,
open `src/lib/storage.js` and return an empty structure instead of `SEED`:

```js
return { clients: [], cars: [], invoiceNext: 1 };
```

---

## Project structure

```
vehicle-import-calculator/
├── electron/
│   ├── main.cjs          Electron main process: window + JSON persistence (IPC)
│   └── preload.cjs        contextBridge exposing window.appStorage {load, save}
├── src/
│   ├── main.jsx           React entry
│   ├── App.jsx            Header, tab nav, page routing, database wiring
│   ├── index.css          Tailwind layers + base
│   ├── theme.js           Design tokens (colors, status tints)
│   ├── constants.js       Fees, VAT, FX spread, vehicle types, invoice prefix
│   ├── data/
│   │   ├── freight.js      Ports + 691 auction yards (parsed from the freight xlsx)
│   │   └── seed.js         First-run sample clients & cars
│   ├── lib/
│   │   ├── format.js       Money/number formatting, ids, invoice numbers
│   │   ├── pricing.js      VIN validation + landed-cost breakdown
│   │   ├── clients.js      Client model: draft, validation, display, build
│   │   ├── tax.js          Customs value, per-car tax total, client debt
│   │   └── storage.js      Load/save bridge to Electron (seed fallback)
│   ├── hooks/
│   │   ├── useDatabase.js   Owns the database + all mutations, auto-persists
│   │   ├── useSplitPane.js  Draggable resize between calculator panels
│   │   └── useArmedDelete.js Two-click delete confirmation
│   └── components/
│       ├── ui.jsx           Shared primitives (inputs, buttons, tabs)
│       ├── ClientFields.jsx Private/business client form
│       ├── CalculatorPage.jsx
│       ├── ClientsPage.jsx
│       └── CarsPage.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json           Scripts + electron-builder config
```

## How the numbers work

- **Total** = winning bid (auction fees already included) + towing to port +
  ocean freight + customs broker fee + our service fee.
- The **service fee** is a fixed EUR amount; its USD value floats with the rate.
- EUR figures use the entered rate **minus a 0.02 spread**.
- **Duty** (10% cars, 6% motorcycles) and **VAT** (21%) are computed on the
  **customs value** (bid + freight) and shown as a customs preview — they are
  **not** part of the total.
- Marking a car **Paid** issues the next sequential invoice (`BAI00001`, …); the
  number is assigned once and never reused.

> ⚠️ **Fee values are placeholders.** Verify towing, ocean freight, broker and
> service fees against your current rates and the Copart/IAAI schedules before
> quoting real customers.
