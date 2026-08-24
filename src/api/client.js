/**
 * Data access layer. Every UI surface talks to these functions and nothing
 * else, so swapping the mock backing for the live auction API means changing
 * only this file (replace the in-memory lookups with fetch calls and keep the
 * return shapes).
 *
 * Contract (JSDoc):
 *
 * @typedef {Object} SaleRecord
 * @property {"sold"|"live"|"upcoming"} status
 * @property {"copart"|"iaai"} source
 * @property {string} lot          digit string, unique per auction appearance
 * @property {string} location
 * @property {string} saleDate     ISO date (yyyy-mm-dd)
 * @property {number} odometer     miles at that appearance
 * @property {string} damagePrimary
 * @property {?string} damageSecondary
 * @property {number} [finalBid]   sold records ONLY; never on live/upcoming
 * @property {number} [currentBid] live/upcoming ONLY; 0 means "no bids yet"
 * @property {?number} [buyNow]    live/upcoming ONLY; null when not offered
 *
 * The live-API mapper must keep those price conventions exactly: omit
 * finalBid unless sold, use currentBid 0 (not null/absent) for a no-bid
 * lot, and use buyNow null (not 0) when there is no buy-now offer.
 *
 * @typedef {Object} Vehicle
 * @property {string} id
 * @property {string} vin          17 chars, no I/O/Q
 * @property {number} year
 * @property {string} make
 * @property {string} model
 * @property {string} trim
 * @property {string} bodyStyle
 * @property {string} fuel
 * @property {string} engine
 * @property {string} transmission
 * @property {string} drive
 * @property {string} color
 * @property {boolean} keys
 * @property {number} odometer     must mirror records[0].odometer
 * @property {string} odometerBrand  "Actual" | "Not Actual" | "Exempt"
 * @property {string} titleStatus
 * @property {number} estRetail
 * @property {number} photoCount
 * @property {SaleRecord[]} records  newest first; records[0] is the current listing
 */

import { VEHICLES, STATS, POPULAR_MAKES } from "./mockData.js";

const LATENCY_MS = 300;

function delay(payload) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), LATENCY_MS + Math.random() * 200);
  });
}

export function vehicleTitle(vehicle) {
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.trim]
    .filter(Boolean)
    .join(" ");
}

/** The record that drives a vehicle's card / detail "current" state. */
export function currentRecord(vehicle) {
  return vehicle.records[0];
}

function matchesQuery(vehicle, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  // Lot/VIN matching needs at least 6 characters, otherwise short digit
  // fragments (a year, "150") collide with digits inside 8-digit lot
  // numbers and 17-char VINs. Note filters and facets still apply to the
  // CURRENT record only, so a query hit on a historical lot can be
  // filtered out by source/status; record-level filtering is a decision
  // for the live API.
  if (/^\d{6,}$/.test(needle)) {
    return (
      vehicle.records.some((r) => r.lot.startsWith(needle)) ||
      vehicle.vin.toLowerCase().includes(needle)
    );
  }
  if (
    needle.length >= 6 &&
    /^[a-hj-npr-z0-9]+$/.test(needle) &&
    /\d/.test(needle) &&
    vehicle.vin.toLowerCase().includes(needle)
  ) {
    return true;
  }
  const haystack = vehicleTitle(vehicle).toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

const SORTERS = {
  "sale-date-desc": (a, b) =>
    currentRecord(b).saleDate.localeCompare(currentRecord(a).saleDate),
  "sale-date-asc": (a, b) =>
    currentRecord(a).saleDate.localeCompare(currentRecord(b).saleDate),
  "price-desc": (a, b) => (priceOf(b) ?? -Infinity) - (priceOf(a) ?? -Infinity),
  "price-asc": (a, b) => (priceOf(a) ?? Infinity) - (priceOf(b) ?? Infinity),
  "year-desc": (a, b) => b.year - a.year,
  "odometer-asc": (a, b) => a.odometer - b.odometer,
};

/** The price a listing displays; null when it has none (no bids, no buy-now). */
function priceOf(vehicle) {
  const rec = currentRecord(vehicle);
  return rec.finalBid ?? (rec.currentBid > 0 ? rec.currentBid : null) ?? rec.buyNow ?? null;
}

function countBy(vehicles, getKey) {
  const counts = new Map();
  for (const v of vehicles) {
    const key = getKey(v);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value));
}

