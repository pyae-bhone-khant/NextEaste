import Footer from "@/components/general/Footer";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import { getUserProperties } from "@/sever-action/get-user-Property";
import Image from "next/image";
import Link from "next/link";
import UserPropertyCard from "@/components/property/UserPropertyCard";
import { Property } from "@/types/property";

export const dynamic = 'force-dynamic'

export default function PropertiesPage() {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-8 pb-24 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text md:text-3xl">My Properties</h1>
            <p className="mt-1 text-sm text-text/50">Manage your listings</p>
          </div>
        </div>
        <PropertyContent />
      </div>
      <Footer variant="solid" />
    </FrontendLayout>
  );
}

async function PropertyContent() {
  const properties = await getUserProperties();

  if (!properties || properties.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-text/20 py-24 text-center">
        <span className="text-5xl">🏠</span>
        <p className="text-xl font-semibold text-text">No listings yet</p>
        <p className="max-w-sm text-sm text-text/50">
          Click &quot;Add Property&quot; in the navbar to create your first listing.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property: Property) => (
        <UserPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}