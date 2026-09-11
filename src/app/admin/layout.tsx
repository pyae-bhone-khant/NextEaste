import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import { FiHome, FiList, FiUsers, FiBarChart2 } from "react-icons/fi";
import { Role } from "@prisma/client";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) redirect("/");
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, name: true },
  });
  if (!user || user.role !== Role.ADMIN) redirect("/");
  return user; // guaranteed non-null after redirect
}

const adminLinks = [
  { label: "Dashboard",  href: "/admin",            icon: FiBarChart2 },
  { label: "Properties", href: "/admin/properties", icon: FiList      },
  { label: "Users",      href: "/admin/users",       icon: FiUsers     },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Sidebar ── */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-black/8 bg-card shadow-sm">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-black/8 px-6">
          <span className="text-lg font-bold text-text">Next</span>
          <span className="rounded-tr-xl rounded-bl-xl bg-primary px-2 py-0.5 text-sm font-bold text-white">Estate</span>
          <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-4">
          {adminLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-text/60 transition hover:bg-background hover:text-text"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-black/8 p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text">{user.name}</p>
              <p className="text-xs text-primary font-medium">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
