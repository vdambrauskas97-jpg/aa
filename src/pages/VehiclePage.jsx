import { Link, useParams } from "react-router-dom";
import {
  getVehicle,
  getSimilarVehicles,
  currentRecord,
  vehicleTitle,
} from "../api/client.js";
import { useAsync } from "../lib/useAsync.js";
import { formatDate, formatMiles, formatMoney } from "../lib/format.js";
import { SourceBadge, StatusBadge } from "../components/Badges.jsx";
import VehiclePhoto from "../components/VehiclePhoto.jsx";
import VehicleCard, { priceLine } from "../components/VehicleCard.jsx";
import { CardGridSkeleton } from "../components/Skeletons.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Gallery({ vehicle }) {
  const title = vehicleTitle(vehicle);
  const thumbs = Math.min(vehicle.photoCount, 6);
  return (
    <div>
      <VehiclePhoto
        seed={vehicle.id}
        label={title}
        iconSize={88}
        className="aspect-[4/3] rounded-lg"
      />
      <div className="mt-2 grid grid-cols-6 gap-2">
        {Array.from({ length: thumbs }, (_, i) => (
          <VehiclePhoto
            key={i}
            seed={`${vehicle.id}-${i}`}
            label={`${title} view ${i + 1}`}
            iconSize={20}
            className="aspect-[4/3] rounded"
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-faint">
        {vehicle.photoCount} lot photos arrive with the live auction API.
      </p>
    </div>
  );
}

function SalePanel({ vehicle }) {
  const record = currentRecord(vehicle);
  const price = priceLine(record);

  const rows = [
    {
      label: record.status === "sold" ? "Sold on" : "Auction date",
      value: formatDate(record.saleDate),
    },
    { label: "Lot number", value: record.lot, mono: true },
    { label: "Location", value: record.location },
    { label: "Est. retail value", value: formatMoney(vehicle.estRetail), mono: true },
  ];

  return (
    <aside className="h-fit rounded-lg border border-line bg-white p-5 shadow-card lg:sticky lg:top-20">
      <div className="flex items-center gap-1.5">
        <SourceBadge source={record.source} />
        <StatusBadge status={record.status} />
      </div>
      <p className="mt-4 text-sm text-ink-soft">{price.label}</p>
      {price.value != null ? (
        <p className={`font-mono text-3xl font-bold ${price.tone}`}>
          {formatMoney(price.value)}
        </p>
      ) : (
        <p className="text-lg font-semibold text-ink-faint">
          Opens {formatDate(record.saleDate)}
        </p>
      )}
      {record.status !== "sold" && record.buyNow && price.label !== "Buy now" && (
        <p className="mt-1 text-sm text-ink-soft">
          Buy now:{" "}
          <span className="font-mono font-semibold text-accent-600">
            {formatMoney(record.buyNow)}
          </span>
        </p>
      )}
      <dl className="mt-5 space-y-2.5 border-t border-line pt-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-sm text-ink-soft">{row.label}</dt>
            <dd className={`text-sm font-medium text-ink ${row.mono ? "font-mono" : ""}`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <Link
        to={`/contact?ref=${encodeURIComponent(vehicle.vin)}`}
        className="btn-accent mt-6 w-full"
      >
        Talk to a broker
      </Link>
      <p className="mt-3 text-xs leading-relaxed text-ink-faint">
        We bid on your behalf, handle payment and paperwork, and ship to
        Klaipėda. No deposit needed for a quote.
      </p>
    </aside>
  );
}

function SpecGroup({ title, rows }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {rows.map(
          (row) =>
            row.value != null && (
              <div key={row.label} className="flex items-baseline justify-between gap-3">
                <dt className="shrink-0 text-sm text-ink-soft">{row.label}</dt>
                <dd
                  className={`truncate text-right text-sm font-medium text-ink ${row.mono ? "font-mono" : ""}`}
                >
                  {row.value}
                </dd>
              </div>
            ),
        )}
      </dl>
    </div>
  );
}

function Specs({ vehicle }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Vehicle details
      </h2>
      <div className="mt-4 space-y-8 rounded-lg border border-line bg-white p-5">
        <SpecGroup
          title="Vehicle"
          rows={[
            { label: "VIN", value: vehicle.vin, mono: true },
            { label: "Body style", value: vehicle.bodyStyle },
            { label: "Color", value: vehicle.color },
            { label: "Engine", value: vehicle.engine },
            { label: "Fuel", value: vehicle.fuel },
            { label: "Transmission", value: vehicle.transmission },
            { label: "Drive", value: vehicle.drive },
            { label: "Keys", value: vehicle.keys ? "Yes" : "No" },
          ]}
        />
        <SpecGroup
          title="Condition and title"
          rows={[
            {
              label: "Odometer",
              value: `${formatMiles(vehicle.odometer)} (${vehicle.odometerBrand})`,
            },
            { label: "Primary damage", value: currentRecord(vehicle).damagePrimary },
            { label: "Secondary damage", value: currentRecord(vehicle).damageSecondary },
            { label: "Title", value: vehicle.titleStatus },
          ]}
        />
      </div>
    </section>
  );
}

function HistoryTable({ vehicle }) {
  const records = vehicle.records;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Sale history for this VIN
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        {records.length === 1
          ? "One recorded auction appearance."
          : `${records.length} recorded auction appearances, newest first.`}
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-ink-soft">
              <th scope="col" className="px-4 py-3 font-medium">Date</th>
              <th scope="col" className="px-4 py-3 font-medium">Auction</th>
              <th scope="col" className="px-4 py-3 font-medium">Lot</th>
              <th scope="col" className="px-4 py-3 font-medium">Location</th>
              <th scope="col" className="px-4 py-3 font-medium">Odometer</th>
              <th scope="col" className="px-4 py-3 font-medium">Damage</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {records.map((record) => (
              <tr key={record.lot}>
                <td className="whitespace-nowrap px-4 py-3 text-ink">
                  {formatDate(record.saleDate)}
                </td>
                <td className="px-4 py-3"><SourceBadge source={record.source} /></td>
                <td className="px-4 py-3 font-mono text-ink">{record.lot}</td>
                <td className="px-4 py-3 text-ink-soft">{record.location}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-ink">
                  {formatMiles(record.odometer)}
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {record.damagePrimary}
                  {record.damageSecondary ? `, ${record.damageSecondary}` : ""}
                </td>
                <td className="px-4 py-3 text-right">
                  {record.status === "sold" ? (
                    <span className="font-mono font-semibold text-sold">
                      {formatMoney(record.finalBid)}
                    </span>
                  ) : (
                    <StatusBadge status={record.status} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Similar({ vehicle }) {
  const { data } = useAsync(() => getSimilarVehicles(vehicle, 4), [vehicle.id]);
  if (!data?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Similar vehicles
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </section>
  );
}

export default function VehiclePage() {
  const { id } = useParams();
  const { data: vehicle, loading } = useAsync(() => getVehicle(id), [id]);

  if (loading) {
    return (
      <div className="shell py-8">
        <CardGridSkeleton count={4} />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="shell py-16">
        <EmptyState
          title="Vehicle not found"
          body="This lot is not in the preview archive. It may appear once the live auction API is connected."
          action={
            <Link to="/search" className="btn-quiet">
              Back to search
            </Link>
          }
        />
      </div>
    );
  }

  const record = currentRecord(vehicle);

  return (
    <div className="shell py-8">
      <nav className="text-sm text-ink-soft" aria-label="Breadcrumb">
        <Link to="/search" className="transition hover:text-ink">
          Auction vehicles
        </Link>
        <span className="mx-2 text-ink-faint">/</span>
        <span className="text-ink">{vehicleTitle(vehicle)}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {vehicleTitle(vehicle)}
        </h1>
        <p className="font-mono text-sm text-ink-soft">{vehicle.vin}</p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_21rem]">
        <div>
          <Gallery vehicle={vehicle} />
          <Specs vehicle={vehicle} />
          <HistoryTable vehicle={vehicle} />
        </div>
        <SalePanel vehicle={vehicle} />
      </div>

      <Similar vehicle={vehicle} key={record.lot} />
    </div>
  );
}
