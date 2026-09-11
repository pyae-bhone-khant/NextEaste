"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import { FiMapPin, FiSearch } from "react-icons/fi";

const LISTING_TABS = [
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

export default function SearchBox() {
  const router = useRouter();
  const [query,   setQuery]   = useState("");
  const [listing, setListing] = useState("sale");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("search",  query.trim());
    if (listing)      params.set("listing", listing);
    router.push(`/marketplace?${params.toString()}`);
  }

  return (
    <div className="mt-10 w-full max-w-3xl space-y-3">
      {/* Listing type toggle */}
      <div className="inline-flex rounded-full border border-white/15 bg-slate-950/40 p-1 backdrop-blur-xl">
        {LISTING_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setListing(tab.value)}
            className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
              listing === tab.value
                ? "bg-primary text-white shadow shadow-primary/40"
                : "text-white/60 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search input row */}
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[28px] border border-white/15 bg-slate-950/35 p-3 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 transition-colors focus-within:border-primary/70 focus-within:bg-white/15">
            <FiMapPin className="shrink-0 text-primary" size={20} aria-hidden="true" />
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, neighborhood, or address"
              className="h-7 min-w-0 w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/45"
              autoComplete="off"
            />
          </label>

          <Button
            type="submit"
            icon={<FiSearch size={18} aria-hidden="true" />}
            className="h-14 shrink-0 rounded-2xl px-5 shadow-lg shadow-primary/25"
          >
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
}