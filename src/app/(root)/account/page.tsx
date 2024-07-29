"use client";
import { PostsGrid } from "@/components/PostsGrid";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCheck,
  FaEdit,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function AccountPage() {
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  if (userLoading) {
    return (
      <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      {/* Posts */}
      <section className="relative flex flex-col items-center justify-center gap-2">
        <h1 className={`page-title`}>
          Take a look at your{" "}
          <span className="page-title-accent">
            <Image
              src={"/LineName.svg"}
              width={0}
              height={0}
              alt=""
              className="absolute bottom-0 left-2 h-8 w-56 translate-y-6 select-none"
            />
            Account
          </span>
        </h1>

        <PostsGrid userID={userID} type="account" limit={3} />
        <Link
          href="/account/posts"
          className="relative bottom-0 right-0 mb-5 mr-5 flex items-center justify-center gap-3 text-xl text-accent"
        >
          <span className="inline">See all posts</span>
          <FaArrowRight className="inline-block" />
        </Link>
      </section>
      {/* TODO: Place a fancy separator here */}

      {/* Account settings */}
      <section className="relative flex w-full flex-col items-center justify-center gap-2">
        <h1 className={`page-title`}>
          Here are your{" "}
          <span className="page-title-accent">
            <Image
              src={"/LineName.svg"}
              width={0}
              height={0}
              alt=""
              className="absolute bottom-0 left-2 h-8 w-56 translate-y-6 select-none"
            />
            Settings
          </span>
        </h1>

        <div className="mt-10 flex w-full flex-col items-start justify-start gap-5 px-5">
          {/* Name */}
          <SettingsItem
            label="Username"
            value={user?.name}
            onUpdate={() => {}}
          />
          {/* Update password */}
          <UpdatePasswordItem onUpdate={() => {}} />
        </div>
        {/* Logout button */}
        <Link
          href={"/logout"}
          className="mt-10 flex items-center rounded-md border border-red-400 bg-red-200 px-3 py-1 font-nunito text-2xl uppercase text-slate-700 transition-colors hover:border-red-500 hover:bg-red-300"
        >
          Logout
        </Link>
      </section>
    </main>
  );
}

const SettingsItem = ({
  label,
  value,
  onUpdate,
}: {
  value: string;
  label: string;
  onUpdate: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = () => {
    setIsEditing(false);
    onUpdate();
  };

  const handleClick = () => {
    setIsEditing(!isEditing);
    inputRef.current?.focus();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <p className="font-nunito text-xl font-semibold">{label}</p>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          ref={inputRef}
          className={`rounded-md border-2 border-gray-300/60 px-2 py-1 font-nunito outline-none transition-all ${isEditing ? "hover:border-blue-300 focus:border-blue-300" : "cursor-not-allowed brightness-75"}`}
          value={inputValue}
          onChange={onInputChange}
          disabled={!isEditing}
        />
        {isEditing ? (
          <FaCheck
            className="cursor-pointer text-2xl text-slate-500"
            onClick={handleCheck}
          />
        ) : (
          <FaEdit
            className="cursor-pointer text-2xl text-slate-500"
            onClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

const UpdatePasswordItem = ({ onUpdate }: { onUpdate: () => void }) => {
  const [inputValue, setInputValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <p className="font-nunito text-xl font-semibold">Update Password</p>
      <div className="flex flex-row items-center gap-2">
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            value={inputValue}
            onChange={handleChange}
            className="rounded border-2 border-gray-300/60 p-2 outline-none transition-all hover:border-blue-300 focus:border-blue-300"
            placeholder="New password"
          />
          {isVisible ? (
            <FaEyeSlash
              className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-400"
              onClick={() => setIsVisible(!isVisible)}
            />
          ) : (
            <FaEye
              className="absolute right-2 top-[50%] size-6 translate-y-[-50%] cursor-pointer text-gray-400"
              onClick={() => setIsVisible(!isVisible)}
            />
          )}
        </div>

        <button className="rounded-md bg-accent px-3 py-2 text-xl shadow-lg transition-all hover:shadow-accent/70">
          Update
        </button>
      </div>
    </div>
  );
};
