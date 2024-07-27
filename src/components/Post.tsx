"use client";
import { addFavoritePost } from "@/services/postService";
import { useMemo, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export const Post = ({
  id,
  userID,
  title,
  content,
  createdAt,
  favoriteTo,
  className,
  delay = 0,
}: PostProps) => {
  const [isFavorite, setIsfavorite] = useState(favoriteTo.some(({ $id }: any) => $id === userID)) 

  return (
    <motion.div
      className={`relative flex flex-grow flex-col items-start justify-start overflow-hidden rounded-md bg-gray-300/50 shadow-md shadow-gray-400/60 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-grow flex-col items-start justify-start p-4">
        {/* Post Title */}
        <h3 className="mb-2 font-roboto text-xl font-semibold leading-tight sm:text-2xl">
          {title}
        </h3>
        {/* Post Content */}
        <p className="mb-4 break-words font-nunito leading-snug tracking-wide text-gray-600 sm:text-lg sm:leading-none">
          {content}
        </p>
      </div>

      {/* Created At and Add to Favorites */}
      <div className="mb-2 flex w-full items-end justify-between px-2">
        <FavoriteButton postID={id} isFavorite={isFavorite} setIsfavorite={setIsfavorite} userID={userID} />
        <p className="font-nunito text-xs font-light text-gray-400 sm:text-sm">
          {createdAt}
        </p>
      </div>
    </motion.div>
  );
};

const FavoriteButton = ({
  postID,
  userID,
  isFavorite,
  setIsfavorite
}: FavoriteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!userID || !postID) return;

    try {
      setIsLoading(true);
      await addFavoritePost({ userID, postID });
      setIsfavorite(!isFavorite);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-md px-3 py-2 font-nunito text-sm font-semibold transition-all sm:text-base ${
        isFavorite ? "bg-primary-dark text-white" : "bg-accent text-gray-700"
      } ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      {isFavorite ? "Favorite" : "Add to Favorites"}
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );
};

interface PostProps {
  id: string;
  userID: string;
  title: string;
  content: string;
  createdAt: string;
  favoriteTo: Array<object>;
  className?: string;
  delay?: number;
}

interface FavoriteButtonProps {
  postID: string;
  isFavorite: boolean;
  userID: string;
  setIsfavorite: (isFavorite: boolean) => void;
}
