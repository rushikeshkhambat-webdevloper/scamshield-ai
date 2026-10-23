import RiskBadge from "./RiskBadge";
import { useLang } from "../context/LanguageContext";

export default function VerdictCard({ result }) {
  const { t } = useLang();

  if (!result) return null;

  const bg = {
    scam: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900",
    suspicious:
      "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
    safe: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
  }[result.verdict];

  return (
    <div className={`mt-6 rounded-xl border p-6 ${bg}`}>
      <RiskBadge verdict={result.verdict} score={result.riskScore} />

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {t.verdict.why}
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-300 list-disc list-inside">
          {result.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {t.verdict.nextSteps}
        </h3>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          {result.nextSteps}
        </p>
      </div>

      {result.verdict === "scam" && (
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          {t.verdict.reportTo1930}
        </a>
      )}
    </div>
  );
}