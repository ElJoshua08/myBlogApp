"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaRegComment,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import {
  addFavoritePost,
  createPostComment,
  deleteFavoritePost,
} from "@/services/postService";
import { FavoriteButtonProps, PostProps } from "@/types/interfaces";
import { parseToReadableDate } from "@/lib/utils";

export const Post = ({
  $id,
  $createdAt,
  userID,
  title,
  content,
  createdBy,
  favoriteTo,
  className = "",
  delay = 0,
  showComments = false,
  comments = null,
}: PostProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(
    favoriteTo?.some(({ $id }: any) => $id === userID) || false,
  );
  console.log(comments);

  const [commentValue, setCommentValue] = useState("");

  const userName = createdBy?.name || "Anonymous";

  const handleClick = () => {
    router.push(`/posts/${$id}`);
  };

  const createComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userID) return;

    try {
      await createPostComment({ userID, postID: $id, content: commentValue });
      setCommentValue(""); // Clear input field after successful comment creation
    } catch (error) {
      console.error("Error during comment creation", error);
    }
  };

  return (
    <motion.div
      className={`relative flex cursor-pointer flex-col rounded-md bg-gray-300/50 p-4 shadow-md dark:border-slate-500 dark:bg-slate-700 dark:shadow-none ${className}`}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.8)",
        transition: { duration: 0.15 },
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-slate-300 dark:border-slate-500 dark:bg-slate-600">
          <p className="text-2xl font-bold text-header dark:text-dark-header">
            {userName.charAt(0)}
          </p>
        </div>
        <p className="text-base font-semibold text-header dark:text-dark-header">
          {userName}
        </p>
      </div>

      <h3
        className="text-headersm:text-2xl mb-2 text-xl font-semibold dark:text-dark-header"
        onClick={handleClick}
      >
        {title}
      </h3>

      <p
        className="mb-4 break-words text-paragraph dark:text-dark-paragraph"
        onClick={handleClick}
      >
        {content}
      </p>

      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <FavoriteButton
            postID={$id}
            userID={userID}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
          {!showComments && (
            <FaRegComment
              className="cursor-pointer text-2xl text-gray-400"
              onClick={() => router.push(`/posts/${$id}`)}
            />
          )}
        </div>
        <p className="text-xs font-light text-secondary dark:text-dark-secondary">
          {$createdAt}
        </p>
      </div>

      {showComments && (
        <div className="mt-4 flex flex-col gap-4">
          {comments?.length === 0 ? (
            <div>
              <p className="text-xs font-light text-secondary dark:text-dark-secondary">
                No comments yet, be the first one to comment!
              </p>
              <form onSubmit={createComment} className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="w-full rounded-md border-b-2 border-gray-400 p-2 dark:border-gray-600"
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                />
                <button type="submit">
                  <FaPaperPlane className="text-2xl text-gray-400" />
                </button>
              </form>
            </div>
          ) : (
            <p className="text-xs font-light text-secondary dark:text-dark-secondary">
              {comments?.length} Comments
            </p>
          )}
          {comments?.map((comment: any) => (
            <div key={comment.$id} className="flex flex-col gap-2">
              <p className="text-xs font-light text-secondary dark:text-dark-secondary">
                {parseToReadableDate(new Date(comment.$createdAt))}
              </p>
              <p className="text-base font-semibold text-paragraph dark:text-dark-paragraph">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const FavoriteButton = ({
  postID,
  userID,
  isFavorite,
  setIsFavorite,
}: FavoriteButtonProps) => {
  const handleClick = async () => {
    if (!userID || !postID) return;

    try {
      setIsFavorite(!isFavorite);
      if (isFavorite) {
        await deleteFavoritePost({ userID, postID });
      } else {
        await addFavoritePost({ userID, postID });
      }
    } catch (error) {
      console.error("Error during favorite status update", error);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer text-3xl">
      <AnimatePresence initial={false} mode="wait">
        {isFavorite ? (
          <motion.div
            key="star"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <FaStar className="text-accent" />
          </motion.div>
        ) : (
          <motion.div
            key="regStar"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <FaRegStar className="text-gray-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

