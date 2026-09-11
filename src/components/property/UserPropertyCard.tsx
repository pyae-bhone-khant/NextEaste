"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiAlertTriangle, FiEye } from "react-icons/fi";
import { FaBed, FaBath } from "react-icons/fa";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  listingType: string;
  propertyType: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number | null;
  image: string;
}

export default function UserPropertyCard({ property }: { property: Property }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);
      await axios.delete(`/api/properties/${property.id}`);
      toast.success("Property deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete property");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  }

  const statusColor =
    property.status === "available"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
      : property.status === "sold"
      ? "bg-red-50 text-red-600 border-red-200"
      : "bg-amber-50 text-amber-600 border-amber-200";

  return (
    <>
      <div className="group overflow-hidden rounded-3xl border border-black/8 bg-card shadow-sm transition hover:shadow-md">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Listing badge */}
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
            {property.listingType === "rent" ? "For Rent" : "For Sale"}
          </span>
          {/* Status badge */}
          <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-bold capitalize ${statusColor}`}>
            {property.status}
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="truncate text-base font-bold text-text">{property.title}</p>
          <p className="mt-1 truncate text-sm text-text/50">{property.location}</p>

          <div className="mt-3 flex items-center gap-4 text-xs text-text/50">
            <span className="flex items-center gap-1"><FaBed size={12} /> {property.bedrooms} beds</span>
            <span className="flex items-center gap-1"><FaBath size={12} /> {property.bathrooms} baths</span>
            {property.area && <span>{property.area.toLocaleString()} sq ft</span>}
          </div>

          <p className="mt-4 text-xl font-bold text-primary">
            ${property.price.toLocaleString()}
            {property.listingType === "rent" && <span className="ml-1 text-sm font-normal text-text/40">/mo</span>}
          </p>

          {/* Actions */}
          <div className="mt-5 flex gap-2 border-t border-black/5 pt-4">
            <Link
              href={`/property/${property.id}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-black/10 py-2 text-xs font-semibold text-text/60 transition hover:border-primary/30 hover:text-primary"
            >
              <FiEye size={13} /> View
            </Link>
            <Link
              href={`/properties/${property.id}/edit`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-primary/25 bg-primary/8 py-2 text-xs font-semibold text-primary transition hover:bg-primary/15"
            >
              <FiEdit2 size={13} /> Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
            >
              <FiTrash2 size={13} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* ── Confirm delete dialog ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-black/10 bg-card p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiAlertTriangle size={22} />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text">Delete this listing?</h2>
            <p className="mt-2 text-sm leading-6 text-text/55">
              <strong>{property.title}</strong> will be permanently removed. This cannot be undone.
            </p>
            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="flex-1 rounded-2xl border border-black/10 py-2.5 text-sm font-semibold text-text transition hover:bg-background disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-2xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
