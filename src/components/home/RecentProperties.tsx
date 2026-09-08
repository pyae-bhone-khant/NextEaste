import { dummyProperties } from "@/constants/dummyProperties";
import PropertyCard from "@/properties/PropertityCard";

export default function RecentProperties(){
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-12 ">
                {/* header */}
                <div className="max-w-2xl ">
                   <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary ">
                      New Listings
                   </p> 
                   <h2 className="text-3xl font-bold text-text md:text-4xl ">Discover Recently Added Properties </h2>
                   <p className="mt-5 text-md leading-relaxed text-text/60 ">Browse the latest homes , apartments villas , and inverstm opportunities added to our marketplace by trusted property owners and agents </p>
                </div> 
                {/* properties grid */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6 ">
                  {dummyProperties.map((property) => (
                      <PropertyCard
                          key={property.id}
                          property={{ ...property, id: String(property.id) }}
                      />
                  ))} 
                </div>
            </div>
        </section>
    )
}