import { ID } from "appwrite";
import { account } from "./appwrite";

export async function signUp(email, password, name) {
  await account.create(ID.unique(), email, password, name);
  return account.createEmailPasswordSession(email, password);
}

export async function signIn(email, password) {
  return account.createEmailPasswordSession(email, password);
}

export async function signOut() {
  return account.deleteSession("current");
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}