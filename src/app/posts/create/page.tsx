"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import { postSchema } from "@/schemas/postSchema";
import { createPost } from "@/services/postService";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import ActionButton from "@/components/ActionButton";

type CreatePostFormInputs = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const { user, loading } = useAuthenticatedUser();
  const router = useRouter();

  const userID = useMemo(() => user?.$id, [user]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const {
    register: formCreatePost,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormInputs>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async ({ title, content }: CreatePostFormInputs) => {
    try {
      setIsLoading(true);
      await createPost({ title, content, userID });
      router.push("/");
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return loading ? (
    <div className="flex h-full w-full items-center justify-center">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  ) : (
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
        <ActionButton
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          className={`mt-5 ${isLoading ? "opacity-50" : ""}`}
        >
          Post!
          {isLoading && <FaSpinner className="animate-spin" />}
        </ActionButton>
      </form>

      <Link
        href="/"
        className="mt-5 font-nunito text-sm text-gray-400 hover:text-blue-500"
      >
        Return to home
      </Link>
    </div>
  );
}
