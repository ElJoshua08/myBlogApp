"use server";

import { createSessionClient, createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { LoginProps, RegisterProps } from "@/types/interfaces";

export const login = async ({ email, password }: LoginProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("authData-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async ({ name, email, password }: RegisterProps) => {
  try {
    const { account, database } = await createAdminClient();

    const user = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      user.$id,
      {
        name,
        email,
      },
      [],
    );

    cookies().set("authData-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("authData-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
};

export const updateUsername = async (name: string) => {
  try {
    const { account } = await createSessionClient();
    const { database } = await createAdminClient();
    const user = await account.updateName(name);

    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      user.$id,
      {
        name,
      },
      [],
    );
  } catch (error) {
    console.error("Error during update name:", error);
    throw error;
  }
};

export const updatePassword = async (password: string) => {
  try {
    const { account } = await createSessionClient();
    await account.updatePassword(password);
  } catch (error) {
    console.error("Error during update password:", error);
    throw error;
  }
};
