import { Client, Account, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const CHECKS_COLLECTION = "6ad0c8680030240f9797";
export const ALERTS_COLLECTION = "6ad0c92a000e8d045f08";