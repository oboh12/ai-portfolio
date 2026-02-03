import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
console.log("🔎 ENV CHECK (gemini.js):", process.env.GEMINI_API_KEY);

if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY is missing from environment variables");
}

console.log("✅ GEMINI.JS IS LOADED");

// --------------------
// Constants
// --------------------
const MAX_RETRIES = 3;
const TIMEOUT_MS = 15000; // 15 seconds

// --------------------
// Low-level Gemini API call
// --------------------
async function callGemini(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      })
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== "string") {
      throw new Error("Gemini returned invalid text");
    }

    return text;
  } finally {
    clearTimeout(timeout);
  }
}

// --------------------
// Public askGemini function
// --------------------
export async function askGemini(userPrompt) {
  console.log("🧠 askGemini called with prompt length:", userPrompt.length);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`⚡ [Attempt ${attempt}] Calling Gemini...`);
      const reply = await callGemini(userPrompt);
      console.log("📝 Gemini reply received:", reply.substring(0, 100) + "...");
      return reply;
    } catch (err) {
      console.warn(`⚠️ Attempt ${attempt} failed:`, err.message);
      if (attempt === MAX_RETRIES) {
        console.error("🔥 All attempts failed for Gemini");
        return "I couldn’t generate a response. Please try again shortly.";
      }
    }
  }

  // Fallback, just in case
  return "I couldn’t generate a response. Please try again shortly.";
}