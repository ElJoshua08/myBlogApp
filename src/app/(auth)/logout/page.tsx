"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";
import useUserStore from "@/stores/useUserStore";

export default function LogoutPage() {
  const router = useRouter();
  const { setUser } = useUserStore();

  setTimeout(() => {
    setUser(null);
    // logout();
    router.push("/");
  }, 3000);
  
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
      <h1 className="header text-center">We are logging you out...</h1>
    </div>
  )
}