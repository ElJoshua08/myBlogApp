"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSessionClient, createAdminClient } from "@/lib/appwrite";
import {
  LoginProps,
  RecoverPasswordProps,
  RegisterProps,
} from "@/types/interfaces";
import { cookies } from "next/headers";
import { ID, Query, OAuthProvider } from "node-appwrite";

export const login = async ({ email, password }: LoginProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("auth-session", session.secret, {
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

export async function loginWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/register`,
  );

  return redirect(redirectUrl);
}

export const register = async ({ name, email, password }: RegisterProps) => {
  try {
    const { account } = await createSessionClient();
    const { database } = await createAdminClient();

    const user = await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("auth-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

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
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { account } = await createAdminClient();

    cookies().delete("auth-session");
    await account.deleteSession("current");

  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

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

export const sendResetPasswordEmail = async (email: string) => {
  try {
    const { database, account } = await createAdminClient();

    const user = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", email)],
    );

    const isUser = user.documents.length > 0;

    if (!isUser) {
      throw new Error("User not found");
    }

    // Usa la variable de entorno para determinar la URL base
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetPasswordUrl = `${baseUrl}/forgot-password`;

    await account.createRecovery(email, resetPasswordUrl);
  } catch (error) {
    console.error("Error during send reset password email:", error);
    throw error;
  }
};

export const recoverPassword = async ({
  userId,
  secret,
  password,
}: RecoverPasswordProps) => {
  const { account } = await createAdminClient();

  try {
    await account.updateRecovery(userId, secret, password);
  } catch (error) {
    console.error("Error during recover password:", error);
    throw error;
  }
};
