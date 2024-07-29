"use client";
import { addFavoritePost, deleteFavoritePost } from "@/services/postService";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { FavoriteButtonProps, PostProps } from "@/types/interfaces";

export const Post = ({
  $id,
  $createdAt,
  userID,
  title,
  content,
  createdBy,
  favoriteTo,
  className,
  delay = 0,
}: PostProps) => {
  const [isFavorite, setIsfavorite] = useState(
    favoriteTo.some(({ $id }: any) => $id === userID),
  );
  const userName = createdBy?.name || "Anonymous";

  return (
    <motion.div
      className={`relative flex flex-grow flex-col items-start justify-start overflow-hidden rounded-md bg-gray-300/50 dark:bg-slate-700 dark:border-slate-500 dark:border-2 dark:shadow-none shadow-md shadow-gray-400/60 ${className}`}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-grow flex-col items-start justify-start p-4">
        {/* Avartar and Username */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full border border-slate-400 bg-slate-300 dark:bg-slate-600 dark:border-2 dark:border-slate-500">
            {/* TODO: get username initials */}
            <p className="font-nunito text-2xl font-bold text-slate-700 dark:text-white">
              {userName.slice(0, 1)}
            </p>
          </div>
          <p className="font-nunito text-base font-semibold leading-tight text-slate-700 dark:text-slate-300">
            {userName}
          </p>
        </div>
        {/* Post Title */}
        <h3 className="mb-2 font-roboto text-xl font-semibold leading-tight sm:text-2xl text-slate-800 dark:text-white">
          {title}
        </h3>
        {/* Post Content */}
        <p className="mb-4 break-words font-nunito leading-snug tracking-wide text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-none">
          {content}
        </p>
      </div>

      {/* Created At and Add to Favorites */}
      <div className="mb-2 flex w-full items-end justify-between px-2">
        <FavoriteButton
          postID={$id}
          isFavorite={isFavorite}
          setIsfavorite={setIsfavorite}
          userID={userID}
        />
        <p className="font-nunito text-xs font-light text-gray-400 sm:text-sm">
          {$createdAt}
        </p>
      </div>
    </motion.div>
  );
};

const FavoriteButton = ({
  postID,
  userID,
  isFavorite,
  setIsfavorite,
}: FavoriteButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!userID || !postID) return;

    if (isFavorite) {
      try {
        setIsLoading(true);
        setIsfavorite(false);
        await deleteFavoritePost({ userID, postID });
      } catch (error) {
        console.error("Failed to delete favorite status:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        setIsfavorite(true);
        await addFavoritePost({ userID, postID });
      } catch (error) {
        console.error("Failed to update favorite status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-md px-3 py-2 font-nunito text-sm font-semibold transition-all sm:text-base ${
        isFavorite ? "bg-primary-dark text-white" : "bg-accent text-gray-700"
      }`}
      disabled={isLoading}
    >
      {isFavorite ? "Favorite" : "Add to Favorites"}
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );
};
