import PropertyCard from "@/properties/PropertityCard";
import { Property } from "@/types/property";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getRecentProperties(): Promise<Property[]> {
  try {
    const rows = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        address: true,
        price: true,
        type: true,
        propertyType: true,
        listingType: true,
        status: true,
        bedrooms: true,
        bathrooms: true,
        area: true,
        image: true,
        createdAt: true,
      },
    });

    return rows;
  } catch (error) {
    console.error("[RecentProperties] Failed to fetch:", error);
    return [];
  }
}

export default async function RecentProperties() {
  const properties = await getRecentProperties();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              New Listings
            </p>
            <h2 className="text-3xl font-bold text-text md:text-4xl">
              Discover Recently Added Properties
            </h2>
            <p className="mt-5 text-md leading-relaxed text-text/60">
              Browse the latest homes, apartments, villas, and investment
              opportunities added to our marketplace by trusted property owners
              and agents.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
          >
            View All Properties →
          </Link>
        </div>

        {/* properties grid */}
        {properties.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-10">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="my-16 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-text/20 py-20 text-center">
            <span className="text-5xl">🏠</span>
            <p className="text-xl font-semibold text-text">No properties yet</p>
            <p className="max-w-sm text-sm text-text/50">
              Properties listed by owners and agents will appear here. Check
              back soon!
            </p>
            <Link
              href="/marketplace"
              className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Browse Marketplace
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}