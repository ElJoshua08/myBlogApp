"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Post = ({
  title,
  content,
  createdAt,
  favoritesCount,
}: PostProps) => {
  return (
    <div className="relative flex max-w-80 flex-col items-start justify-start gap-1 rounded-md bg-gray-300/50 p-4 shadow-lg shadow-gray-500/60 overflow-hidden">
      {/* Post Title */}
      <h3 className="font-roboto text-2xl font-semibold">{title}</h3>

      {/* Post Content */}
      <p className="mb-4 break-words font-nunito text-gray-500">{content}</p>

      {/* Created At and Add to Favorites */}
      <div className="absolute pb-4 bottom-0 flex items-end justify-between">
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
}
