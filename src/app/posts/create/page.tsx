"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import { postSchema } from "@/schemas/postSchema";
import { createPost } from "@/services/postService";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import ActionButton from "@/components/ActionButton";
import Link from "next/link";

type CreatePostFormInputs = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const user = useAuthenticatedUser();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    console.log("no user detected")
  }

  const {
    register: formCreatePost,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormInputs>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: CreatePostFormInputs) => {
    const { title, content } = data;

    try {
      const userID = user.$id;
      console.log("userID", userID);
      setIsLoading(true);
      await createPost({ title, content, userID });
      router.push("/");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return user ? (
    <div className="flex w-full flex-grow flex-col items-center justify-center">
      <h1 className="header mb-5">Create Post</h1>

      <form
        className="flex w-72 flex-col gap-6 rounded-md bg-slate-300/30 px-6 py-5 backdrop-blur-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Post Title"
          {...formCreatePost("title")}
          className="rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          placeholder="Your awesome content"
          {...formCreatePost("content")}
          className="rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className={`flex items-center justify-center gap-5 rounded bg-blue-500 p-2 text-lg text-white shadow-lg shadow-transparent transition-all hover:shadow-blue-500/70 ${isLoading ? "opacity-50" : ""}`}
          disabled={isLoading}
        >
          Post!
          {isLoading && <FaSpinner className="animate-spin" />}
        </button>
      </form>

      <Link
        href="/"
        className="mt-5 items-start font-nunito text-sm text-gray-400 hover:text-blue-500 text-left"
      >
        Return to home
      </Link>
    </div>
  ) : (
    <div>
      <h1>Please login before creating a post</h1>
      <ActionButton onClick={() => router.push("/login")} className="mt-5">
        Login
      </ActionButton>
    </div>
  );
}
