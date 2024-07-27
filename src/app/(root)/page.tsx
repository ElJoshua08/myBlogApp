"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPosts } from "@/services/postService";
import { FaPlus } from "react-icons/fa";
import ActionButton from "@/components/ActionButton";
import { useRouter } from "next/navigation";
import { Post } from "@/components/Post";
import { parseToReadableDate } from "@/lib/utils";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};


export default function Home() {
  const router = useRouter();
  const user = useAuthenticatedUser();

  const [posts, setPosts] = useState<any>([]);
  console.log("posts", posts);
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
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
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
      {/* TODO: Re layout this shit  */}
      <div className="mt-10 flex w-full flex-grow flex-col items-start justify-start gap-6 px-4">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-slate-200"></div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map(({ postName, postContent, $createdAt, id }: PostProps) => (
              <div key={id} className="break-inside-avoid">
                <Post
                  title={postName}
                  content={postContent}
                  createdAt={parseToReadableDate(new Date($createdAt))}
                  favoritesCount={0}
                />
              </div>
            ))}
          </Masonry>
        )}
      </div>

      {/* Create new post */}
      <ActionButton
        onClick={() => router.push("/posts/create")}
        className="absolute bottom-0 right-0 mb-5 mr-5 !bg-accent hover:!shadow-accent/70"
      >
        Create Post <FaPlus className="inline-block" />
      </ActionButton>
    </main>
  );
}

interface PostProps {
  postName: string;
  postContent: string;
  $createdAt: string;
  id: string;
}
