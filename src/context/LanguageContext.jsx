import { createContext, useContext, useState } from "react";
import { dicts, getSavedLang } from "../i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getSavedLang());

  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem("scamshield_lang", l);
    } catch {
      // ignore storage errors
    }
  };

  const value = { lang, setLang, t: dicts[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}