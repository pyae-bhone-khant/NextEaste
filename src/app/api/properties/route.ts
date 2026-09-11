import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/sever-action/get-CurrentUser";
import { CloudinaryUploadResult, uploadToCloudinary } from "@/service/cloudinary";
import { prisma } from "@/lib/prisma";

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
            area :  area ? Number(area) : null,
            image: imageData.secure_url,
            ownerId : currentUser.id,
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
