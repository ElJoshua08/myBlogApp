"use client";
import { useState, useEffect } from "react";
import randomItem from "random-item";

export const PostSkeleton = () => {
  const [postWidth, setPostWidth] = useState("w-full");
  const [titleTextWidths, setTitleTextWidths] = useState<string[]>([]);
  const [contentTextWidths, setContentTextWidths] = useState<string[]>([]);
  const [userNameWidth, setUserNameWidth] = useState("w-1/4");

  useEffect(() => {
    const postWidthOptions = ["w-full", "w-4/5", "w-3/4", "w-2/3"];
    const titleTextWidthOptions = ["w-full", "w-3/4", "w-1/2", "w-2/3"];
    const contentTextWidthOptions = ["w-full", "w-3/4", "w-2/3", "w-3/5"];
    const userNameWidthOptions = ["w-1/4", "w-1/3", "w-1/2"];

    setPostWidth(randomItem(postWidthOptions));
    setTitleTextWidths(
      Array.from({ length: 2 }, () => randomItem(titleTextWidthOptions)),
    );
    setContentTextWidths(
      Array.from({ length: 5 }, () => randomItem(contentTextWidthOptions)),
    );
    setUserNameWidth(randomItem(userNameWidthOptions));
  }, []);

  return (
    <div
      className={`mb-4 flex flex-col rounded-md bg-gray-200 p-4 shadow-md ${postWidth}`}
    >
      {/* Avatar and Username */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-slate-300"></div>
        <div className={`h-6 rounded-md bg-slate-400 ${userNameWidth}`}></div>
      </div>

      {/* Post Title */}
      <div className="mb-4 space-y-2">
        {titleTextWidths.map((width, index) => (
          <div
            key={index}
            className={`h-6 rounded-md bg-slate-400 ${width}`}
          ></div>
        ))}
      </div>

      {/* Post Content */}
      <div className="mb-4 space-y-2">
        {contentTextWidths.map((width, index) => (
          <div
            key={index}
            className={`h-4 rounded-md bg-slate-300 ${width}`}
          ></div>
        ))}
      </div>

      {/* Favorite Button and createdAt */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-28 rounded-md bg-accent"></div>
        <div className="h-5 w-20 rounded-md bg-slate-300"></div>
      </div>
    </div>
  );
};
