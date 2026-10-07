import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  retrieveRelevantContext,
  buildRAGPrompt,
  generateLocalRAGAnswer,
} from "./src/utils/ragEngine.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // RAG Chatbot API route
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message, history = [] } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Missing or invalid 'message' parameter." });
      }

      // 1. In-Memory Semantic RAG Retrieval (No database required)
      const topResults = retrieveRelevantContext(message, 3);
      const retrievedChunks = topResults.map((r) => r.chunk);
      const { systemPrompt } = buildRAGPrompt(message, retrievedChunks);

      const sources = retrievedChunks.map((c) => ({
        id: c.id,
        title: c.title,
        category: c.category,
      }));

      const groqApiKey = process.env.GROQ_API_KEY;

      // If no GROQ_API_KEY is supplied in environment, use in-memory RAG synthesis directly
      if (!groqApiKey || groqApiKey === "MY_GROQ_API_KEY" || groqApiKey.trim() === "") {
        const localAnswer = generateLocalRAGAnswer(message, retrievedChunks);
        return res.json({
          answer: localAnswer,
          sources,
          model: "in-memory-rag-fallback",
          note: "GROQ_API_KEY not configured in environment; answer synthesized using in-memory RAG engine.",
        });
      }

      // 2. Call Groq API with gptoss:20b
      const targetModel = process.env.GROQ_MODEL || "gptoss:20b";

      // Format session history for context continuity (max last 6 messages)
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

      // If specified model returns error (e.g. gptoss:20b model alias variation), retry with llama-3.3-70b-versatile
      if (!groqResponse.ok) {
        const errorData = await groqResponse.json().catch(() => ({}));
        console.warn(`Groq model ${targetModel} error:`, errorData);

        // Try standard Groq fast model as fallback
        const fallbackPayload = {
          ...payload,
          model: "llama-3.3-70b-versatile",
        };

        const retryResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify(fallbackPayload),
        });

        if (retryResponse.ok) {
          const retryData = await retryResponse.json();
          const answer = retryData.choices?.[0]?.message?.content || "";
          return res.json({
            answer,
            sources,
            model: "llama-3.3-70b-versatile",
          });
        }

        // If Groq completely fails (e.g. invalid key or rate limit), use local RAG answer
        const fallbackAnswer = generateLocalRAGAnswer(message, retrievedChunks);
        return res.json({
          answer: fallbackAnswer,
          sources,
          model: "in-memory-rag-fallback",
          note: errorData?.error?.message || "Groq API temporarily unavailable.",
        });
      }

      const data = await groqResponse.json();
      const answer = data.choices?.[0]?.message?.content || "";

      return res.json({
        answer,
        sources,
        model: targetModel,
      });
    } catch (err: unknown) {
      console.error("Chat API error:", err);
      return res.status(500).json({
        error: "Internal server error during chat synthesis.",
        details: err instanceof Error ? err.message : String(err),
      });
    }
  });

  // Mount Vite middleware in dev or serve dist in production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
