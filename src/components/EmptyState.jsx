import { MagnifyingGlass } from "@phosphor-icons/react";

export default function EmptyState({ title, body, action }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-line bg-white px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink-faint">
        <MagnifyingGlass size={24} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-ink-soft">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
