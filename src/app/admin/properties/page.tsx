import { prisma } from "@/lib/prisma";
import AdminPropertyRow from "@/components/admin/AdminPropertyRow";

async function getAllProperties() {
  return prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, location: true, price: true,
      listingType: true, propertyType: true, status: true,
      createdAt: true,
      owner: { select: { name: true, email: true } },
    },
  });
}

export default async function AdminPropertiesPage() {
  const properties = await getAllProperties();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">All Properties</h1>
          <p className="mt-1 text-sm text-text/50">{properties.length} total listings</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/8 bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/8 bg-background text-left">
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Property</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Owner</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Price</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Type</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Status</th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-text/40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {properties.map((property) => (
              <AdminPropertyRow key={property.id} property={property} />
            ))}
          </tbody>
        </table>
        {properties.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-text/40">No properties found</p>
          </div>
        )}
      </div>
    </div>
  );
}
