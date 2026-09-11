"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const SORT_OPTIONS = [
  { label: "Newest first",   value: "newest"     },
  { label: "Oldest first",   value: "oldest"     },
  { label: "Price: low–high", value: "price_asc" },
  { label: "Price: high–low", value: "price_desc" },
];

export default function SortSelect() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const current = searchParams.get("sort") ?? "newest";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", e.target.value);
    }
    startTransition(() => router.push(`/marketplace?${params.toString()}`));
  }

  return (
    <select
      id="sort-select"
      value={current}
      onChange={handleChange}
      className="rounded-xl border border-black/10 bg-card px-3 py-2 text-sm font-medium text-text/70 outline-none transition focus:border-primary/40 hover:border-primary/30 cursor-pointer"
      aria-label="Sort properties"
    >
      {SORT_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
