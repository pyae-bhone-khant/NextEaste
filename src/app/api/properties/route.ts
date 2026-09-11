import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/sever-action/get-CurrentUser";
import { CloudinaryUploadResult, uploadToCloudinary } from "@/service/cloudinary";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET /api/properties
// Query params:
//   search     — keyword (title / location / address)
//   type       — propertyType slug  (house | villa | apartment …)
//   listing    — listingType        (sale | rent)
//   minPrice   — minimum price (inclusive)
//   maxPrice   — maximum price (inclusive)
//   minBeds    — minimum bedrooms
//   sort       — newest (default) | oldest | price_asc | price_desc
//   limit      — max results (default 6, max 50)
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const search   = sp.get("search")?.trim()   ?? "";
    const type     = sp.get("type")?.trim()     ?? "";
    const listing  = sp.get("listing")?.trim()  ?? "";
    const minPrice = sp.get("minPrice")?.trim() ?? "";
    const maxPrice = sp.get("maxPrice")?.trim() ?? "";
    const minBeds  = sp.get("minBeds")?.trim()  ?? "";
    const sort     = sp.get("sort")?.trim()     ?? "newest";
    const limit    = Math.min(Number(sp.get("limit") ?? 6), 50);

    const where: Prisma.PropertyWhereInput = {
      AND: [
        // keyword
        search
          ? {
              OR: [
                { title:    { contains: search, mode: "insensitive" } },
                { location: { contains: search, mode: "insensitive" } },
                { address:  { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        // property type
        type ? { propertyType: { equals: type, mode: "insensitive" } } : {},
        // listing type (sale / rent)
        listing ? { listingType: { equals: listing, mode: "insensitive" } } : {},
        // price range
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        // bedrooms
        minBeds ? { bedrooms: { gte: Number(minBeds) } } : {},
      ],
    };

    const orderBy: Prisma.PropertyOrderByWithRelationInput =
      sort === "oldest"     ? { createdAt: "asc"  } :
      sort === "price_asc"  ? { price:     "asc"  } :
      sort === "price_desc" ? { price:     "desc" } :
                              { createdAt: "desc" };   // newest (default)

    const properties = await prisma.property.findMany({
      where,
      orderBy,
      take: limit,
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

    const total = await prisma.property.count({ where });

    return NextResponse.json({ properties, total }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/properties]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req : NextRequest) {
  try { 
    const currentUser = await getCurrentUser();

    if(!currentUser) {
      return NextResponse.json(
        {error : "Unauthorized"},
        {status : 401}
      ) 
    } 
    const fromData = await req.formData(); 
    const title = fromData.get("title") ; 
    const price = fromData.get("price") ; 
    const description = fromData.get("description") as string; 
    const propertyType = fromData.get("propertyType") as string; 
    const listingType = fromData.get("listingType") as string; 
    const bedrooms = fromData.get("bedrooms") as string ; 
    const bathrooms = fromData.get("bathrooms") as string; 
    const parkingSpaces = fromData.get("parkingSpaces") as string; 
    const location = fromData.get("location") as string ; 
    const address = fromData.get("address") as string; 
    const area = fromData.get("area") as string; 
    const image = fromData.get("image") as File; 

    if (!title || !price || !description || !propertyType || !listingType || !bedrooms || !bathrooms || !parkingSpaces || !location || !address || !image) {
      return NextResponse.json(
        {error : "Missing required fields"},
        {status : 400}
      )
    }
    // upload the image to the cloud useing cloudinary
    const imageData : CloudinaryUploadResult = await uploadToCloudinary(image); 

    await prisma.property.create({
        data : {
            title : title as string,
            description : description as string,
            propertyType : propertyType as string,
            listingType : listingType as string,
            price : Number(price),
            bedrooms : Number(bedrooms),
            bathrooms : Number(bathrooms),
            parkingSpace : Number(parkingSpaces),
            location : location as string,
            address : address as string,
            image: imageData.secure_url,
            ownerId : String(currentUser.id),
            type: propertyType as string,
            status: "available"
        }
    }) 
    return NextResponse.json(
        {message : "Property created successfully"},
        {status : 201}
    )
   } catch (error) { 
    console.log(error)
    return NextResponse.json(
        {error : "Something want wrong"},
        {status : 500}
    )

  }
}
