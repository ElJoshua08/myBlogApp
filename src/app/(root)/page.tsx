"use client"
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";


export default function Home() {
  const user = useAuthenticatedUser();
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      {/* Latest posts */}
      <h1 className={`font-pacifico text-4xl font-semibold absolute top-0 left-0 mt-3 ml-3`}>
        Welcome back <span className="text-primary-dark">{user?.name}</span>
      </h1>
    </main>
  );
}
