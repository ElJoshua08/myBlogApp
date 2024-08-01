"use client";
import { PostsGrid } from "@/components/PostsGrid";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Line } from "@/components/Line";
import { Loading } from "@/components/Loading";

export default function AccountPage() {
  const { user, loading: userLoading } = useAuthenticatedUser();
  const userID = useMemo(() => user?.$id, [user]);
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  return userLoading ? (
    <Loading />
  ) : (
    <main className="relative flex flex-grow flex-col items-center justify-start pb-5">
      {/* Posts */}
      <section className="relative flex flex-col items-center justify-center gap-2">
        <h1 className={`page-title`}>
          Take a look at your{" "}
          <span className="page-title-accent">
            <Line className="absolute top-full h-full w-full" />
            Posts
          </span>
        </h1>

        <PostsGrid userID={userID} type="account" limit={0} />
        <Link
          href="/account"
          className="relative bottom-0 right-0 mb-5 mr-5 flex items-center justify-center gap-3 text-xl text-accent"
        >
          <span className="inline">Go to your account</span>
          <FaArrowRight className="inline-block" />
        </Link>
      </section>
    </main>
  );
}
