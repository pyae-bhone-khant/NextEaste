"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { FiTrash2 } from "react-icons/fi";

const STATUS_OPTIONS = ["available", "sold", "pending"];

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  listingType: string;
  propertyType: string;
  status: string;
  createdAt: Date;
  owner: { name: string; email: string };
}

export default function AdminPropertyRow({ property }: { property: Property }) {
  const router = useRouter();
  const [status, setStatus] = useState(property.status);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleStatusChange(newStatus: string) {
    try {
      setUpdating(true);
      await axios.patch(`/api/admin/properties/${property.id}`, { status: newStatus });
      setStatus(newStatus);
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${property.title}"? This cannot be undone.`)) return;
    try {
      setDeleting(true);
      await axios.delete(`/api/admin/properties/${property.id}`);
      toast.success("Property deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  const statusColor =
    status === "available" ? "text-emerald-600 bg-emerald-50" :
    status === "sold"      ? "text-red-600 bg-red-50" :
                             "text-amber-600 bg-amber-50";

  return (
    <tr className="transition hover:bg-background/60">
      <td className="px-5 py-4">
        <p className="font-semibold text-text truncate max-w-[180px]">{property.title}</p>
        <p className="text-xs text-text/40 truncate">{property.location}</p>
      </td>
      <td className="px-5 py-4">
        <p className="text-text/70">{property.owner.name}</p>
        <p className="text-xs text-text/40">{property.owner.email}</p>
      </td>
      <td className="px-5 py-4 font-semibold text-text">${property.price.toLocaleString()}</td>
      <td className="px-5 py-4">
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${property.listingType === "rent" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
          {property.listingType}
        </span>
      </td>
      <td className="px-5 py-4">
        <select
          value={status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`rounded-xl border-0 px-3 py-1.5 text-xs font-bold capitalize outline-none cursor-pointer ${statusColor} disabled:opacity-60`}
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </td>
      <td className="px-5 py-4">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-100 disabled:opacity-50"
        >
          <FiTrash2 size={12} />
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </td>
    </tr>
  );
}
