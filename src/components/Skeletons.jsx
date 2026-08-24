export function VehicleCardSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-lg border border-line bg-white shadow-card"
      aria-hidden="true"
    >
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="space-y-2.5 p-4">
        <div className="flex gap-1.5">
          <div className="h-4 w-14 rounded bg-gray-200" />
          <div className="h-4 w-12 rounded bg-gray-200" />
        </div>
        <div className="h-4 w-4/5 rounded bg-gray-200" />
        <div className="h-3.5 w-3/5 rounded bg-gray-100" />
        <div className="h-3.5 w-2/5 rounded bg-gray-100" />
        <div className="flex items-center justify-between border-t border-line pt-3">
          <div className="h-3 w-16 rounded bg-gray-100" />
          <div className="h-5 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 8, columns = "sm:grid-cols-2 lg:grid-cols-4" }) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columns}`} role="status" aria-label="Loading vehicles">
      {Array.from({ length: count }, (_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
}
