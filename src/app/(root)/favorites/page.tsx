"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { PostsGrid } from "@/components/PostsGrid";
import { useRouter } from "next/navigation";

export default function Favorites() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, userLoading, router]);

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
          Favorites
        </span>
      </h1>

      <PostsGrid userID={userID} type="favorites" />
    </main>
  );
}
