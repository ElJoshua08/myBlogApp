"use client";
import { addFavoritePost, deleteFavoritePost } from "@/services/postService";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { FavoriteButtonProps, PostProps } from "@/types/interfaces";
import ActionButton from "./ActionButton";

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
  const userName = createdBy?.name
    ? createdBy.name
    : createdBy
      ? createdBy
      : "Anonymous";

  return (
    <motion.div
      className={`relative flex flex-grow flex-col items-start justify-start overflow-hidden rounded-md bg-gray-300/50 p-4 shadow-md shadow-gray-400/60 dark:border-2 dark:border-slate-500 dark:bg-slate-700 dark:shadow-none ${className}`}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Avartar and Username */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-full border border-slate-400 bg-slate-300 dark:border-2 dark:border-slate-500 dark:bg-slate-600">
          {/* TODO: get username initials */}
          <p className="font-nunito text-2xl font-bold text-header dark:text-dark-header">
            {userName.slice(0, 1)}
          </p>
        </div>
        <p className="font-nunito text-base font-semibold leading-tight text-header dark:text-dark-header">
          {userName}
        </p>
      </div>
      {/* Post Title */}
      <h3 className="text-headersm:text-2xl mb-2 font-roboto text-xl font-semibold leading-tight dark:text-dark-header">
        {title}
      </h3>
      {/* Post Content */}
      <p className="mb-4 break-words font-nunito leading-snug tracking-wide text-paragraph sm:text-lg sm:leading-none dark:text-dark-paragraph">
        {content}
      </p>

      {/* Created At and Add to Favorites */}
      <div className="flex w-full items-end justify-between">
        <FavoriteButton
          postID={$id}
          isFavorite={isFavorite}
          setIsfavorite={setIsfavorite}
          userID={userID}
        />
        <p className="font-nunito text-xs font-light text-secondary sm:text-sm dark:text-dark-secondary">
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
  const handleClick = async () => {
    if (!userID || !postID) return;

    try {
      {
        setIsfavorite(!isFavorite);
        isFavorite
          ? await deleteFavoritePost({ userID, postID })
          : await addFavoritePost({ userID, postID });
      }
    } catch (error) {
      console.error("Error during favorite status update", error);
    }
  };

  return (
    <ActionButton
      onClick={handleClick}
      variant={isFavorite ? "primary" : "accent"}
      className="!px-3 !text-base sm:text-xl"
    >
      {isFavorite ? "Favorite" : "Add to Favorites"}
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </ActionButton>
  );
};
