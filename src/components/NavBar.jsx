import { NavLink } from "react-router-dom";
import { Shield, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import LanguageToggle from "./LanguageToggle";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${
      isActive
        ? "text-neutral-900 dark:text-neutral-100 font-medium"
        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
    }`;

  const handleSignOut = async () => {
    try {
      await logout();
    } catch {}
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <Shield className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 hidden sm:inline">
              {t.appName}
            </span>
          </div>
          <nav className="flex items-center gap-3 sm:gap-4">
            <NavLink to="/" end className={linkClass}>
              {t.nav.check}
            </NavLink>
            <NavLink to="/family" className={linkClass}>
              {t.nav.family}
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <LanguageToggle />
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            title={t.nav.signOut}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}