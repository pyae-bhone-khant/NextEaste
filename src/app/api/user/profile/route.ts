import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/sever-action/get-CurrentUser";
import { prisma } from "@/lib/prisma";

/**
 * PATCH /api/user/profile
 * Body: JSON { name?: string, email?: string }
 * Updates the authenticated user's name and/or email.
 */
export async function PATCH(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json() as { name?: string; email?: string };
        const { name, email } = body;

        if (!name?.trim() && !email?.trim()) {
            return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
        }

        // Validate email format if provided
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Check email uniqueness if changing
        if (email && email.trim() !== "") {
            const existing = await prisma.user.findFirst({
                where: { email: email.trim(), NOT: { id: currentUser.id } },
                select: { id: true },
            });
            if (existing) {
                return NextResponse.json({ error: "Email already in use" }, { status: 409 });
            }
        }

        const updated = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                ...(name?.trim()  && { name:  name.trim()  }),
                ...(email?.trim() && { email: email.trim() }),
            },
            select: { id: true, name: true, email: true, image: true },
        });

        return NextResponse.json(
            { message: "Profile updated", user: updated },
            { status: 200 }
        );
    } catch (error) {
        console.error("[PATCH /api/user/profile]:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
