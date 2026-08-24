const YEARS = Array.from({ length: 20 }, (_, i) => 2026 - i);

const STATUS_LABELS = { sold: "Sold", live: "Live", upcoming: "Upcoming" };
const SOURCE_LABELS = { copart: "Copart", iaai: "IAAI" };

function FacetGroup({ title, options, selected, onSelect, labels = {} }) {
  if (!options?.length && !selected) return null;
  const known = new Set(options.map((o) => o.value));
  const rows = selected && !known.has(selected)
    ? [{ value: selected, count: 0 }, ...options]
    : options;

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{title}</legend>
      <div className="mt-2 space-y-0.5">
        {rows.map((option) => {
          const active = option.value === selected;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(active ? null : option.value)}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent-600 ${
                active
                  ? "bg-accent-50 font-semibold text-accent-700"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              <span className="truncate">{labels[option.value] ?? option.value}</span>
              <span className={active ? "text-accent-600" : "text-ink-faint"}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function YearSelect({ id, label, value, onChange }) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="mb-1 block text-xs text-ink-soft">
        {label}
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="field py-1.5"
      >
        <option value="">Any</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * @param filters current values {status, source, make, damage, fuel, yearFrom, yearTo}
 * @param facets  option counts from searchVehicles
 * @param onChange (name, valueOrNull) => void
 * @param onClear  () => void
 */
export default function FilterSidebar({ filters, facets, onChange, onClear, hasActive }) {
  return (
    <div className="space-y-6">
      {hasActive && (
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-semibold text-accent-600 transition hover:text-accent-700"
        >
          Clear all filters
        </button>
      )}
      <FacetGroup
        title="Sale status"
        options={facets.statuses}
        selected={filters.status}
        labels={STATUS_LABELS}
        onSelect={(v) => onChange("status", v)}
      />
      <FacetGroup
        title="Auction"
        options={facets.sources}
        selected={filters.source}
        labels={SOURCE_LABELS}
        onSelect={(v) => onChange("source", v)}
      />
      <FacetGroup
        title="Make"
        options={facets.makes}
        selected={filters.make}
        onSelect={(v) => onChange("make", v)}
      />
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Year</legend>
        <div className="mt-2 flex gap-2">
          <YearSelect
            id="year-from"
            label="From"
            value={filters.yearFrom}
            onChange={(v) => onChange("yearFrom", v)}
          />
          <YearSelect
            id="year-to"
            label="To"
            value={filters.yearTo}
            onChange={(v) => onChange("yearTo", v)}
          />
        </div>
      </fieldset>
      <FacetGroup
        title="Primary damage"
        options={facets.damages}
        selected={filters.damage}
        onSelect={(v) => onChange("damage", v)}
      />
      <FacetGroup
        title="Fuel"
        options={facets.fuels}
        selected={filters.fuel}
        onSelect={(v) => onChange("fuel", v)}
      />
    </div>
  );
}
