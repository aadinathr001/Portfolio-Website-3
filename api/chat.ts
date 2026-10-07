import type { IncomingMessage, ServerResponse } from "http";
import {
  retrieveRelevantContext,
  buildRAGPrompt,
  generateLocalRAGAnswer,
} from "../src/utils/ragEngine.ts";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'message' parameter." });
    }

    // In-memory RAG retrieval without database
    const topResults = retrieveRelevantContext(message, 3);
    const retrievedChunks = topResults.map((r) => r.chunk);
    const { systemPrompt } = buildRAGPrompt(message, retrievedChunks);

    const sources = retrievedChunks.map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
    }));

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey || groqApiKey === "MY_GROQ_API_KEY" || groqApiKey.trim() === "") {
      const localAnswer = generateLocalRAGAnswer(message, retrievedChunks);
      return res.status(200).json({
        answer: localAnswer,
        sources,
        model: "in-memory-rag-fallback",
        note: "GROQ_API_KEY not configured in environment; answer synthesized using in-memory RAG engine.",
      });
    }

    const targetModel = process.env.GROQ_MODEL || "gptoss:20b";
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((h: { role: string; content: string }) => ({
          role: h.role === "user" ? "user" : "assistant",
          content: h.content,
        }))
      : [];

    const payload = {
      model: targetModel,
      messages: [
        { role: "system", content: systemPrompt },
        ...formattedHistory,
        { role: "user", content: message },
      ],
      temperature: 0.3,
      max_tokens: 700,
    };

    let groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!groqResponse.ok) {
      // Fallback model if gptoss:20b is unavailable
      const fallbackPayload = { ...payload, model: "llama-3.3-70b-versatile" };
      const retry = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify(fallbackPayload),
      });

      if (retry.ok) {
        const retryData = await retry.json();
        return res.status(200).json({
          answer: retryData.choices?.[0]?.message?.content || "",
          sources,
          model: "llama-3.3-70b-versatile",
        });
      }

      const fallbackAnswer = generateLocalRAGAnswer(message, retrievedChunks);
      return res.status(200).json({
        answer: fallbackAnswer,
        sources,
        model: "in-memory-rag-fallback",
      });
    }

    const data = await groqResponse.json();
    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "",
      sources,
      model: targetModel,
    });
  } catch (err: unknown) {
    return res.status(500).json({
      error: "Error processing chat query",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
