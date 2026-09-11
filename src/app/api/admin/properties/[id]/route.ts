import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "@prisma/client";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });
  return user?.role === Role.ADMIN ? user : null;
}

// DELETE /api/admin/properties/[id] — force delete any property
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/admin/properties/[id]]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// PATCH /api/admin/properties/[id] — toggle status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    const { status } = await req.json() as { status: string };

    const updated = await prisma.property.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ property: updated }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /api/admin/properties/[id]]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
