import {
  Client as AppwriteClient,
  Account,
  Databases,
  ID,
  Query,
  OAuthProvider,
} from "appwrite";
import { Client as NodeAppwriteClient } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new NodeAppwriteClient()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("authData-session");

  if (!session || !session.value) {
    console.error("No session detected");
    throw new Error("No session found. User may not be authenticated.");
  }

  client.setSession(session.value);

  return {
    account: new Account(client as any),
  };
}

export async function createAdminClient() {
  const client = new NodeAppwriteClient()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY!);

  return {
    account: new Account(client as any),
    database: new Databases(client as any), 
  };
}

export { ID, Query, OAuthProvider };
