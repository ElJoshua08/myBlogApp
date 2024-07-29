"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import ActionButton from "@/components/ActionButton";
import { useRouter } from "next/navigation";
import { PostsGrid } from "@/components/PostsGrid";

export default function Home() {
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

  return userLoading ? (
    <div className="flex w-full flex-grow items-center justify-center gap-3">
      {" "}
      Loading{" "}
    </div>
  ) : (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      {/* User welcome */}
      <h1 className={`page-title`}>
        Welcome back
        <span className="page-title-accent">
          <Image
            src={"/LineName.svg"}
            width={0}
            height={0}
            alt=""
            className="absolute bottom-0 left-2 h-8 w-56 translate-y-6 select-none"
          />
          {user && user.name}
        </span>
      </h1>
      {/* Posts */}
      {userID && <PostsGrid userID={userID} />}

      {/* Create new post */}
      {user && (
        <ActionButton
          onClick={() => router.push("/posts/create")}
          className="fixed bottom-0 right-0 mb-5 mr-5 !bg-accent hover:!shadow-accent/70"
        >
          <span className="hidden sm:inline">Create Post</span>{" "}
          <FaPlus className="inline-block" />
        </ActionButton>
      )}
    </main>
  );
}
