"use client";
import { PostsGrid } from "@/components/PostsGrid";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function AccountPage() {
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }

  }, [user, userLoading, router]);

  if (userLoading) {
    return (
      <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      <h1 className={`page-title`}>
        Take a look at your{" "}
        <span className="page-title-accent">
          <Image
            src={"/LineName.svg"}
            width={0}
            height={0}
            alt=""
            className="absolute bottom-0 left-2 h-8 w-56 translate-y-6 select-none"
          />
          Account
        </span>
      </h1>

      <PostsGrid userID={userID} type="account" />
    </main>
  );
}
