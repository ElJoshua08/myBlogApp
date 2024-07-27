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
  1000: 2,
  500: 1,
};

export default function Home() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthenticatedUser();

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
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user, userLoading]);

  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      {/* User welcome */}
      <h1
        className={`left-0 top-0 ml-3 mt-3 self-start font-pacifico text-4xl sm:text-6xl font-normal text-slate-800`}
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
      <div className="mt-10 flex w-full flex-grow flex-col items-start justify-start gap-6 px-4">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-slate-200"></div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex flex-grow"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map(
              ({ title, content, $createdAt, id, isFavorite }: PostProps, index: number) => (
                <Post
                  key={id}
                  id={id}
                  title={title}
                  content={content}
                  createdAt={parseToReadableDate(new Date($createdAt))}
                  favoritesCount={0}
                  className="break-inside-avoid"
                  delay={index * 0.1}
                />
              ),
            )}
          </Masonry>
        )}
      </div>
      {/* Create new post */}
      {user && (
        <ActionButton
          onClick={() => router.push("/posts/create")}
          className="fixed bottom-0 right-0 mb-5 mr-5 !bg-accent hover:!shadow-accent/70"
        >
          <span className="hidden sm:inline">Create Post</span> <FaPlus className="inline-block" />
        </ActionButton>
      )}
    </main>
  );
}

interface PostProps {
  title: string;
  content: string;
  $createdAt: string;
  id: string;
  isFavorite: boolean;
}
