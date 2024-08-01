"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaStar, FaUser } from "react-icons/fa";
import { NavItemProps } from "@/types/interfaces";
import { Logo } from "./Logo";

export const Header = () => {
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
    {
      name: "Account",
      href: "/account",
      icon: <FaUser />,
    },
  ];

  return (
    <header className="bg-background-dark dark:bg-dark-background-light sticky top-0 z-10 mb-5 flex w-full items-center justify-between rounded-b-lg shadow-md shadow-slate-300/60 backdrop-blur-md dark:shadow-slate-800/70">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Logo className="size-16" />
        <h1 className="hidden font-pacifico text-2xl font-semibold tracking-wide text-accent sm:flex">
          My blog
        </h1>
      </div>

      {/* Nav */}

      <nav className="mr-5 flex">
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <NavItem item={item} key={item.name} />
          ))}
        </ul>
      </nav>
    </header>
  );
};

const NavItem = ({ item }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <li className="flex items-center">
      <Link
        href={item.href}
        className={`text-header dark:text-dark-header flex items-center gap-2 rounded-md p-2 font-nunito text-xl transition-all duration-150 sm:px-2 sm:py-1 sm:text-lg ${
          isActive ? "bg-primary" : "hover:bg-primary-dark/70"
        } `}
      >
        {item.icon}
        <span className="hidden sm:flex">{item.name}</span>
      </Link>
    </li>
  );
};
