import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { FiUsers, FiHome, FiTrendingUp, FiDollarSign } from "react-icons/fi";

async function getStats() {
  const [totalUsers, totalProperties, forSale, forRent] = await prisma.$transaction([
    prisma.user.count(),
    prisma.property.count(),
    prisma.property.count({ where: { listingType: "sale" } }),
    prisma.property.count({ where: { listingType: "rent" } }),
  ]);
  return { totalUsers, totalProperties, forSale, forRent };
}

async function getRecentActivity() {
  const [recentProperties, recentUsers] = await Promise.all([
    prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, location: true, listingType: true, createdAt: true, owner: { select: { name: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
  ]);
  return { recentProperties, recentUsers };
}

export default async function AdminDashboard() {
  const [stats, activity] = await Promise.all([getStats(), getRecentActivity()]);

  const statCards = [
    { label: "Total Users",       value: stats.totalUsers,      icon: FiUsers,      color: "bg-blue-50 text-blue-600"   },
    { label: "Total Properties",  value: stats.totalProperties, icon: FiHome,       color: "bg-primary/10 text-primary" },
    { label: "For Sale",          value: stats.forSale,         icon: FiDollarSign, color: "bg-emerald-50 text-emerald-600" },
    { label: "For Rent",          value: stats.forRent,         icon: FiTrendingUp, color: "bg-amber-50 text-amber-600"  },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="mt-1 text-sm text-text/50">Overview of your platform</p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${color}`}>
              <Icon size={22} />
            </div>
            <p className="mt-4 text-3xl font-bold text-text">{value}</p>
            <p className="mt-1 text-sm font-medium text-text/50">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Recent activity ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent properties */}
        <div className="rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold text-text">Recent Listings</h2>
          <div className="mt-4 space-y-3">
            {activity.recentProperties.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl bg-background px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text">{p.title}</p>
                  <p className="truncate text-xs text-text/50">{p.location} · by {p.owner.name}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${p.listingType === "rent" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                  {p.listingType === "rent" ? "Rent" : "Sale"}
                </span>
              </div>
            ))}
            {activity.recentProperties.length === 0 && (
              <p className="text-sm text-text/40">No properties yet</p>
            )}
          </div>
        </div>

        {/* Recent users */}
        <div className="rounded-2xl border border-black/8 bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold text-text">Recent Users</h2>
          <div className="mt-4 space-y-3">
            {activity.recentUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3 rounded-xl bg-background px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-text">{u.name}</p>
                  <p className="truncate text-xs text-text/50">{u.email}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${u.role === Role.ADMIN ? "bg-primary/10 text-primary" : "bg-background border border-black/10 text-text/50"}`}>
                  {u.role}
                </span>
              </div>
            ))}
            {activity.recentUsers.length === 0 && (
              <p className="text-sm text-text/40">No users yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
