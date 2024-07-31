"use client";
import { PostsGrid } from "@/components/PostsGrid";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaSpinner } from "react-icons/fa";
import { updatePassword, updateUsername } from "@/services/authService";
import { StylizedInput } from "@/components/StylizedInput";
import ActionButton from "@/components/ActionButton";
import { Line } from "@/components/Line";

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
      // Make and spinner
      <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-semibold">Loading...</h1>
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      {/* Posts */}
      <section className="flex w-full flex-col justify-start items-center gap-2">
        <h1 className={`page-title self-center`}>
          Take a look at your{" "}
          <span className="page-title-accent">
            <Line className="absolute top-full h-full w-full" />
            Account
          </span>
        </h1>

        <PostsGrid userID={userID} type="account" limit={3} />

        <Link
          href="/account/posts"
          className="relative bottom-0 right-0 mb-5 mr-5 flex items-center justify-center gap-3 text-xl text-accent"
        >
          <span className="inline">See all your posts</span>
          <FaArrowRight className="inline-block" />
        </Link>
      </section>
      {/* TODO: Place a fancy separator here */}

      {/* Account settings */}
      <section className="relative flex w-full flex-col items-center justify-center gap-2">
        <h1 className={`page-title`}>
          Here are your{" "}
          <span className="page-title-accent">
            <Line className="absolute top-full h-full w-full" />
            Settings
          </span>
        </h1>

        <div className="mt-10 flex w-full flex-col items-start justify-start gap-5 px-5">
          {/* Name */}
          <SettingsItem
            label="Username"
            value={user?.name}
            onUpdate={updateUsername}
          />
          {/* Update password */}
          <SettingsItem
            isPassword
            label="Update Password"
            value=""
            onUpdate={updatePassword}
          />
        </div>
        {/* Logout button */}
        <ActionButton
          variant="error"
          onClick={() => {
            router.push("/logout");
          }}
          className="!px-3 !text-2xl !mt-10"
        >
          Logout
        </ActionButton>
      </section>
    </main>
  );
}

const SettingsItem = ({
  label,
  value,
  onUpdate,
  isPassword = false,
}: {
  value: string;
  label: string;
  onUpdate: (value: string) => Promise<void>;
  isPassword?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(inputValue === value);
  }, [inputValue, value]);

  const handleUpdate = async () => {
    setIsLoading(true);
    await onUpdate(inputValue);
    setIsLoading(false);
    setIsDisabled(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <p className="font-nunito text-xl font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </p>
      <div className="flex items-center justify-center gap-2">
        <StylizedInput
          type={isPassword ? "password" : "text"}
          value={inputValue}
          onChange={onInputChange}
          variant="ghost"
        />

        <ActionButton
          className="text-xl"
          onClick={handleUpdate}
          disabled={isLoading || isDisabled}
        >
          Update
          {isLoading && <FaSpinner className="animate-spin" />}
        </ActionButton>
      </div>
    </div>
  );
};
