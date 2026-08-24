import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FunnelSimple } from "@phosphor-icons/react";
import SearchBar from "../components/SearchBar.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import Pagination from "../components/Pagination.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { CardGridSkeleton } from "../components/Skeletons.jsx";
import { searchVehicles } from "../api/client.js";
import { useAsync } from "../lib/useAsync.js";

const SORT_OPTIONS = [
  { value: "sale-date-desc", label: "Sale date: newest" },
  { value: "sale-date-asc", label: "Sale date: oldest" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "year-desc", label: "Year: newest" },
  { value: "odometer-asc", label: "Odometer: lowest" },
];

const FILTER_KEYS = ["status", "source", "make", "damage", "fuel", "yearFrom", "yearTo"];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const params = useMemo(() => {
    const get = (key) => searchParams.get(key) || null;
    return {
      q: searchParams.get("q") ?? "",
      status: get("status"),
      source: get("source"),
      make: get("make"),
      damage: get("damage"),
      fuel: get("fuel"),
      yearFrom: get("yearFrom") ? Number(get("yearFrom")) : null,
      yearTo: get("yearTo") ? Number(get("yearTo")) : null,
      sort: get("sort") ?? "sale-date-desc",
      page: Math.max(1, Number(get("page")) || 1),
    };
  }, [searchParams]);

  const { data, loading, error } = useAsync(
    () => searchVehicles({ ...params, perPage: 12 }),
    [searchParams],
  );

  function updateParams(patch) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(patch)) {
      if (value == null || value === "") next.delete(key);
      else next.set(key, String(value));
    }
    if (!("page" in patch)) next.delete("page");
    setSearchParams(next);
  }

  function clearFilters() {
    const next = new URLSearchParams();
    if (params.q) next.set("q", params.q);
    setSearchParams(next);
  }

  const hasActiveFilters = FILTER_KEYS.some((key) => params[key] != null);
  const emptyFacets = { statuses: [], sources: [], makes: [], damages: [], fuels: [] };
  const facets = data?.facets ?? emptyFacets;

  return (
    <>
      <div className="border-b border-line bg-white">
        <div className="shell flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Auction vehicles
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              {data
                ? `${data.total} ${data.total === 1 ? "vehicle" : "vehicles"}${params.q ? ` for "${params.q}"` : ""}`
                : "Searching the archive"}
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <SearchBar key={params.q} initialValue={params.q} />
          </div>
        </div>
      </div>

      <div className="shell grid gap-8 py-8 lg:grid-cols-[15rem_1fr]">
        <aside>
          <button
            type="button"
            className="btn-quiet mb-4 w-full lg:hidden"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <FunnelSimple size={16} weight="bold" />
            {filtersOpen ? "Hide filters" : "Show filters"}
          </button>
          <div className={filtersOpen ? "block" : "hidden lg:block"}>
            <FilterSidebar
              filters={params}
              facets={facets}
              hasActive={hasActiveFilters}
              onChange={(name, value) => updateParams({ [name]: value })}
              onClear={clearFilters}
            />
          </div>
        </aside>

        <section aria-label="Search results">
          <div className="mb-4 flex items-center justify-end gap-2">
            <label htmlFor="sort" className="text-sm text-ink-soft">
              Sort by
            </label>
            <select
              id="sort"
              value={params.sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="field w-auto py-1.5"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {loading && <CardGridSkeleton count={9} columns="sm:grid-cols-2 xl:grid-cols-3" />}

          {error && (
            <EmptyState
              title="Search failed"
              body="Something went wrong while searching. Refresh the page to try again."
            />
          )}

          {data && data.items.length === 0 && (
            <EmptyState
              title="No vehicles match"
              body="The preview archive holds a small sample set, so narrow queries can come up empty. Try fewer filters or a broader search."
              action={
                hasActiveFilters || params.q ? (
                  <Link to="/search" className="btn-quiet">
                    Clear search and filters
                  </Link>
                ) : null
              }
            />
          )}

          {data && data.items.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {data.items.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination
                  page={data.page}
                  total={data.total}
                  perPage={data.perPage}
                  onPageChange={(page) => updateParams({ page })}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}
