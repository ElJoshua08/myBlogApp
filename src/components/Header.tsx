"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaStar, FaUser } from "react-icons/fa";

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
    <div className="flex w-full items-center justify-between rounded-md bg-slate-200/50 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Image src={"/logo/logo.svg"} width={48} height={48} alt="logo" />
        <h1 className="text-1xl font-pacifico font-semibold">My blog</h1>
      </div>

      {/* Nav */}
      <nav className="mr-5 flex">
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <NavItem item={item} key="item.name" />
          ))}
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ item }: NavItemProps) => {
  // Check if the item is active
  const router = useRouter();
  const isActive = router.pathname === item.href;


  
  return (
    <li className="flex items-center">
      <Link
        href={item.href}
        className="gap-2 text-gray-400 flex items-center transition-colors hover:text-blue-500"
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
