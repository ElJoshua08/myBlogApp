"use client";

import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";

export const Header = () => {
  const user = useAuthenticatedUser();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FaHome />,
    },
    // {
    //   name: "Favorites",
    //   href: "/favorites",
    //   icon: <FaStar />,
    // },
    user
      ? {
          name: "Account",
          href: "/account",
          icon: <FaUser />,
        }
      : null,
  ];

  return (
    <div className="mb-5 flex w-full items-center justify-between rounded-b-lg bg-slate-200/50 backdrop-blur-md sticky top-0 z-10 shadow-slate-300/60 shadow-md">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image src={"/logo/logo.svg"} width={48} height={48} alt="logo" />
        <h1 className="font-pacifico text-2xl font-semibold tracking-wide text-accent-DEFUALT">
          My blog
        </h1>
      </div>

      {/* Nav */}
      <nav className="mr-5 flex">
        <ul className="flex items-center gap-4">
          {navItems.map(
            (item) => item !== null && <NavItem item={item} key="item.name" />,
          )}

          {!user && (
            <button className="flex items-center gap-2 rounded-md border-2 border-blue-300 bg-white px-2 py-1 text-gray-400 transition-colors hover:bg-blue-300 hover:text-white">
              <Link href="/login">Login</Link>
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <li className="flex items-center">
      <Link
        href={item.href}
        className={`flex items-center gap-2 text-gray-400 transition-colors hover:text-blue-500 ${isActive ? "text-blue-500" : ""}`}
      >
        {item.icon}
        {item.name}
      </Link>
    </li>
  );
};

interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ReactNode;
  };
}
