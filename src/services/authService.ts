"use server"

import { createSessionClient, createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (email: string, password: string) => {
  console.log("Logging in", email, password);

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    
    console.log("Logged in");

    redirect("/")
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

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    redirect("/");
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export const logout = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");
    await account.deleteSession("current");

    console.log("Logged out");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}