import { useState } from "react";
import { ID } from "appwrite";
import { Mic, Loader2 } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { analyzeMessage } from "../lib/detect";
import {
  databases,
  DB_ID,
  CHECKS_COLLECTION,
  ALERTS_COLLECTION,
} from "../lib/appwrite";
import VerdictCard from "../components/VerdictCard";
import useSpeech from "../hooks/useSpeech";

export default function Check() {
  const { t } = useLang();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("text");

  const { listening, transcript, start, stop, supported } = useSpeech();

  const handleAnalyze = async (input) => {
    const content = input ?? text;
    if (!content.trim()) {
      setError(t.check.emptyError);
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await analyzeMessage(content);
      setResult(res);

      try {
        await databases.createDocument(DB_ID, CHECKS_COLLECTION, ID.unique(), {
          userId: user.$id,
          content: content.slice(0, 2000),
          riskScore: res.riskScore,
          verdict: res.verdict,
          reasons: JSON.stringify(res.reasons),
          nextSteps: res.nextSteps,
        });

        if (res.riskScore >= 50) {
          await databases.createDocument(
            DB_ID,
            ALERTS_COLLECTION,
            ID.unique(),
            {
              familyCode: user.$id.slice(0, 6).toUpperCase(),
              message: `Risk ${res.riskScore}: ${res.verdict}`,
              riskScore: res.riskScore,
              createdAt: new Date().toISOString(),
            }
          );
        }
      } catch (e) {
        console.warn("Appwrite save failed:", e);
      }
    } catch (e) {
      setError(e.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (listening) {
      stop();
      if (transcript.trim()) {
        setText(transcript);
        handleAnalyze(transcript);
      }
    } else {
      setMode("voice");
      setText("");
      setResult(null);
      setError("");
      start();
    }
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {t.check.title}
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {t.check.subtitle}
      </p>

      <div className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-sm overflow-hidden">
        <textarea
          value={listening ? transcript : text}
          onChange={(e) => setText(e.target.value)}
          placeholder={listening ? t.check.listening : t.check.placeholder}
          rows={6}
          disabled={listening}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 resize-none break-words"
        />

        {error && (
          <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mt-4 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={handleVoiceToggle}
            disabled={!supported || loading}
            className={`justify-center w-full sm:w-auto inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              listening
                ? "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 hover:bg-red-100"
                : "bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            }`}
          >
            <Mic size={16} />
            {listening ? t.check.stop : t.check.voice}
          </button>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || listening}
            className="justify-center w-full sm:w-auto inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? t.check.analyzing : t.check.analyze}
          </button>
        </div>
      </div>

      {result && <VerdictCard result={result} />}
    </div>
  );
}