/**
 * Search the auction archive.
 * @param {Object} params
 * @param {string} [params.q]           free text, VIN, or lot number
 * @param {string} [params.source]      "copart" | "iaai"
 * @param {string} [params.status]      "sold" | "live" | "upcoming"
 * @param {string} [params.make]
 * @param {number} [params.yearFrom]
 * @param {number} [params.yearTo]
 * @param {string} [params.damage]      matches primary damage
 * @param {string} [params.fuel]
 * @param {string} [params.sort]        key of SORTERS
 * @param {number} [params.page]        1-based
 * @param {number} [params.perPage]
 */
export function searchVehicles(params = {}) {
  const {
    q = "",
    source,
    status,
    make,
    yearFrom,
    yearTo,
    damage,
    fuel,
    sort = "sale-date-desc",
    page = 1,
    perPage = 12,
  } = params;

  const filters = {
    q: (v) => matchesQuery(v, q),
    source: (v) => !source || currentRecord(v).source === source,
    status: (v) => !status || currentRecord(v).status === status,
    make: (v) => !make || v.make === make,
    year: (v) =>
      (!yearFrom || v.year >= yearFrom) && (!yearTo || v.year <= yearTo),
    damage: (v) => !damage || currentRecord(v).damagePrimary === damage,
    fuel: (v) => !fuel || v.fuel === fuel,
  };

  const applyAllExcept = (skip) =>
    VEHICLES.filter((v) =>
      Object.entries(filters).every(([name, fn]) => name === skip || fn(v)),
    );

  const filtered = applyAllExcept(null);
  const sorted = [...filtered].sort(SORTERS[sort] ?? SORTERS["sale-date-desc"]);
  const pageCount = Math.max(1, Math.ceil(sorted.length / perPage));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * perPage;

  // Facet counts leave out their own dimension so unchecked options keep
  // honest numbers.
  const facets = {
    sources: countBy(applyAllExcept("source"), (v) => currentRecord(v).source),
    statuses: countBy(applyAllExcept("status"), (v) => currentRecord(v).status),
    makes: countBy(applyAllExcept("make"), (v) => v.make),
    damages: countBy(applyAllExcept("damage"), (v) =>
      currentRecord(v).damagePrimary,
    ),
    fuels: countBy(applyAllExcept("fuel"), (v) => v.fuel),
  };

  return delay({
    items: sorted.slice(start, start + perPage),
    total: sorted.length,
    page: safePage,
    perPage,
    facets,
  });
}

export function getVehicle(id) {
  return delay(VEHICLES.find((v) => v.id === id) ?? null);
}

/** Full auction history for a VIN (the "check this car's past" feature). */
export function getVinHistory(vin) {
  const needle = vin.trim().toUpperCase();
  return delay(VEHICLES.find((v) => v.vin.toUpperCase() === needle) ?? null);
}

export function getRecentlySold(limit = 8) {
  const sold = VEHICLES.filter((v) => currentRecord(v).status === "sold");
  const sorted = sold.sort(SORTERS["sale-date-desc"]);
  return delay(sorted.slice(0, limit));
}

export function getSimilarVehicles(vehicle, limit = 4) {
  const scored = VEHICLES.filter((v) => v.id !== vehicle.id)
    .map((v) => ({
      v,
      score:
        (v.make === vehicle.make ? 4 : 0) +
        (v.bodyStyle === vehicle.bodyStyle ? 2 : 0) +
        (Math.abs(v.year - vehicle.year) <= 2 ? 1 : 0),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return delay(scored.slice(0, limit).map((s) => s.v));
}

export function getStats() {
  return delay(STATS);
}

export function getPopularMakes() {
  return delay(POPULAR_MAKES);
}
