"use server";
import { createAdminClient } from "@/lib/appwrite";
import { AddFavoritePostProps, CreatePostProps, DeleteFavoritePostProps, GetUserFavoritePostsProps } from "@/types/interfaces";
import { ID, Query } from "node-appwrite";

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

export const getUserFavoritePosts = async ({
  userID,
}: GetUserFavoritePostsProps) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("$id", userID)],
    );

    const favoritePosts = user.documents[0]?.favoritePosts;

    return favoritePosts;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};

export const addFavoritePost = async ({
  userID,
  postID,
}: AddFavoritePostProps) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      userID,
    );

    // Exclude system attributes and only include the fields you want to update
    const { favoritePosts } = user;
    const updatedUser = {
      favoritePosts: [...favoritePosts, postID],
    };

    console.log("updated user is:", updatedUser);

    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      userID,
      updatedUser,
    );
  } catch (error) {
    console.error("Error during adding favorite post:", error);
    throw error;
  }
};

export const deleteFavoritePost = async ({
  userID,
  postID,
}: DeleteFavoritePostProps) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      userID,
    );

    // Exclude system attributes and only include the fields you want to update
    const { favoritePosts } = user;
    const updatedUser = {
      favoritePosts: favoritePosts.filter(({ $id }: any) => $id !== postID),
    };

    console.log("updated user is:", updatedUser);

    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      userID,
      updatedUser,
    );
  } catch (error) {
    console.error("Error during deleting favorite post:", error);
    throw error;
  }
};


export const createPost = async ({
  title,
  content,
  userID,
}: CreatePostProps) => {
  try {
    const { database } = await createAdminClient();
    await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!,
      ID.unique(),
      {
        title,
        content,
        createdBy: userID,
      },
      [],
    );
  } catch (error) {
    console.error("Error during creating post:", error);
    throw error;
  }
};

