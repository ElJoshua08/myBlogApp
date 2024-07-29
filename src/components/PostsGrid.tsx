import { useEffect, useState } from "react";
import { Post } from "./Post";
import Masonry from "react-masonry-css";
import { parseToReadableDate } from "@/lib/utils";
import {
  getPosts,
  getUserFavoritePosts,
  getUserPosts,
} from "@/services/postService";
import { PostSkeleton } from "./PostSkeleton";
import { PostProps, PostsGridProps } from "@/types/interfaces";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const getPostsByType = async (
  type: "default" | "favorites" | "account",
  userID: string,
  limit = 0,
) => {
  switch (type) {
    case "default":
      return await getPosts();
    case "favorites":
      return await getUserFavoritePosts({ userID });
    case "account":
      return await getUserPosts({ userID, limit });
    default:
      return await getPosts();
  }
};

export const PostsGrid = ({
  userID,
  type = "default",
  limit = 0,
}: PostsGridProps) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await getPostsByType(type, userID, limit);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userID, type, limit]);

  return (
    <div className="mt-10 flex w-full flex-grow flex-col items-start justify-start gap-6 px-4">
      {isLoading ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <PostSkeleton key={index} delay={index * 0.3 * Math.random()} />
          ))}
        </Masonry>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map(
            (
              {
                title,
                content,
                $createdAt,
                favoriteTo,
                $id,
                createdBy,
              }: PostProps,
              index: number,
            ) => (
              <Post
                key={$id}
                $id={$id}
                $createdAt={parseToReadableDate(new Date($createdAt))}
                userID={userID}
                title={title}
                favoriteTo={
                  type === "favorites" ? [{ $id: userID }] : favoriteTo
                }
                createdBy={createdBy}
                content={content}
                className="break-inside-avoid"
                delay={index * 0.3 * Math.random()}
              />
            ),
          )}
        </Masonry>
      )}
    </div>
  );
};
