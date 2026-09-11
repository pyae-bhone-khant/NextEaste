import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "@/generated/prisma";

async function getAdminUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });
  return user?.role === Role.ADMIN ? user : null;
}

// GET /api/admin/stats
export async function GET() {
  try {
    const admin = await getAdminUser();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const [totalUsers, totalProperties, forSale, forRent] = await prisma.$transaction([
      prisma.user.count(),
      prisma.property.count(),
      prisma.property.count({ where: { listingType: "sale" } }),
      prisma.property.count({ where: { listingType: "rent" } }),
    ]);

    return NextResponse.json({ totalUsers, totalProperties, forSale, forRent });
  } catch (error) {
    console.error("[GET /api/admin/stats]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
