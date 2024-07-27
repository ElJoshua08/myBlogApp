"use client";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Post = ({
  title,
  content,
  createdAt,
  favoritesCount,
  className,
}: PostProps) => {
  return (
    <div className="relative flex flex-col items-start justify-start gap-1 overflow-hidden rounded-md bg-gray-300/50 shadow-md shadow-gray-400/60 flex-grow">
      <div className="flex flex-grow flex-col items-start justify-start gap-1 p-4">
        {/* Post Title */}
        <h3 className="font-roboto text-2xl font-semibold">{title}</h3>
        {/* Post Content */}
        <p className="mb-4 break-words font-nunito text-gray-500">{content}</p>
      </div>

      {/* Created At and Add to Favorites */}
      <div className="px-2 mb-2 flex w-full items-end justify-between">
        <FavoriteButton />
        <p className="font-nunito font-light text-gray-400">{createdAt}</p>
      </div>
    </div>
  );
};

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-md px-4 py-2 font-nunito font-semibold ${isFavorite ? "bg-primary-dark text-white" : "bg-accent text-gray-700"} transition-all`}
    >
      {isFavorite ? "Favorite" : "Add to Favorites"}
      {isFavorite ? <FaStar /> : <FaRegStar />}
    </button>
  );
};

interface PostProps {
  title: string;
  content: string;
  createdAt: string;
  favoritesCount: number;
  className?: string;
}
