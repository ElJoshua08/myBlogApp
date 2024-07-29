"use client";
import { useState } from "react";
import randomItem from "random-item";
import { motion } from "framer-motion";
import { PostSkeletonProps } from "@/types/interfaces";

export const PostSkeleton = ({ delay = 0 }: PostSkeletonProps) => {
  const usernameOptions = ["Nombre", "Nombre corto", "Nombre larguito"];

  const [userName, setUserName] = useState(randomItem(usernameOptions));

  const titleOptions = [
    "Este es un post mas largo para ver su comportamiento",
    "Este para ver su comportamiento",
    "The Art of Mindful Living",
    "Exploring the Wonders of the Universe",
  ];

  const [title, setTitle] = useState(randomItem(titleOptions));

  const contentOptions = [
    "The universe is vast and full of mysteries waiting to be uncovered. From the birth of stars to the possibility of alien life, each discovery brings us closer to understanding our place in the cosmos. Let's embark on a journey through the stars and uncover the secrets of the universe.",
    "El texto del post a ver como queda",
    "El texto del post a ver como queda",
    "El texto del post a ver como queda",
  ];

  const [content, setContent] = useState(randomItem(contentOptions));

  return (
    <motion.div
      className={`relative flex flex-grow flex-col items-start justify-start overflow-hidden rounded-md bg-gray-300/50 shadow-md shadow-gray-400/60`}
      initial={{ scale: 0.75, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="flex flex-grow flex-col items-start justify-start p-4">
        {/* Avartar and Username */}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-300"></div>
          <p className="rounded-md bg-slate-400 px-2 py-1 font-nunito text-base font-semibold leading-tight text-transparent">
            {userName}
          </p>
        </div>
        {/* Post Title */}
        <h3 className="mb-2 rounded-md bg-slate-500 p-2 font-roboto text-xl font-semibold leading-tight text-transparent sm:text-2xl">
          {title}
        </h3>
        {/* Post Content */}
        <p className="mb-4 break-words rounded-md bg-slate-300 p-2 font-nunito leading-snug tracking-wide text-transparent sm:text-lg sm:leading-none">
          {content}
        </p>

        <div className="mb-2 flex w-full items-end justify-between px-2">
          <span className="h-10 w-28 rounded-md bg-accent"></span>
          <p className="rounded-mdsm:text-sm rounded-md bg-slate-300 font-nunito text-xs font-light text-transparent">
            Una fecha tiene que ser
          </p>
        </div>
      </div>
    </motion.div>
  );
};
