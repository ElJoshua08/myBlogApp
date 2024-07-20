"use client"
import { getLoggedInUser } from "@/services/authService";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const user = await getLoggedInUser();
      setUser(user);
    };

    getUser();
  }, [setUser]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-700 p-24">
      {/* Latest posts */}
      <h1 className={`text-4xl font-semibold ${pacifico.className}`}>
        Welcome to my blog!
      </h1>

      <p>User found: {user ? user.name : "No user found"}</p>

      <p>Home page</p>

      <button
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          router.push("/register");
        }}
      >
        Register
      </button>
    </main>
  );
}
