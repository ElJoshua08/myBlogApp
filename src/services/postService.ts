"use server";

import { CreatePostCommentProps, GetPostProps, GetUserPostsProps } from "@/types/interfaces";
import { createAdminClient } from "@/lib/appwrite";
import {
  AddFavoritePostProps,
  CreatePostProps,
  DeleteFavoritePostProps,
  GetUserFavoritePostsProps,
} from "@/types/interfaces";
import { ID } from "node-appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const POSTS_COLLECTION_ID = process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!;
const COMMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_COMMENTS_COLLECTION_ID!;

export const getPosts = async () => {
  try {
    const { database } = await createAdminClient();
    const posts = await database.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      [],
    );

    return posts?.documents;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};

export const getUserPosts = async ({
  userID,
  limit = 0,
}: GetUserPostsProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userID,
    );

    return user?.createdPosts.slice(0, limit);
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
    const user = await database.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userID,
    );

    const favoritePosts = user?.favoritePosts;

    return favoritePosts;
  } catch (error) {
    console.error("Error during fetching posts:", error);
    throw error;
  }
};

export const getPost = async ({ postID }: GetPostProps) => {
  try {
    
    const { database } = await createAdminClient();
    const post = await database.getDocument(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      postID,
    );

    return post;
  } catch (error) {
    console.error("Error during fetching post:", error);
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
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userID,
    );

    // Exclude system attributes and only include the fields you want to update
    const { favoritePosts } = user;
    const updatedUser = {
      favoritePosts: [...favoritePosts, postID],
    };

    await database.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
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
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userID,
    );

    // Exclude system attributes and only include the fields you want to update
    const { favoritePosts } = user;
    const updatedUser = {
      favoritePosts: favoritePosts.filter(({ $id }: any) => $id !== postID),
    };

    await database.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
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
      DATABASE_ID,
      POSTS_COLLECTION_ID,
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

export const createPostComment = async ({
  userID,
  postID,
  content,
}: CreatePostCommentProps) => {
  try {
    console.log("creating comment")

  const { database } = await createAdminClient();
  const comment = await database.createDocument(
    DATABASE_ID,
    COMMENTS_COLLECTION_ID,
    ID.unique(),
    {
      content,
      createdBy: userID,
      commentedOnPost: postID,
    },
    [],
    );
      console.log(comment);

} catch (error) {
  console.error("Error during creating post comment:", error);
  throw error;
}}