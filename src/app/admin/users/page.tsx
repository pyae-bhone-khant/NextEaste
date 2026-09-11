import { prisma } from "@/lib/prisma";
import AdminUserRow from "@/components/admin/AdminUserRow";

export const dynamic = 'force-dynamic'

async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, role: true, createdAt: true,
      _count: { select: { properties: true } },
    },
  });
}

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">All Users</h1>
        <p className="mt-1 text-sm text-text/50">{users.length} registered users</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/8 bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/8 bg-background text-left">
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">User</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Email</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Properties</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Role</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Joined</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {users.map((user) => (
              <AdminUserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-text/40">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
