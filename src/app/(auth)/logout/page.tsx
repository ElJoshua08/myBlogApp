"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";

export default function LogoutPage() {
  const router = useRouter();
  const user = useAuthenticatedUser();

  setTimeout(() => {
    logout();
    router.push("/");
  }, 1000);
  
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
      <h1 className="flex font-pacifico items-center gap-5 text-6xl font-semibold">
        We are logging you out...
      </h1>
    </div>
  )
}