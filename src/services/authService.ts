"use server";

import { createSessionClient, createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";

export const login = async (email: string, password: string) => {
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

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

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

    console.log("Logged out");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}