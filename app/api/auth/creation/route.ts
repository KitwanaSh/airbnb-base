import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if(!user || user == null || !user.id){
        throw new Error("There was an error found...!");
    }
    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        },
    });

    if(!dbUser){
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                id: user.id,
                profileImage: user.picture ?? `${user.given_name}`,
            }
        });
    }
    return NextResponse.redirect("http://localhost:3000")
}