console.log("✅ ROUTES.JS IS LOADED");

import express from "express";
import { askGemini } from "./gemini.js";

import {
  addMessage,
  shouldSummarize,
  updateSummary,
  buildMemoryContext,
  resetMemory
} from "./memoryStore.js";

import { summarizePrompt } from "./prompts/summarize.js";

const router = express.Router();

/* -------------------------
   POST /ask
-------------------------- */
router.post("/ask", async (req, res) => {
  console.log("📩 Incoming /ask request:", req.body);

  const prompt = req.body?.prompt;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Invalid or missing prompt" });
  }

  try {
    // Store user message
    addMessage("user", prompt);

    // Optional memory summarization
    if (shouldSummarize()) {
      try {
        const convo = buildMemoryContext();
        const summary = await askGemini(summarizePrompt(convo));
        updateSummary(summary);
        console.log("🧠 Memory summarized");
      } catch (e) {
        console.warn("⚠️ Summarization skipped:", e.message);
      }
    }

    // Build context and call Gemini
    const context = buildMemoryContext();
    const reply = await askGemini(`${context}\n\nUser Question:\n${prompt}`);

    console.log("📝 AI reply (before sending):", reply);

    // Store AI response
    addMessage("ai", reply);

    // Respond JSON
    res.json({ reply });
  } catch (err) {
    console.error("🔥 /ask failed:", err.message);
    res.status(500).json({ error: "AI service temporarily unavailable" });
  }
});

/* -------------------------
   POST /reset
-------------------------- */
router.post("/reset", (_req, res) => {
  resetMemory();
  res.json({ success: true });
});

export default router;