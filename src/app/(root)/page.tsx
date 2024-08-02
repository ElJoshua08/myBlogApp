"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import ActionButton from "@/components/ActionButton";
import { useRouter } from "next/navigation";
import { PostsGrid } from "@/components/PostsGrid";
import { Line } from "@/components/Line";
import { Loading } from "@/components/Loading";

export default function Home() {
  const { user, loading: userLoading } = useAuthenticatedUser();

  const router = useRouter();
  const userID = useMemo(() => user?.$id, [user]);

  // useEffect(() => {
  //   if (!userLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, router, userLoading]);

  return userLoading ? (
    <Loading />
  ) : (
    <>
      {/* User welcome */}
      <h1 className={`page-title`}>
        Welcome back{" "}
        <span className="page-title-accent">
          <Line className="absolute top-full h-full w-full" />
          {user && user.name}
        </span>
      </h1>
      {/* Posts */}
      {userID && <PostsGrid userID={userID} />}

      {/* Create new post */}
      <ActionButton
        onClick={() => router.push("/posts/create")}
        variant="accent"
        className="fixed bottom-0 right-0 mb-3 mr-2"
      >
        <span className="hidden transition-all sm:inline">Create Post</span>{" "}
        <FaPlus className="inline-block text-3xl transition-all sm:text-lg" />
      </ActionButton>
    </>
  );
}
