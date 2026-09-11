"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { propertyTypes } from "@/constants/PropertityType";

const LISTING_TABS = [
  { label: "All",      value: "" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

export default function MarketplaceSearchBar() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Initialise from current URL so the bar reflects active filters
  const [search,  setSearch]  = useState(searchParams.get("search")  ?? "");
  const [listing, setListing] = useState(searchParams.get("listing") ?? "");
  const [type,    setType]    = useState(searchParams.get("type")    ?? "");

  function buildUrl(overrides: Record<string, string>) {
    const current = new URLSearchParams(searchParams.toString());
    const merged  = { ...Object.fromEntries(current), ...overrides };
    // Remove empty keys
    Object.keys(merged).forEach((k) => { if (!merged[k]) delete merged[k]; });
    return `/marketplace?${new URLSearchParams(merged).toString()}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      router.push(buildUrl({ search, listing, type, sort: searchParams.get("sort") ?? "" }));
    });
  }

  function handleListingTab(value: string) {
    setListing(value);
    startTransition(() => {
      router.push(buildUrl({ search, listing: value, type, sort: searchParams.get("sort") ?? "" }));
    });
  }

  function handleTypeToggle(slug: string) {
    const next = type === slug ? "" : slug;
    setType(next);
    startTransition(() => {
      router.push(buildUrl({ search, listing, type: next, sort: searchParams.get("sort") ?? "" }));
    });
  }

  function clearSearch() {
    setSearch("");
    startTransition(() => {
      router.push(buildUrl({ search: "", listing, type, sort: searchParams.get("sort") ?? "" }));
    });
  }

  return (
    <div className="space-y-4">
      {/* ── Main search bar ── */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-card px-4 py-3 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-primary/40">
          <FiSearch size={18} className="shrink-0 text-text/40" aria-hidden="true" />
          <input
            id="marketplace-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, neighborhood, or title…"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-text outline-none placeholder:text-text/40"
            autoComplete="off"
          />
          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text/40 transition hover:bg-background hover:text-text"
            >
              <FiX size={14} />
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 rounded-xl bg-primary px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {isPending ? "Searching…" : "Search"}
          </button>
        </div>
      </form>

      {/* ── Listing type tabs ── */}
      <div className="flex items-center gap-2">
        {LISTING_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleListingTab(tab.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              listing === tab.value
                ? "bg-primary text-white shadow shadow-primary/30"
                : "border border-black/10 bg-card text-text/60 hover:border-primary/40 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Property type pills ── */}
      <div className="flex flex-wrap gap-2">
        {propertyTypes.map((item) => {
          const active = type === item.slug;
          const Icon   = item.icon;
          return (
            <button
              key={item.slug}
              onClick={() => handleTypeToggle(item.slug)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "border border-black/10 bg-card text-text/50 hover:border-primary/30 hover:text-primary"
              }`}
            >
              <Icon size={12} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
