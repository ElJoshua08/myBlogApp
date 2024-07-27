"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/postService";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const user = useAuthenticatedUser();
  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);


  return (
    <main className="relative flex-grow flex flex-col items-center justify-start pb-5">
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
      {/* Posts */}
      <div className="mt-10 flex flex-grow flex-col flex-wrap gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-slate-200"></div>
          </div>
        ) : (
          posts.map(({ postName, postContent, postDate, id }: PostProps) => (
            <div key={id} className="flex flex-col gap-4 bg-red-500 p-4">
              <h1>{postName}</h1>
              <p>{postContent}</p>
            </div>
          ))
        )}
      </div>

      {/* Create new post */}
      <Link href="posts/create" className="flex items-center justify-center gap-2 absolute rounded-md p-2 text-2xl text-gray-50 transition-colors bg-accent bottom-0 right-0 mb-5 mr-5">
        Create Post <FaPlus />
      </Link>
    </main>
  );
}

interface PostProps {
  postName: string;
  postContent: string;
  postDate: string;
  id: string;
}
