import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

function getSavedTheme() {
  const saved = localStorage.getItem("scamshield_theme");
  if (saved === "dark" || saved === "light") return saved;
  return "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSavedTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("scamshield_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}