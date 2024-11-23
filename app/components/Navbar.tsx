import Image from "next/image";
import Link from "next/link";
import DestopLogo from "../../public/airbnb-desktop.png";
import MobileLogo from "../../public/airbnb-mobile.webp";
import UserNav from "./UserNav";

export default function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto h-16 px-5 lg:px-10 py-5">
                <Link href="/">
                    <Image 
                        src={DestopLogo}
                        alt="logo destop"
                        className="w-32 hidden lg:block"
                    />

                    <Image 
                        src={MobileLogo}
                        alt="logo mobile"
                        className="block lg:hidden w-12"
                    />
                </Link>
                <div className="border rounded-3xl border-gray-200 px-4 py-2">
                    <span>Search button</span>
                </div>
                <UserNav />
            </div>
        </nav>
    )
}