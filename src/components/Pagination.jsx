import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function Pagination({ page, total, perPage, onPageChange }) {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        type="button"
        className="btn-quiet px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <CaretLeft size={14} weight="bold" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange(p)}
          className={
            p === page
              ? "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-600 text-sm font-semibold text-white"
              : "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-sm font-semibold text-ink transition hover:border-ink-faint"
          }
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="btn-quiet px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <CaretRight size={14} weight="bold" />
      </button>
    </nav>
  );
}
