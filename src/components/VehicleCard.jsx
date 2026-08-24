import { Link } from "react-router-dom";
import { currentRecord, vehicleTitle } from "../api/client.js";
import { formatDate, formatMiles, formatMoney } from "../lib/format.js";
import { SourceBadge, StatusBadge } from "./Badges.jsx";
import VehiclePhoto from "./VehiclePhoto.jsx";

/** Which price a card leads with, given the listing's state. */
export function priceLine(record) {
  if (record.status === "sold") {
    return { label: "Final bid", value: record.finalBid, tone: "text-sold" };
  }
  if (record.currentBid > 0) {
    return { label: "Current bid", value: record.currentBid, tone: "text-ink" };
  }
  if (record.buyNow) {
    return { label: "Buy now", value: record.buyNow, tone: "text-accent-600" };
  }
  return { label: "No bids yet", value: null, tone: "text-ink-faint" };
}

export default function VehicleCard({ vehicle }) {
  const record = currentRecord(vehicle);
  const price = priceLine(record);
  const title = vehicleTitle(vehicle);
  const dateLabel =
    record.status === "sold"
      ? formatDate(record.saleDate)
      : `Auction ${formatDate(record.saleDate)}`;

  return (
    <Link
      to={`/vehicle/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
    >
      <VehiclePhoto seed={vehicle.id} label={title} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1.5">
          <SourceBadge source={record.source} />
          <StatusBadge status={record.status} />
        </div>
        <h3 className="truncate font-semibold leading-snug text-ink group-hover:text-accent-600">
          {title}
        </h3>
        <p className="truncate text-sm text-ink-soft">
          {record.damagePrimary} · {formatMiles(record.odometer)}
        </p>
        <p className="truncate text-sm text-ink-faint">{record.location}</p>
        <div className="mt-auto flex items-end justify-between border-t border-line pt-3">
          <span className="text-xs text-ink-faint">{dateLabel}</span>
          <span className="text-right">
            <span className="block text-[11px] leading-tight text-ink-faint">
              {price.label}
            </span>
            {price.value != null && (
              <span className={`font-mono text-base font-semibold ${price.tone}`}>
                {formatMoney(price.value)}
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
