"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "@/services/postService";
import { FaPlus } from "react-icons/fa";
import ActionButton from "@/components/ActionButton";
import { useRouter } from "next/navigation";
import { PostsGrid } from "@/components/PostsGrid";

export default function Home() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);

  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      setIsLoading(false);
      router.push("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user, userLoading, router]);


  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      {/* User welcome */}
      <h1
        className={`left-0 top-0 ml-3 mt-3 self-start font-pacifico text-4xl font-normal text-slate-800 sm:text-6xl`}
      >
        Welcome {user && "back"}{" "}
        <span className="relative inline-flex text-primary-dark">
          {user && (
            <Image
              src={"/LineName.svg"}
              width={0}
              height={0}
              alt=""
              className="absolute bottom-0 left-2 h-8 w-56 translate-y-6"
            />
          )}
          {user ? user.name : "Guest"}
        </span>
      </h1>
      {/* Posts */}
      <PostsGrid posts={posts} userID={userID} isLoading={isLoading} />
     
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

