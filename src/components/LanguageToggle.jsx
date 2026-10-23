import { useLang } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-0.5">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          lang === "en"
            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          lang === "hi"
            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        }`}
      >
        हिंदी
      </button>
      <button
        onClick={() => setLang("mr")}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
          lang === "mr"
            ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
        }`}
      >
        मराठी
      </button>
    </div>
  );
}