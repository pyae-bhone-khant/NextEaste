"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiAlertTriangle } from "react-icons/fi";

interface PropertyOwnerActionsProps {
  propertyId: string;
}

export default function PropertyOwnerActions({ propertyId }: PropertyOwnerActionsProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);
      await axios.delete(`/api/properties/${propertyId}`);
      toast.success("Property deleted successfully");
      router.push("/properties");
      router.refresh();
    } catch {
      toast.error("Failed to delete property");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <>
      <div className="mt-5 flex gap-2 lg:justify-end">
        <button
          onClick={() => router.push(`/properties/${propertyId}/edit`)}
          className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
        >
          <FiEdit2 size={14} />
          Edit
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <FiTrash2 size={14} />
          Delete
        </button>
      </div>

      {/* ── Confirm dialog ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-black/10 bg-card p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiAlertTriangle size={22} />
            </div>
            <h2 className="mt-4 text-lg font-bold text-text">Delete this property?</h2>
            <p className="mt-2 text-sm leading-6 text-text/55">
              This action cannot be undone. The listing will be permanently removed from the marketplace.
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
