import Footer from "@/components/general/Footer";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import FilterButton from "@/components/marketPlace/FilterButton";
import Navbar from "@/components/navbar/Navbar";
import Button from "@/components/ui/Button";
import { dummyProperties } from "@/constants/dummyProperties";
import PropertyCard from "@/properties/PropertityCard";



export default function MarketPlace () {
    return (
        <FrontendLayout>
            <Navbar variant="solid" />
            <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">
                        Explore
                    </h2> 
                    <FilterButton />
                </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3  my-4 ">
                {dummyProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={{ ...property, id: String(property.id) }}
                    />
                ))}
            </div>
            </div> 
            <Footer variant="solid" />
        </FrontendLayout>
    )
}