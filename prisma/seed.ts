import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.jpg',
  '/images/image9.jpg',
  '/images/image10.jpg',
  '/images/image11.jpg',
  '/images/image12.jpg',
]

const propertyTypes = ['house', 'apartment', 'condo', 'villa', 'studio', 'hotel', 'cabin', 'farm', 'office', 'shop', 'warehouse', 'industrial']
const listingTypes = ['sale', 'rent']
const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Seattle', 'Boston', 'Denver', 'Austin', 'Portland']

async function main() {
  console.log('Starting seed...')

  // Create a test user first
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
    },
  })

  console.log('Created test user:', user.email)

  // Create properties
  const properties = []
  for (let i = 0; i < 12; i++) {
    const property = await prisma.property.create({
      data: {
        title: `Beautiful ${propertyTypes[i % propertyTypes.length]} in ${locations[i % locations.length]}`,
        description: `This stunning ${propertyTypes[i % propertyTypes.length]} offers modern amenities and is located in the heart of ${locations[i % locations.length]}. Perfect for ${listingTypes[i % listingTypes.length]}.`,
        propertyType: propertyTypes[i % propertyTypes.length],
        listingType: listingTypes[i % listingTypes.length],
        price: Math.floor(Math.random() * 500000) + 100000,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 4) + 1,
        parkingSpace: Math.floor(Math.random() * 3),
        location: locations[i % locations.length],
        address: `${Math.floor(Math.random() * 999) + 1} Main St`,
        area: Math.floor(Math.random() * 3000) + 500,
        image: images[i],
        type: propertyTypes[i % propertyTypes.length],
        status: 'available',
        ownerId: user.id,
      },
    })
    properties.push(property)
    console.log(`Created property ${i + 1}: ${property.title}`)
  }

  console.log(`Seed completed! Created ${properties.length} properties`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
