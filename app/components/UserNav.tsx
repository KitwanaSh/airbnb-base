import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createAirbnbHome } from "../actions";


export default async function UserNav() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const createHomewithId = createAirbnbHome.bind(null, {userId: user?.id as string});

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                <img
                    src={
                        user?.picture ??
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
                    }
                    alt="user"
                    className="w-8 h-8 hiden lg:block rounded-full" 
                />
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="align-end w-[200px]">
                {user ? (
                <>
                    <DropdownMenuItem>
                        <form action={createHomewithId} className="w-full text-start">
                            <button type="submit">Airbnb your home</button>
                        </form>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/my-homes" className="w-full">Listings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/favorites" className="w-full">My Favorites</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/reservations" className="w-full">My Reservations</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogoutLink>Logout</LogoutLink>
                    </DropdownMenuItem>
                </>
                ): (
                <>
                    <DropdownMenuItem>
                        <RegisterLink>Register</RegisterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LoginLink>Login</LoginLink>
                    </DropdownMenuItem>
                </>
                )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}