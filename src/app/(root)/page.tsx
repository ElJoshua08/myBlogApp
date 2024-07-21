"use client";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";

export default function Home() {
  const user = useAuthenticatedUser();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start">
      {/* User welcome */}
      <h1
        className={`left-0 top-0 ml-3 mt-3 font-pacifico text-6xl font-normal self-start text-slate-800`}
      >
        Welcome back{" "}
        <span className="relative text-primary-dark inline-flex">
          <Image src={"/LineName.svg"} width={0} height={0} alt="" className="absolute w-56 h-8 left-2 bottom-0 translate-y-6"/> 
          {user?.name}
        </span>
      </h1>
      {/* Latest posts */}
      <div className="mt-10 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Post */}
          <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-md">
            <h3 className="text-xl font-semibold font-roboto">
              How to build a blog with Next.js and Appwrite
            </h3>
            <p className="text-gray-400 font-nunito">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              molestie, nisl vel ultricies mattis, orci neque aliquet nisi, ac
              tincidunt nisi nisl eu nisl. Sed euismod, nisl vel ultricies
              mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu nisl.
              Sed euismod, nisl vel ultricies mattis, orci neque aliquet nisi,
              ac tincidunt nisi nisl eu nisl. Sed euismod, nisl vel ultricies
              mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu nisl.
              Sed euismod, nisl vel ultricies mattis, orci neque aliquet nisi,
              ac tincidunt nisi nisl eu nisl. Sed euismod, nisl vel ultricies
              mattis, orci neque aliquet nisi, ac tincidunt nisi nisl eu nisl.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
