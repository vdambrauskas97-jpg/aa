const SOURCE_STYLES = {
  copart: "bg-copart-bg text-copart-text",
  iaai: "bg-iaai-bg text-iaai-text",
};

const SOURCE_LABELS = { copart: "Copart", iaai: "IAAI" };

export function SourceBadge({ source }) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${SOURCE_STYLES[source]}`}
    >
      {SOURCE_LABELS[source]}
    </span>
  );
}

const STATUS_STYLES = {
  sold: "bg-emerald-50 text-sold",
  live: "bg-blue-50 text-live",
  upcoming: "bg-gray-100 text-ink-soft",
};

const STATUS_LABELS = { sold: "Sold", live: "Live", upcoming: "Upcoming" };

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
