export interface Property {
    id: string
    title: string
    description?: string | null
    location: string
    address?: string
    price: number
    type: string
    propertyType: string
    listingType: string
    status: string
    bedrooms: number
    bathrooms: number
    area: number | null
    image: string
    createdAt?: string | Date
}
