"use client";
import { logout } from "@/services/authService";
import useUserStore from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loading } from "@/components/Loading";

export default function LogoutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUserStore();

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    logout();
    setIsLoading(false);
  }, [setUser]);

  return isLoading ? <Loading /> : (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
      <>
        <h1 className="header text-center !text-5xl !leading-normal sm:!text-6xl">
          You can now safely close this tab
        </h1>

        <Link
          href={"/login"}
          className="text-center text-lg text-paragraph hover:text-primary-dark dark:text-dark-paragraph"
        >
          or click here to login again
        </Link>
      </>
    </div>
  );
}
