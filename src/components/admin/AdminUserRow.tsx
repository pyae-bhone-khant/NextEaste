"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Role } from "@prisma/client";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  _count: { properties: number };
}

export default function AdminUserRow({ user }: { user: User }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(user.role);
  const [updating, setUpdating] = useState(false);

  async function toggleRole() {
    const newRole = role === Role.ADMIN ? Role.USER : Role.ADMIN;
    try {
      setUpdating(true);
      await axios.patch(`/api/admin/users/${user.id}`, { role: newRole });
      setRole(newRole);
      toast.success(`Role updated to ${newRole}`);
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error ?? "Failed to update role");
      }
    } finally {
      setUpdating(false);
    }
  }

  const joined = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <tr className="transition hover:bg-background/60">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <p className="font-semibold text-text">{user.name}</p>
        </div>
      </td>
      <td className="px-5 py-4 text-text/60">{user.email}</td>
      <td className="px-5 py-4">
        <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {user._count.properties}
        </span>
      </td>
      <td className="px-5 py-4">
        <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${role === Role.ADMIN ? "bg-primary/10 text-primary" : "border border-black/10 text-text/50"}`}>
          {role}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-text/50">{joined}</td>
      <td className="px-5 py-4">
        <button
          onClick={toggleRole}
          disabled={updating}
          className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
            role === Role.ADMIN
              ? "border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
              : "border border-primary/25 bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {updating ? "…" : role === Role.ADMIN ? "Revoke Admin" : "Make Admin"}
        </button>
      </td>
    </tr>
  );
}
