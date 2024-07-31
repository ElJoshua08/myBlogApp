"use client";

import { useEffect, useMemo } from "react";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { PostsGrid } from "@/components/PostsGrid";
import { useRouter } from "next/navigation";
import { Line } from "@/components/Line";

export default function Favorites() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  if (userLoading)
    return (
      <div className="flex flex-grow flex-col items-center justify-center">
        Loading...
      </div>
    );

  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      <h1 className={`page-title`}>
        Take a look at your{" "}
        <span className="page-title-accent">
          <Line className="absolute top-full h-full w-full" />
          Favorites
        </span>
      </h1>

      <PostsGrid userID={userID} type="favorites" />
    </main>
  );
}
