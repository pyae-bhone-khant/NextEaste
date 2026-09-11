import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "@/generated/prisma";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });
  return user?.role === Role.ADMIN ? user : null;
}

// PATCH /api/admin/users/[id] — toggle role
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id } = await params;
    // Prevent self-demotion
    if (id === admin.id) {
      return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
    }

    const { role } = await req.json() as { role: Role };
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json({ user: updated }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /api/admin/users/[id]]:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
