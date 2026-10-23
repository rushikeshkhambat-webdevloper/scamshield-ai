import { useState, useEffect } from "react";
import { Copy, Check, Users } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import useRealtime from "../hooks/useRealtime";
import AlertToast from "../components/AlertToast";

export default function Family() {
  const { t } = useLang();
  const { user } = useAuth();
  const alerts = useRealtime();
  const [copied, setCopied] = useState(false);
  const [latest, setLatest] = useState(null);

  const code = user?.$id?.slice(0, 6).toUpperCase() || "";

  useEffect(() => {
    if (alerts.length > 0) setLatest(alerts[0]);
  }, [alerts]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {t.family.title}
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {t.family.subtitle}
      </p>

      <div className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-sm">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {t.family.yourCode}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 px-3 py-2">
          <span className="font-mono text-base sm:text-lg tracking-widest text-neutral-900 dark:text-neutral-100 truncate">
            {code}
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shrink-0"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="hidden sm:inline">
              {copied ? t.family.copied : t.family.copy}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {t.family.alerts}
        </h2>

        {alerts.length === 0 ? (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-sm">
            <Users size={18} className="text-neutral-400 shrink-0" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t.family.noAlerts}
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            {alerts.map((a) => (
              <div
                key={a.$id}
                className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4"
              >
                <p className="text-sm font-semibold text-red-800 dark:text-red-400">
                  {t.family.alertFrom} {a.familyCode}
                </p>
                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 break-words">
                  {a.message}
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(a.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertToast alert={latest} />
    </div>
  );
}