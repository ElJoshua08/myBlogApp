"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { getPosts } from "@/services/postService";
import { parseToReadableDate } from "@/lib/utils";
import { Post } from "@/components/Post";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Favorites() {
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
            {posts.map(
              ({ postName, postContent, $createdAt, id }: PostProps) => (
                <div key={id} className="break-inside-avoid">
                  <Post
                    title={postName}
                    content={postContent}
                    createdAt={parseToReadableDate(new Date($createdAt))}
                    favoritesCount={0}
                  />
                </div>
              ),
            )}
          </Masonry>
        )}
      </div>
    </main>
  );
}

interface PostProps {
  postName: string;
  postContent: string;
  $createdAt: string;
  id: string;
}

