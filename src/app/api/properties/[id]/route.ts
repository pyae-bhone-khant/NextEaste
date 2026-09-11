import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/sever-action/get-CurrentUser";
import { CloudinaryUploadResult, uploadToCloudinary } from "@/service/cloudinary";

// ─── GET /api/properties/[id] — public ──────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/properties/[id]]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ─── PATCH /api/properties/[id] — owner only ────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.property.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    if (existing.ownerId !== currentUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();

    const title        = formData.get("title")        as string | null;
    const description  = formData.get("description")  as string | null;
    const propertyType = formData.get("propertyType") as string | null;
    const listingType  = formData.get("listingType")  as string | null;
    const price        = formData.get("price")        as string | null;
    const bedrooms     = formData.get("bedrooms")     as string | null;
    const bathrooms    = formData.get("bathrooms")    as string | null;
    const parkingSpaces = formData.get("parkingSpaces") as string | null;
    const location     = formData.get("location")     as string | null;
    const address      = formData.get("address")      as string | null;
    const area         = formData.get("area")         as string | null;
    const status       = formData.get("status")       as string | null;
    const imageFile    = formData.get("image") instanceof File
      ? (formData.get("image") as File)
      : null;

    // Only upload a new image if one was provided
    let imageUrl = existing.image;
    if (imageFile && imageFile.size > 0) {
      const uploaded: CloudinaryUploadResult = await uploadToCloudinary(imageFile);
      imageUrl = uploaded.secure_url;
    }

    const updated = await prisma.property.update({
      where: { id },
      data: {
        ...(title        && { title }),
        ...(description  && { description }),
        ...(propertyType && { propertyType, type: propertyType }),
        ...(listingType  && { listingType }),
        ...(price        && { price: Number(price) }),
        ...(bedrooms     && { bedrooms: Number(bedrooms) }),
        ...(bathrooms    && { bathrooms: Number(bathrooms) }),
        ...(parkingSpaces && { parkingSpace: Number(parkingSpaces) }),
        ...(location     && { location }),
        ...(address      && { address }),
        ...(status       && { status }),
        area: area ? Number(area) : existing.area,
        image: imageUrl,
      },
    });

    return NextResponse.json({ property: updated }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /api/properties/[id]]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ─── DELETE /api/properties/[id] — owner only ───────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.property.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    if (existing.ownerId !== currentUser.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.property.delete({ where: { id } });

    return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/properties/[id]]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
