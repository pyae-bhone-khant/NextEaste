"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FiX } from "react-icons/fi";

const LABEL_MAP: Record<string, (v: string) => string> = {
  search:   (v) => `"${v}"`,
  type:     (v) => v.charAt(0).toUpperCase() + v.slice(1),
  listing:  (v) => (v === "sale" ? "For Sale" : "For Rent"),
  minPrice: (v) => `From $${Number(v).toLocaleString()}`,
  maxPrice: (v) => `Up to $${Number(v).toLocaleString()}`,
  minBeds:  (v) => `${v}+ beds`,
};

const CHIP_KEYS = ["search", "type", "listing", "minPrice", "maxPrice", "minBeds"];

export default function ActiveFilters() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const chips = CHIP_KEYS.flatMap((key) => {
    const value = searchParams.get(key);
    if (!value) return [];
    return [{ key, value, label: LABEL_MAP[key]?.(value) ?? value }];
  });

  if (chips.length === 0) return null;

  function removeChip(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    startTransition(() => router.push(`/marketplace?${params.toString()}`));
  }

  function clearAll() {
    startTransition(() => router.push("/marketplace"));
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-text/40">
        Active:
      </span>
      {chips.map(({ key, label }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary"
        >
          {label}
          <button
            onClick={() => removeChip(key)}
            aria-label={`Remove ${key} filter`}
            className="rounded-full p-0.5 transition hover:bg-primary/20"
          >
            <FiX size={10} />
          </button>
        </span>
      ))}
      <button
        onClick={clearAll}
        className="text-xs font-semibold text-text/40 underline-offset-2 hover:text-primary hover:underline transition"
      >
        Clear all
      </button>
    </div>
  );
}
