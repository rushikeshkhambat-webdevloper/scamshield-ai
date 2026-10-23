const URGENCY = [
  "immediately",
  "24 hours",
  "urgent",
  "blocked",
  "suspend",
  "last warning",
  "within 24",
  "final notice",
];

const SCAM_WORDS = [
  "digital arrest",
  "cbi",
  "safe account",
  "kyc",
  "lottery",
  "refund",
  "parcel",
  "customs",
  "police",
  "arrest warrant",
  "trai",
  "rbi",
  "aadhaar",
  "verify",
  "link your",
  "won ",
  "prize",
];

const SHORTENERS = ["bit.ly", "tinyurl", "t.co", "goo.gl", "ow.ly", "is.gd"];
const BANK_LOOKALIKE = /(sbi|hdfc|icici|axis|kotak|paytm|phonepe|gpay)[-_.]/i;
const UPI_RE = /[a-zA-Z0-9.\-_]{2,}@(ybl|paytm|oksbi|okhdfcbank|okaxis|upi)/i;
const URL_RE = /https?:\/\/[^\s]+/gi;

function ruleScan(text) {
  const lower = text.toLowerCase();
  const reasons = [];
  let score = 0;

  // urgency
  for (const w of URGENCY) {
    if (lower.includes(w)) {
      score += 12;
      reasons.push(`Urgency language: "${w}"`);
      break;
    }
  }

  // scam keywords
  let scamHits = 0;
  for (const w of SCAM_WORDS) {
    if (lower.includes(w)) {
      scamHits++;
      if (scamHits <= 2) reasons.push(`Known scam pattern: "${w}"`);
    }
  }
  score += Math.min(scamHits * 15, 45);

  // URLs
  const urls = text.match(URL_RE) || [];
  for (const u of urls) {
    if (u.startsWith("http://")) {
      score += 10;
      reasons.push("Insecure link (http://)");
    }
    if (SHORTENERS.some((s) => u.includes(s))) {
      score += 15;
      reasons.push("Shortened link hides destination");
    }
    if (BANK_LOOKALIKE.test(u)) {
      score += 20;
      reasons.push("Lookalike bank domain");
    }
  }

  // UPI
  if (UPI_RE.test(text)) {
    score += 10;
    reasons.push("Contains UPI ID (verify before paying)");
  }

  score = Math.min(score, 100);

  return { score, reasons };
}

function verdictFromScore(s) {
  if (s >= 70) return "scam";
  if (s >= 35) return "suspicious";
  return "safe";
}

const SYSTEM_PROMPT = `You are ScamShield, an expert fraud analyst for India. Analyze the user's message and respond ONLY with valid JSON, no markdown, no backticks: {"riskScore": 0-100, "verdict": "safe"|"suspicious"|"scam", "reasons": ["reason1", "reason2", "reason3"], "nextSteps": "one short sentence telling user what to do, reference 1930 or cybercrime.gov.in if scam"}. Consider Indian context: TRAI, RBI, CBI, UPI, KYC, Aadhaar, digital arrest scams, fake courier scams.`;

export async function analyzeMessage(text) {
  const rule = ruleScan(text);
  let llmScore = rule.score;
  let llmReasons = [];
  let nextSteps =
    "If you suspect fraud, report to 1930 or visit cybercrime.gov.in";

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
        temperature: 0.2,
      }),
    });

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content || "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    if (typeof parsed.riskScore === "number") llmScore = parsed.riskScore;
    if (Array.isArray(parsed.reasons)) llmReasons = parsed.reasons;
    if (parsed.nextSteps) nextSteps = parsed.nextSteps;
  } catch (e) {
    console.warn("LLM failed, using rules only:", e);
  }

  const finalScore = Math.round(rule.score * 0.4 + llmScore * 0.6);
  const verdict = verdictFromScore(finalScore);

  const reasons = [...rule.reasons, ...llmReasons]
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 5);

  if (reasons.length === 0) reasons.push("No obvious scam patterns found");

  return {
    riskScore: finalScore,
    verdict,
    reasons,
    nextSteps,
  };
}