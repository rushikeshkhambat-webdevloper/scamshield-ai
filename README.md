# 🛡️ ScamShield AI

**AI-powered scam detector for India — built to protect families from digital arrest, KYC phishing, and UPI fraud.**

🔗 **Live Demo:** [https://scamshield-ai-ochre.vercel.app](https://scamshield-ai-ochre.vercel.app)

---

## 🚨 The Problem

India is facing a cyber fraud crisis. Just days ago, SBI confirmed a massive data leak — thousands of customer names, phone numbers, and bank details exposed on the dark web. Scammers now have the exact data they need to sound like your bank, your police, or your government.

They pair this with AI voice cloning and **"digital arrest"** threats. A 69-year-old widow recently lost ₹15 lakh to a fake police call. **Our parents and grandparents are the prime targets.**

---

## 💡 The Solution

**ScamShield** detects scams in **under 2 seconds**. Paste any suspicious SMS, WhatsApp message, link, or UPI request — our hybrid AI engine analyzes the intent and warns you in **your own language**.

🔗 **Try it live:** [https://scamshield-ai-ochre.vercel.app](https://scamshield-ai-ochre.vercel.app)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Scam Detection** | Hybrid engine: rule-based Indian scam patterns + LLM for context |
| 🌐 **Trilingual** | English, हिंदी (Hindi), मराठी (Marathi) — UI *and* AI responses |
| 👨‍👩‍👧 **Family Guard** | Real-time alerts — when one phone catches a scam, the whole family is warned instantly |
| 🎙️ **Voice Detection** | Live speech-to-text for phone call transcripts |
| 📊 **Risk Score** | 0–100 score with verdict (Safe / Suspicious / Scam) |
| 🌙 **Dark Mode** | Fully responsive, mobile-first design |

---

## 🎯 How It Works

1. **Paste** a suspicious message or use **Voice** input
2. **Analyze** — the hybrid AI engine scans for:
   - Urgency language ("immediately", "24 hours")
   - Known scam patterns ("digital arrest", "CBI", "KYC")
   - Lookalike bank domains & shortened links
   - UPI IDs
3. **Get Verdict** — Risk score + reasons + next steps (in your language)
4. **Report** — Direct link to 1930 / cybercrime.gov.in
5. **Family Guard** — If risk ≥ 50, family members get an instant real-time alert

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Backend / Realtime:** Appwrite (Auth, Database, Realtime WebSockets)
- **AI Engine:** OpenRouter (Llama 3.1 8B Instruct)
- **Voice:** Web Speech API
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Appwrite account
- OpenRouter API key

### Installation

```bash
git clone https://github.com/rushikeshkhambat-webdevloper/scamshield-ai.git
cd scamshield-ai
npm install
