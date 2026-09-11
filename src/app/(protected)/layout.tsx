import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import getCurrentUser from "@/sever-action/get-CurrentUser";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) { 
    const user = await getCurrentUser();
    if(!user) {
        redirect("/");
    }
    return <>{children}</>
}
