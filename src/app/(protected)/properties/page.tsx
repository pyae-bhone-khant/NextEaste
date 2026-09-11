import Footer from "@/components/general/Footer";
import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import PropertyCard from "@/properties/PropertityCard";
import { getUserProperties } from "@/sever-action/get-user-Property";


export default function propertiesPage() {
    return (
        <FrontendLayout>
            <Navbar variant="solid" />
            <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">
                        Properties
                    </h2>

                </div>
                {/* property content */}
                <PropertyContent />
            </div>
            <Footer variant="solid" />
        </FrontendLayout>
    )
}

async function PropertyContent() {
    const properties = await getUserProperties() 
    if (properties?.length === 0 ) {
        return <p>No properties found</p>
    }
    return (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3  my-4 ">
            {properties?.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={{ ...property, id: String(property.id) }}
                />
            ))}
        </div>
    )


}