import { Property } from "@/types/property"
import Image from "next/image"
import Link from "next/link"


interface PropertyCardProps { 
    property : Property
}

export default function PropertyCard({property} : PropertyCardProps) {
    return (
      <Link href={`property/${property.id}`} className="group relative  h-125 overflow-hidden rounded-4xl ">
           <div className="w-full h-full relative ">
                 <Image src={property.image} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="inset-0 object-cover transition  duration-700  group-hover:scale-110" />
                 {/* dark over lay  */} 
                 <div  className=" absolute inset-0  bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                 {/* top badge  */} 
                <div className="absolute left-5 top-5 z-20 rounded-full bg-white/80 px-4 py-2 text-sm  font-semibold text-primary ">
                      {property.status === "rent" ? "For Rent" : "For Sale"}
                </div>
                {/* Content Card  */}
                <div className="absolute inset-x-5 bottom-5 z-20 rounded-3xl border border-white/20 bg-black/25 p-5 text-white shadow-2xl backdrop-blur-xl transition group-hover:bg-black/35">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-white">{property.title}</p>
                      <p className="mt-1 truncate text-sm font-medium text-white/70">{property.type}</p>
                      <h3 className="mt-1 truncate text-2xl font-semibold tracking-tight">
                        ${property.price.toLocaleString()}
                        {property.status === "rent" && (
                          <span className="ml-1 text-sm font-normal text-white/60">/ month</span>
                        )}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                      {property.status === "rent" ? "Rent" : "Sale"}
                    </span>
                  </div>
                  <p className="mt-4 truncate border-t border-white/15 pt-3 text-sm text-white/65">
                    {property.location}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
                    <span>{property.bedrooms} beds</span>
                    <span>{property.bathrooms} baths</span>
                    <span>{property.area == null ? "Area unavailable" : `${property.area.toLocaleString()} sq ft`}</span>
                  </div>
                </div>
           </div> 
      </Link>
    )
}