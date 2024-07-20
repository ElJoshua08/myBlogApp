"use client"
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";


export default function Home() {
  const user = useAuthenticatedUser();
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Latest posts */}
      <h1 className={`text-4xl font-semibold font-pacifico`}>
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
