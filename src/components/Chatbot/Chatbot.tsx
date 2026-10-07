import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import {
  retrieveRelevantContext,
  generateLocalRAGAnswer
} from "../../utils/ragEngine";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ id: string; title: string; category?: string }>;
  timestamp: string;
  model?: string;
}

const SUGGESTED_QUERIES = [
  "What are his core AI/ML skills?",
  "Tell me about the OmniPercept engine",
  "What is his experience at NeuralPulse Labs?",
  "How can I contact or hire Aadinath?"
];

export interface ChatbotProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (value: boolean | ((prev: boolean) => boolean)) => {
    const nextValue = typeof value === "function" ? value(isOpen) : value;
    setInternalIsOpen(nextValue);
    onOpenChange?.(nextValue);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Session-based persistence
    try {
      const saved = sessionStorage.getItem("portfolio_chat_session");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: "welcome-1",
        role: "assistant",
        content:
          "Hello! I'm Aadinath's AI Portfolio Assistant. Ask me anything about his academic background, work experience etc",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem("portfolio_chat_session", JSON.stringify(messages));
    } catch {
      // ignore
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Prepare history for RAG session context
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      // Call server proxy route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer || "I apologize, I could not synthesize a response.",
        sources: data.sources || [],
        model: data.model || "gptoss:20b",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Client-side in-memory RAG fallback (no database required)
      const fallbackResults = retrieveRelevantContext(textToSend, 3);
      const fallbackChunks = fallbackResults.map((r) => r.chunk);
      const answer = generateLocalRAGAnswer(textToSend, fallbackChunks);

      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: answer,
        sources: fallbackChunks.map((c) => ({ id: c.id, title: c.title })),
        model: "in-memory-rag",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSession = () => {
    const fresh: ChatMessage[] = [
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Session refreshed. What would you like to explore regarding Aadinath's projects, technical stack, or background?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];
    setMessages(fresh);
    sessionStorage.removeItem("portfolio_chat_session");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right, Perfectly Aligned with Bottom-Left Shortcuts Dock) */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Portfolio Assistant"
            className="group flex items-center gap-2.5 px-3.5 py-2 border border-[#d6d6ce] hover:border-[#121212] bg-[#fbfbf9]/95 backdrop-blur-md shadow-sm text-[11px] font-mono tracking-wider uppercase text-[#121212] transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52]" />
            <span>AI ASSISTANT</span>
            <kbd className="px-1.5 py-0.5 border border-[#d6d6ce] bg-white text-[10px] text-[#121212] font-mono">
              C
            </kbd>
          </button>
        )}
      </div>

      {/* Floating Chat Modal Panel (Swiss Architectural Design) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Portfolio Assistant"
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? "inset-4 sm:inset-10"
              : "bottom-6 right-6 sm:bottom-8 sm:right-8 w-[calc(100vw-3rem)] sm:w-[420px] h-[580px] max-h-[85vh]"
          } flex flex-col bg-white border border-[#d0d0c8] shadow-2xl overflow-hidden text-[#121212]`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#e6e6e1] bg-[#fbfbf9] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 border border-[#d6d6ce] bg-white flex items-center justify-center text-[#121212]">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-['Manrope'] font-bold text-[#121212] tracking-tight">
                    Dossier Assistant
                  </h3>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-[#c26d52]/10 text-[#c26d52] font-semibold border border-[#c26d52]/30">
                    Live RAG
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#808078]">
                  In-Memory Grounded Knowledge
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#70706a]">
              <button
                onClick={handleClearSession}
                title="Reset session history"
                className="p-1.5 border border-[#e6e6e1] hover:border-[#121212] hover:text-[#121212] transition-colors cursor-pointer"
                aria-label="Clear chat session"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse" : "Expand"}
                className="hidden sm:inline-flex p-1.5 border border-[#e6e6e1] hover:border-[#121212] hover:text-[#121212] transition-colors cursor-pointer"
                aria-label="Toggle size"
              >
                {isExpanded ? (
                  <Minimize2 className="w-3 h-3" />
                ) : (
                  <Maximize2 className="w-3 h-3" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 border border-[#e6e6e1] hover:border-[#121212] hover:text-[#121212] transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#121212] text-white"
                      : "bg-[#fbfbf9] text-[#222220] border border-[#e6e6e1]"
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed text-[12px] sm:text-[13px]">
                    {msg.content}
                  </p>

                  {/* RAG Sources Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#e6e6e1]">
                      <div className="flex items-center gap-1 text-[9.5px] font-mono uppercase text-[#72726c] mb-1">
                        <BookOpen className="w-3 h-3 text-[#c26d52]" />
                        <span>RETRIEVED CONTEXT:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {msg.sources.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 border border-[#dcdcd4] bg-white text-[9px] font-mono text-[#555550]"
                          >
                            {s.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`mt-1 text-[9px] font-mono ${msg.role === "user" ? "text-neutral-400" : "text-[#92928a]"} text-right`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="p-3 bg-[#fbfbf9] border border-[#e6e6e1] flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#72726c]">
                    Retrieving portfolio index & reasoning...
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c26d52] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 shrink-0 bg-white border-t border-[#f0f0eb] pt-2">
              <div className="text-[10px] font-mono text-[#82827a] uppercase tracking-wider mb-1.5">
                SUGGESTED INQUIRIES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-left px-2.5 py-1 bg-[#fbfbf9] hover:bg-neutral-100 text-[11px] text-[#333330] border border-[#e0e0d8] hover:border-[#121212] transition-colors cursor-pointer"
                  >
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t border-[#e6e6e1] bg-[#fbfbf9] shrink-0">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about neural architectures, projects, stack..."
                disabled={isLoading}
                className="w-full pl-3 pr-10 py-2 border border-[#d6d6ce] focus:border-[#121212] focus:outline-none text-xs text-[#121212] bg-white placeholder:text-[#999990] transition-colors font-mono"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="absolute right-1 p-1.5 bg-[#121212] hover:bg-[#282826] disabled:opacity-30 text-white transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#8a8a82] px-0.5">
              <span>ZERO DATABASE // IN-MEMORY RAG</span>
              <span>GROQ GPTOSS-20B</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

