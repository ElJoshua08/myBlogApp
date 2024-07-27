"use client";

import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaStar, FaUser } from "react-icons/fa";

export const Header = () => {
  const user = useAuthenticatedUser();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FaHome />,
    },
    {
      name: "Favorites",
      href: "/favorites",
      icon: <FaStar />,
    },
    user
      ? {
          name: "Account",
          href: "/account",
          icon: <FaUser />,
        }
      : null,
  ];

  return (
    <div className="sticky top-0 z-10 mb-5 flex w-full items-center justify-between rounded-b-lg bg-slate-200/50 shadow-md shadow-slate-300/60 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image
          src={"/logo/logo.svg"}
          width={0}
          height={0}
          alt="logo"
          className="size-16"
        />
        <h1 className="hidden font-pacifico text-2xl font-semibold tracking-wide text-accent sm:flex">
          My blog
        </h1>
      </div>

      {/* Nav */}
      <nav className="mr-5 flex">
        <ul className="flex items-center gap-2">
          {navItems.map(
            (item) => item !== null && <NavItem item={item} key="item.name" />,
          )}

          {!user && (
            <Link
              href="/login"
              className="ml-4 flex items-center justify-center gap-2 rounded-md bg-accent px-2 py-1 text-2xl text-gray-100 transition-colors hover:text-white"
            >
              Login
            </Link>
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
        className={`flex items-center gap-2 rounded-md p-2 text-xl transition-all duration-150 sm:px-2 sm:py-1 sm:text-lg ${isActive ? "bg-blue-300 text-white" : "text-slate-500 hover:bg-blue-200/60"}`}
      >
        {item.icon}
        <span className="hidden sm:flex">{item.name}</span>
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
