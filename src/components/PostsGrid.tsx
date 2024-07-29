import { useEffect, useState } from "react";
import { Post } from "./Post";
import Masonry from "react-masonry-css";
import { parseToReadableDate } from "@/lib/utils";
import { getPosts, getUserFavoritePosts } from "@/services/postService";
import { PostSkeleton } from "./PostSkeleton";
import { PostProps, PostsGridProps } from "@/types/interfaces";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export const PostsGrid = ({ userID, isFavorites = false }: PostsGridProps) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("fetching posts", userID);
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = isFavorites
          ? await getUserFavoritePosts({ userID })
          : await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userID, isFavorites]);

  return (
    <div className="mt-10 flex w-full flex-grow flex-col items-start justify-start gap-6 px-4">
      {isLoading ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <PostSkeleton key={index} />
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
                favoriteTo={isFavorites ? [{ $id: userID }] : favoriteTo}
                createdBy={createdBy}
                content={content}
                className="break-inside-avoid"
                delay={index * 0.1}
              />
            ),
          )}
        </Masonry>
      )}
    </div>
  );
};
