import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/sever-action/get-CurrentUser";
import { uploadToCloudinary, CloudinaryUploadResult } from "@/service/cloudinary";
import { prisma } from "@/lib/prisma";

/**
 * PATCH /api/user/avatar
 * Body: multipart/form-data  { avatar: File }
 * Uploads the file to Cloudinary /avatars folder and saves the URL to user.image
 */
export async function PATCH(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const avatarFile = formData.get("avatar") as File | null;

        if (!avatarFile || avatarFile.size === 0) {
            return NextResponse.json({ error: "No avatar file provided" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(avatarFile.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image." },
                { status: 400 }
            );
        }

        // Upload to Cloudinary in avatars folder with face crop transformation
        const result: CloudinaryUploadResult = await uploadToCloudinary(avatarFile);

        // Update user.image in the database
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { image: result.secure_url },
            select: { id: true, name: true, image: true },
        });

        return NextResponse.json(
            { message: "Avatar updated successfully", image: updatedUser.image },
            { status: 200 }
        );
    } catch (error) {
        console.error("[PATCH /api/user/avatar]:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
