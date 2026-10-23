import { en } from "./en";
import { mr } from "./mr";
import { hi } from "./hi";

export const dicts = { en, mr, hi };

export function getSavedLang() {
  const saved = localStorage.getItem("scamshield_lang");
  if (saved === "mr" || saved === "hi") return saved;
  return "en";
}