import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";

const NAV = [
  { to: "/search?status=sold", label: "Auction archive" },
  { to: "/search?status=live", label: "Live auctions" },
  { to: "/#how-it-works", label: "How it works" },
];

export function Wordmark({ className = "" }) {
  return (
    <span
      className={`select-none text-lg font-bold tracking-tight ${className}`}
    >
      <span className="text-white">BID</span>
      <span className="text-accent-400">PORT</span>
    </span>
  );
}

function NavItems({ onNavigate }) {
  return NAV.map((item) =>
    item.to.startsWith("/#") ? (
      <a
        key={item.to}
        href={item.to}
        onClick={onNavigate}
        className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {item.label}
      </a>
    ) : (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onNavigate}
        className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {item.label}
      </NavLink>
    ),
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-navy-900">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={close}
          className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="BidPort home"
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <NavItems />
          <Link to="/contact" className="btn-accent ml-3 px-4 py-2">
            Talk to a broker
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-navy-900 px-4 pb-4 pt-2 md:hidden"
          aria-label="Main"
        >
          <div className="flex flex-col gap-1">
            <NavItems onNavigate={close} />
            <Link to="/contact" onClick={close} className="btn-accent mt-2">
              Talk to a broker
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
