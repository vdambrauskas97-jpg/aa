import { Link } from "react-router-dom";
import { MagnifyingGlass, FileMagnifyingGlass, Boat } from "@phosphor-icons/react";
import SearchBar from "../components/SearchBar.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { CardGridSkeleton } from "../components/Skeletons.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getRecentlySold, getStats, getPopularMakes } from "../api/client.js";
import { useAsync } from "../lib/useAsync.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import { formatCompact, formatNumber } from "../lib/format.js";

const EXAMPLE_VIN = "5YJ3E1EA8NF482915";

function Hero() {
  return (
    <section className="bg-navy-900 pb-20 pt-14 sm:pt-20">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
            Search every US auction in one place
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Copart and IAAI sale records, live lots, and full VIN history, with
            brokered import to Klaipėda.
          </p>
          <div className="mt-8">
            <SearchBar large />
          </div>
          <p className="mt-3 text-sm text-white/50">
            Try a VIN:{" "}
            <Link
              to={`/search?q=${EXAMPLE_VIN}`}
              className="font-mono text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white"
            >
              {EXAMPLE_VIN}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function StatStrip() {
  const { data: stats } = useAsync(() => getStats(), []);
  const items = [
    { label: "Sale records", value: stats && `${formatCompact(stats.archiveRecords)}+` },
    { label: "Live lots", value: stats && formatNumber(stats.liveLots) },
    { label: "Added today", value: stats && formatNumber(stats.addedToday) },
    { label: "Auction locations", value: stats && formatNumber(stats.locations) },
  ];

  return (
    <section aria-label="Archive size" className="shell -mt-10">
      <dl className="grid grid-cols-2 divide-line rounded-lg border border-line bg-white shadow-lift sm:grid-cols-4 sm:divide-x">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col-reverse px-5 py-5 text-center">
            <dt className="mt-1 text-xs text-ink-soft">{item.label}</dt>
            <dd className="font-mono text-xl font-semibold text-ink sm:text-2xl">
              {item.value ?? "…"}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function RecentlySold() {
  const { data, loading, error } = useAsync(() => getRecentlySold(8), []);

  return (
    <section className="shell py-14">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Recently sold
        </h2>
        <Link
          to="/search?status=sold"
          className="text-sm font-semibold text-accent-600 transition hover:text-accent-700"
        >
          View the archive
        </Link>
      </div>
      <div className="mt-6">
        {loading && <CardGridSkeleton count={8} />}
        {error && (
          <EmptyState
            title="Could not load vehicles"
            body="Something went wrong while fetching recent sales. Refresh the page to try again."
          />
        )}
        {data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PopularMakes() {
  const { data } = useAsync(() => getPopularMakes(), []);
  if (!data) return null;

  return (
    <section className="shell pb-14">
      <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
        Browse by make
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {data.map((make) => (
          <Link
            key={make.name}
            to={`/search?make=${encodeURIComponent(make.name)}`}
            className="rounded-lg border border-line bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-ink-faint hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
          >
            <span className="block truncate text-sm font-semibold text-ink">
              {make.name}
            </span>
            <span className="block text-xs text-ink-faint">
              {formatCompact(make.count)} records
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: MagnifyingGlass,
    title: "Search and shortlist",
    body: "Filter live lots and archived sales to find the right car at the right money.",
  },
  {
    icon: FileMagnifyingGlass,
    title: "Check the history",
    body: "Every VIN shows its past sales, damage notes, odometer trail, and final bids.",
  },
  {
    icon: Boat,
    title: "We bid, buy, and ship",
    body: "Our brokers place the bid, handle payment and customs, and deliver to Klaipėda.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line bg-white">
      <div className="shell grid gap-10 py-16 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold tracking-tight text-ink [text-wrap:balance] sm:text-3xl">
            From auction lot to your driveway
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            You pick the car, we do the rest. BidPort combines the full auction
            archive with a licensed brokerage, so buying from a US auction
            works even if you have never bid before.
          </p>
          <Link to="/contact" className="btn-accent mt-6">
            Talk to a broker
          </Link>
        </div>
        <ol className="divide-y divide-line">
          {STEPS.map((step) => (
            <li key={step.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                <step.icon size={20} />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function HomePage() {
  useDocumentTitle(null);
  return (
    <>
      <Hero />
      <StatStrip />
      <RecentlySold />
      <PopularMakes />
      <HowItWorks />
    </>
  );
}
