"use server";
import { createAdminClient } from "@/lib/appwrite";

export const getPosts = async () => {
  try {
    const { database } = await createAdminClient();
    const posts = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
      [],
    );

    return posts?.documents;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};
