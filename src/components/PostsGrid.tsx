import { useState } from "react";
import { Post } from "./Post";
import Masonry from "react-masonry-css";
import { parseToReadableDate } from "@/lib/utils";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};


export const PostsGrid = ({ posts, isLoading, userID, isFavorites=false }: PostsGridProps) => {

  return (
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
                id={$id}
                userID={userID}
                title={title}
                favoriteTo={isFavorites ?  [{ $id: userID }] : favoriteTo}
                createdBy={createdBy}
                content={content}
                createdAt={parseToReadableDate(new Date($createdAt))}
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

interface PostsGridProps {
  posts: Array<PostProps>;
  isLoading: boolean;
  userID: string;
  isFavorites?: boolean;
}

interface PostProps {
  $id: string;
  $createdAt: string;
  title: string;
  content: string;
  favoriteTo: Array<object>;
  createdBy: object;
}
