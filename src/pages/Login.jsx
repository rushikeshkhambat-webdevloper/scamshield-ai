import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Shield, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { user, login, register } = useAuth();
  const { t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [tab, setTab] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "signin") {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate("/");
    } catch (err) {
      setError(err?.message || t.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-neutral-50 dark:bg-neutral-950 relative">
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        title="Toggle theme"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div className="w-full max-w-md rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 justify-center">
          <Shield className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {t.appName}
          </h1>
        </div>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 text-center">
          {t.tagline}
        </p>

        <div className="mt-6 flex border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 pb-2 text-sm font-medium transition-colors ${
              tab === "signin"
                ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100"
                : "text-neutral-500 dark:text-neutral-400 border-b-2 border-transparent"
            }`}
          >
            {t.login.signIn}
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 pb-2 text-sm font-medium transition-colors ${
              tab === "signup"
                ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100"
                : "text-neutral-500 dark:text-neutral-400 border-b-2 border-transparent"
            }`}
          >
            {t.login.signUp}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {tab === "signup" && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t.login.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t.login.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t.login.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 py-2.5 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading
              ? t.login.loading
              : tab === "signin"
              ? t.login.signIn
              : t.login.signUp}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {tab === "signin" ? t.login.noAccount : t.login.haveAccount}{" "}
          <button
            onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
            className="text-neutral-900 dark:text-neutral-100 font-medium hover:underline"
          >
            {tab === "signin" ? t.login.signUp : t.login.signIn}
          </button>
        </p>
      </div>
    </div>
  );
}