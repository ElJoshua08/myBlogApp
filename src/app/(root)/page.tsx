"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { Post } from "@/components/Post";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/postService";

export default function Home() {
  const user = useAuthenticatedUser();
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start pb-5">
      {/* User welcome */}
      <h1
        className={`left-0 top-0 ml-3 mt-3 self-start font-pacifico text-6xl font-normal text-slate-800`}
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
      {/* Latest posts */}
      <div className="mt-10 flex flex-col gap-4 px-4"></div>
    </main>
  );
}