import Footer from "@/components/general/Footer";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import PropertyContactForm from "@/components/property/PropertyContactForm";
import PropertyOwnerActions from "@/components/property/PropertyOwnerActions";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/sever-action/get-CurrentUser";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaMapMarkedAlt, FaBed, FaBath, FaCar, FaRulerCombined } from "react-icons/fa";

async function getProperty(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, image: true } },
    },
  });
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ proprttyId: string }>;
}) {
  const { proprttyId } = await params;
  const [property, currentUser] = await Promise.all([
    getProperty(proprttyId),
    getCurrentUser(),
  ]);

  if (!property) notFound();

  const isOwner = currentUser?.id === property.ownerId;

  return (
    <FrontendLayout>
      <Navbar variant="solid" />
      <section className="py-15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">

          {/* ── Top header ── */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.25rem] text-primary">
                {property.listingType === "rent" ? "For Rent" : "For Sale"}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-text md:text-5xl">
                {property.title}
              </h1>

              <div className="my-6 flex items-center gap-3 text-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaMapMarkedAlt size={15} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Location
                </span>
                <span className="h-5 w-px bg-neutral-200" aria-hidden="true" />
                <span className="font-medium text-neutral-800">{property.location}</span>
                {property.address && (
                  <>
                    <span className="h-5 w-px bg-neutral-200" aria-hidden="true" />
                    <span className="text-neutral-500">{property.address}</span>
                  </>
                )}
              </div>

              {/* Stats bar */}
              <div className="grid max-w-xl grid-cols-4 border-y border-neutral-200 py-5">
                <div className="flex flex-col items-center gap-1 pr-4">
                  <FaBed size={18} className="text-primary/70" />
                  <p className="text-xl font-semibold tracking-tight text-neutral-900">{property.bedrooms}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Beds</p>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-neutral-200 px-4">
                  <FaBath size={18} className="text-primary/70" />
                  <p className="text-xl font-semibold tracking-tight text-neutral-900">{property.bathrooms}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Baths</p>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-neutral-200 px-4">
                  <FaCar size={18} className="text-primary/70" />
                  <p className="text-xl font-semibold tracking-tight text-neutral-900">{property.parkingSpace}</p>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Parking</p>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-neutral-200 pl-4">
                  <FaRulerCombined size={18} className="text-primary/70" />
                  <p className="text-xl font-semibold tracking-tight text-neutral-900">
                    {property.area ? property.area.toLocaleString() : "—"}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">Sq ft</p>
                </div>
              </div>
            </div>

            {/* Price card */}
            <div className="rounded-3xl border border-primary/15 bg-primary/5 p-6 shadow-lg shadow-primary/10 lg:min-w-60 lg:text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">Price</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-primary">
                ${property.price.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-text/55">
                {property.listingType === "rent" ? "per month" : "For sale"}
              </p>
              <span className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {property.propertyType}
              </span>

              {/* Owner actions */}
              {isOwner && (
                <PropertyOwnerActions propertyId={property.id} />
              )}
            </div>
          </div>

          {/* ── Hero image ── */}
          <div className="relative mt-12 aspect-16/8 overflow-hidden rounded-3xl shadow-xl shadow-black/10">
            <Image
              src={property.image}
              alt={property.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          {/* ── Description + Contact ── */}
          <div className="mt-16 grid gap-8 lg:grid-cols-[7fr_3fr] lg:gap-10">
            <article className="rounded-2xl border border-black/10 bg-card p-5 shadow-lg shadow-black/5 md:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About this property</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">
                {property.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-text/60">
                {property.description ?? "No description provided."}
              </p>
            </article>

            <aside className="overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-xl shadow-primary/5">
              <div className="border-b border-primary/10 bg-primary/5 px-5 py-4 md:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  {isOwner ? "Your listing" : "Your property guide"}
                </p>
              </div>
              <div className="p-5 md:p-6">
                {/* Owner info */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {property.owner.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-text">{property.owner.name}</p>
                    <p className="mt-1 text-sm text-text/55">Property Owner</p>
                  </div>
                </div>

                {!isOwner && (
                  <div className="mt-7 border-t border-black/10 pt-6">
                    <h3 className="text-lg font-semibold text-text">Send an inquiry</h3>
                    <p className="mt-1 text-sm leading-6 text-text/55">
                      Ask a question or request a private viewing.
                    </p>
                    <PropertyContactForm />
                  </div>
                )}
              </div>
            </aside>
          </div>

        </div>
      </section>
      <Footer variant="solid" />
    </FrontendLayout>
  );
}