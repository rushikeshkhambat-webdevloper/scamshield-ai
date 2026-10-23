import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useLang } from "../context/LanguageContext";

export default function RiskBadge({ verdict, score }) {
  const { t } = useLang();

  const styles = {
    scam: "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-900",
    suspicious:
      "text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900",
    safe: "text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900",
  };

  const label =
    verdict === "scam"
      ? t.verdict.scam
      : verdict === "suspicious"
      ? t.verdict.suspicious
      : t.verdict.safe;

  const Icon = verdict === "safe" ? CheckCircle2 : AlertTriangle;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${styles[verdict]}`}
    >
      <Icon size={16} />
      <span>{label}</span>
      <span className="opacity-60">·</span>
      <span>
        {t.verdict.riskScore} {score}/100
      </span>
    </div>
  );
}