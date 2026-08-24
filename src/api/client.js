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
 * @property {string} lot
 * @property {string} location
 * @property {string} saleDate    ISO date (yyyy-mm-dd)
 * @property {number} odometer
 * @property {string} damagePrimary
 * @property {?string} damageSecondary
 * @property {number} [finalBid]   present when status === "sold"
 * @property {number} [currentBid] present when status !== "sold"
 * @property {?number} [buyNow]
 *
 * @typedef {Object} Vehicle
 * @property {string} id
 * @property {string} vin
 * @property {number} year
 * @property {string} make
 * @property {string} model
 * @property {string} trim
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
  if (vehicle.vin.toLowerCase().includes(needle)) return true;
  if (vehicle.records.some((r) => r.lot.includes(needle))) return true;
  const haystack = vehicleTitle(vehicle).toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

const SORTERS = {
  "sale-date-desc": (a, b) =>
    currentRecord(b).saleDate.localeCompare(currentRecord(a).saleDate),
  "sale-date-asc": (a, b) =>
    currentRecord(a).saleDate.localeCompare(currentRecord(b).saleDate),
  "price-desc": (a, b) => priceOf(b) - priceOf(a),
  "price-asc": (a, b) => priceOf(a) - priceOf(b),
  "year-desc": (a, b) => b.year - a.year,
  "odometer-asc": (a, b) => a.odometer - b.odometer,
};

function priceOf(vehicle) {
  const rec = currentRecord(vehicle);
  return rec.finalBid ?? rec.currentBid ?? 0;
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
  const start = (page - 1) * perPage;

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
    page,
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
    .sort((a, b) => b.score - a.score);
  return delay(scored.slice(0, limit).map((s) => s.v));
}

export function getStats() {
  return delay(STATS);
}

export function getPopularMakes() {
  return delay(POPULAR_MAKES);
}
