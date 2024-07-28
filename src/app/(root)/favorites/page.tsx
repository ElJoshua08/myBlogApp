"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { getUserFavoritePosts } from "@/services/postService";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { PostsGrid } from "@/components/PostsGrid";

export default function Favorites() {
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);

  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return;

    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getUserFavoritePosts({ userID });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user, userLoading, userID]);

  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      <h1
        className={`left-0 top-0 ml-3 mt-3 self-start font-pacifico text-6xl font-normal text-slate-800`}
      >
        Take a look at your{" "}
        <span className="relative inline-flex text-primary-dark">
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

      
      <PostsGrid posts={posts} userID={userID} isLoading={isLoading} isFavorites={true} />
    </main>
  );
}
