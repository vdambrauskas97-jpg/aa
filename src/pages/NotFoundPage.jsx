import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="shell flex flex-col items-center py-24 text-center">
      <p className="font-mono text-sm font-semibold text-accent-600">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-ink-soft">
        The page you are after does not exist. Head back home or search the
        archive instead.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn-accent">
          Go home
        </Link>
        <Link to="/search" className="btn-quiet">
          Search vehicles
        </Link>
      </div>
    </div>
  );
}
