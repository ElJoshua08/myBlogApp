"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUserStore();

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    logout();
    setIsLoading(false);
  }, [setUser]);

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
      {isLoading ? (
        <h1 className="header">We are logging you out...</h1>
      ) : (
        <>
          <h1 className="header">You are now logged out</h1>
          <p className="text-nunito flex flex-col items-center justify-center text-xl text-slate-700 dark:text-slate-200">
            You can now safely close this tab
            <Link
              href={"/login"}
              className="text-lg text-slate-600 hover:text-blue-400 dark:text-slate-400"
            >
              or click here to login again
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
