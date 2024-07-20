"use client";

import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Link from "next/link";
export default function AccountPage() {
  const user = useAuthenticatedUser();

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
      <h1 className="flex items-center gap-5 text-6xl font-semibold">
        This is your account page
      </h1>
      <p className="text-2xl text-slate-400">{`Welcome back ${user?.name}`}</p>

      <button className="flex items-center gap-2 rounded-md border-2 border-red-500 bg-white px-2 py-1 text-slate-500 transition-colors hover:bg-red-500 hover:text-white">
        <Link href="/logout">Logout</Link>
      </button>
    </div>
  );
}
