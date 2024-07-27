"use server";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const getPosts = async () => {
  try {
    const { database } = await createAdminClient();
    const posts = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
      [],
    );

    console.log("posts", posts);

    return posts?.documents;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};

export const createPost = async ({title, content, userID}: CreatePostProps) => {
  try {

    console.log("creating post", title, content);
    const { database } = await createAdminClient();
    const post = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
      ID.unique(),
      {
        postName: title,
        postContent: content,
        users: userID,
      },
      [],
    );

    return post;
  } catch (error) {
    console.error("Error during creating post:", error);
    throw error;
  }
};

interface CreatePostProps {
  title: string;
  content: string;
  userID: string;
}