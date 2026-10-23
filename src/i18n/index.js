import en from "./en";
import mr from "./mr";

export const dicts = { en, mr };

export function getSavedLang() {
  try {
    const saved = localStorage.getItem("scamshield_lang");
    return saved === "mr" ? "mr" : "en";
  } catch {
    return "en";
  }
}