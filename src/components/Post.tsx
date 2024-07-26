"use client";
import Image from "next/image";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export const Post = () => {
  return (
    <div className="flex flex-col rounded-md bg-gray-300/50 p-2 shadow-lg shadow-gray-500/60">
      {/* Post Image */}
      <div className="max-h-26 mb-3 flex w-full items-center justify-center">
        <Image
          width={0}
          height={0}
          src="/logo/logo.svg"
          alt="post image"
          className="max-h-26 w-36 object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="flex flex-col gap-2">
        {/* Post Title */}
        <h3 className="font-roboto text-xl font-semibold">
          How to build a blog with Next.js and Appwrite
        </h3>

        {/* Post Description */}
        <p className="mb-4 font-nunito text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie,
          nisl vel ultricies mattis, orci neque aliquet nisi, ac tincidunt nisi
          nisl eu nisl. Sed euismod, nisl vel ultricies mattis, orci neque
          aliquet nisi, ac tincidunt nisi nisl eu nisl. Sed euismod, nisl vel
          ultricies mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu
          nisl. Sed euismod, nisl vel ultricies mattis, orci neque aliquet nisi,
          ac tincidunt nisi nisl eu nisl. Sed euismod, nisl vel ultricies
          mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu nisl.
        </p>

        {/* Created At and Add to Favorites */}
        <div className="flex items-end justify-between">
          <FavoriteButton />
          <p className="font-nunito font-light text-gray-400">
            Posted on <span className="font-semibold">some date</span>
          </p>
        </div>
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
