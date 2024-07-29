"use client";
import { PostsGrid } from "@/components/PostsGrid";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

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
      <section className="relative flex flex-col items-center justify-center gap-2 w-full">
        <h1 className={`page-title`}>
          Here are your {" "}
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

        <Link href={"/logout"}>
          Logout
        </Link>
      </section>
    </main>
  );
}
