"use client";

import { Loading } from "@/components/Loading";
import { Post } from "@/components/Post";
import { useAuthenticatedUser } from "@/hooks/useAuthenticatedUser";
import { getPost } from "@/services/postService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthenticatedUser();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const postID = Array.isArray(params.postID)
    ? params.postID[0]
    : params.postID;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!userLoading && !user) router.push("/login");
    const fetchPost = async () => {
      setIsLoading(true);
      const post = await getPost({ postID });
      setPost(post);
      setIsLoading(false);
    };
    fetchPost();
  }, [router, userLoading, user, postID]);

  return userLoading || isLoading ? (
    <Loading />
  ) : post ? (
    <div>
      <Post
        $id={postID}
        $createdAt={post.$createdAt}
        userID={user.$id}
        title={post.title}
        content={post.content}
        createdBy={post.createdBy}
        favoriteTo={post.favoriteTo}
        className="w-full"
        showComments={true}
        comments={post.comments}
      />
    </div>
  ) : (
    <div>Post not found</div>
  );
}
