import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export default  async function getCurrentUser() {
   const session  = await auth.api.getSession({
    headers: await headers()
   }) 
   if(!session?.user.id) {
    return null ; 
   } 
   const user = await prisma.user.findUnique({
    where: {
        id: session.user.id
    } , 
    select : {
        id : true
    } 
    
   })
   return user;
}  