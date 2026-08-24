import { Link } from "react-router-dom";
import { Wordmark } from "./Header.jsx";

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { to: "/search?status=sold", label: "Auction archive" },
      { to: "/search?status=live", label: "Live auctions" },
      { to: "/search", label: "Search all vehicles" },
    ],
  },
  {
    heading: "Company",
    links: [
      { to: "/#how-it-works", label: "How it works" },
      { to: "/contact", label: "Talk to a broker" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Auction search and import brokerage. Find the car, check its sale
            history, and we handle the bidding, purchase, and shipping to
            Klaipėda.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-sm font-semibold text-white">{col.heading}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BidPort. All rights reserved.</p>
          <p>
            Vehicle data shown is sample content. Live Copart and IAAI feeds
            arrive with the auction API integration.
          </p>
        </div>
      </div>
    </footer>
  );
}
