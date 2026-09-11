import { prisma } from "@/lib/prisma";
import getCurrentUser from "./get-CurrentUser";

export async function getUserProperties() {
    try {
        // Await the user data if getCurrentUser is an async function
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return []
        }
        const properties = await prisma.property.findMany({
            where: { ownerId: currentUser.id },
            orderBy: { createdAt: "desc" }

        })

        return properties
    } catch (error) {
        console.error("Failed to fetch user:", error);

        // Return null or a fallback value so the calling function doesn't crash
        return null;
    }
}