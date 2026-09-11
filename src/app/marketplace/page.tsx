import Footer from "@/components/general/Footer";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import FilterButton from "@/components/marketPlace/FilterButton";
import Navbar from "@/components/navbar/Navbar";
import PropertyCard from "@/properties/PropertityCard";
import { prisma } from "@/lib/prisma";
import { Property } from "@/types/property";
import { Prisma } from "@prisma/client";
import MarketplaceSearchBar from "@/components/marketPlace/MarketplaceSearchBar";
import ActiveFilters from "@/components/marketPlace/ActiveFilters";
import SortSelect from "@/components/marketPlace/SortSelect";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

// ─── Types ────────────────────────────────────────────────────────────────────
interface SearchParams {
  search?:   string;
  type?:     string;
  listing?:  string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minBeds?:  string;
  sort?:     string;
}

// ─── Data fetching ────────────────────────────────────────────────────────────
async function getProperties(params: SearchParams): Promise<{ properties: Property[]; total: number }> {
  try {
    const { search, type, listing, location, minPrice, maxPrice, minBeds, sort } = params;

    const where: Prisma.PropertyWhereInput = {
      AND: [
        search
          ? {
              OR: [
                { title:    { contains: search, mode: "insensitive" } },
                { location: { contains: search, mode: "insensitive" } },
                { address:  { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        type     ? { propertyType: { equals: type,     mode: "insensitive" } } : {},
        listing  ? { listingType:  { equals: listing,  mode: "insensitive" } } : {},
        location ? { location:     { contains: location, mode: "insensitive" } } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        minBeds  ? { bedrooms: { gte: Number(minBeds) } } : {},
      ],
    };

    const orderBy: Prisma.PropertyOrderByWithRelationInput =
      sort === "oldest"     ? { createdAt: "asc"  } :
      sort === "price_asc"  ? { price:     "asc"  } :
      sort === "price_desc" ? { price:     "desc" } :
                              { createdAt: "desc" };

    const properties = await prisma.property.findMany({
      where,
      orderBy,
      select: {
        id: true, title: true, description: true,
        location: true, address: true, price: true,
        type: true, propertyType: true, listingType: true,
        status: true, bedrooms: true, bathrooms: true,
        area: true, image: true, createdAt: true,
      },
    });

    const total = await prisma.property.count({ where });

    return { properties, total };
  } catch (error) {
    console.error("[MarketPlace] Failed to fetch properties:", error);
    return { properties: [], total: 0 };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function MarketPlace({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params     = await searchParams;
  const { properties, total } = await getProperties(params);
  const hasFilters = Object.values(params).some(Boolean);

  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 pb-24 w-full space-y-6">

        {/* ── Page header ── */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-text md:text-3xl">Explore Properties</h1>
          <p className="text-sm text-text/50">
            {total > 0
              ? `${total} ${total === 1 ? "property" : "properties"} found`
              : hasFilters
              ? "No properties match your filters"
              : "No properties listed yet"}
          </p>
        </div>

        {/* ── Search bar — Client Component ── */}
        <Suspense>
          <MarketplaceSearchBar />
        </Suspense>

        {/* ── Toolbar: active chips + sort ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Suspense>
            <ActiveFilters />
          </Suspense>
          <div className="flex items-center gap-3 sm:ml-auto">
            <Suspense>
              <SortSelect />
            </Suspense>
            <FilterButton />
          </div>
        </div>

        {/* ── Results grid ── */}
        {properties.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-text/20 py-24 text-center">
            <span className="text-5xl">🔍</span>
            <p className="text-xl font-semibold text-text">
              {hasFilters ? "No matching properties" : "No properties yet"}
            </p>
            <p className="max-w-sm text-sm text-text/50">
              {hasFilters
                ? "Try adjusting or clearing your filters to see more results."
                : "Check back soon — new listings are added regularly."}
            </p>
            {hasFilters && (
              <a
                href="/marketplace"
                className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Clear all filters
              </a>
            )}
          </div>
        )}
      </div>

      <Footer variant="solid" />
    </FrontendLayout>
  );
}