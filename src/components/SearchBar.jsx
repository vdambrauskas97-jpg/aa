import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";

/**
 * The main search entry. `large` is the hero variant; the compact variant
 * lives in the search page toolbar.
 */
export default function SearchBar({ large = false, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  function submit(event) {
    event.preventDefault();
    const q = value.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={submit} role="search" className="flex w-full gap-2">
      <label htmlFor={large ? "hero-search" : "toolbar-search"} className="sr-only">
        Search by VIN, lot number, or make and model
      </label>
      <input
        id={large ? "hero-search" : "toolbar-search"}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="VIN, lot number, or make and model"
        autoComplete="off"
        className={
          large
            ? "field h-14 flex-1 px-4 text-base shadow-lift"
            : "field flex-1"
        }
      />
      <button
        type="submit"
        className={large ? "btn-accent h-14 px-6 text-base" : "btn-accent"}
      >
        <MagnifyingGlass size={large ? 20 : 16} weight="bold" />
        Search
      </button>
    </form>
  );
}
