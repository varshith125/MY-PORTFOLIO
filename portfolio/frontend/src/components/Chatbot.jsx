import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, Bot, User, Sparkles, RotateCcw } from "lucide-react";
import { analyticsAPI, chatAPI } from "../utils/api";

const SUGGESTED = [
  "Who is Varshith?",
  "What projects has he built?",
  "What tech stack does he know?",
  "Is he open to opportunities?",
  "Tell me about his IoT project",
  "What's his educational background?",
];

function createMessage(role, content) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content: typeof content === "string" ? content : String(content ?? ""),
    ts: Date.now(),
  };
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 max-w-xs">
      <div className="w-7 h-7 rounded-full bg-[#161625] border border-[#1e1e32] flex items-center justify-center flex-shrink-0">
        <Bot size={12} className="text-cyan-400" />
      </div>
      <div className="chat-ai-bubble px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  const safeContent = typeof msg.content === "string" ? msg.content : String(msg.content ?? "");
  const parsedTime = new Date(msg.ts);
  const safeTime = Number.isFinite(parsedTime.getTime())
    ? parsedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#161625] border border-[#1e1e32] flex items-center justify-center flex-shrink-0">
          <Bot size={12} className="text-cyan-400" />
        </div>
      )}

      <div className={`max-w-[75%] px-4 py-3 ${isUser ? "chat-user-bubble" : "chat-ai-bubble"}`}>
        <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">{safeContent}</p>
        <p className="font-mono text-[10px] text-[#2a2a45] mt-1.5">{safeTime}</p>
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
          <User size={12} className="text-cyan-400" />
        </div>
      )}
    </motion.div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    createMessage(
      "assistant",
      "Hey! I'm Varshith's AI assistant. Ask me anything about his skills, projects, background, or experience. I'm here to help!"
    ),
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text.trim();
    if (!msg || loading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, createMessage("user", msg)]);
    setLoading(true);

    try {
      analyticsAPI
        .track({ category: "chat_message", target: "chatbot", page: "#chatbot" })
        .catch(() => {});

      const data = await chatAPI.sendMessage(msg);
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "I received your message, but the response was empty.";

      setMessages((prev) => [...prev, createMessage("assistant", reply)]);
    } catch (err) {
      const errMsg =
        err?.response?.data?.error ||
        err?.message ||
        "Couldn't reach the AI. Make sure the backend is running.";

      setError(errMsg);
      setMessages((prev) => [...prev, createMessage("assistant", `Warning: ${errMsg}`)]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const reset = () => {
    setMessages([createMessage("assistant", "Chat cleared! Ask me anything about Varshith.")]);
    setError(null);
  };

  return (
    <section id="chatbot" className="py-24 relative bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <p className="section-label mb-3">05 / ai assistant</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8e8f0] mb-4">
            Meet My AI Clone
          </h2>
          <p className="font-body text-[#9090b0] max-w-lg mx-auto">
            Powered by Gemini and trained on Varshith&apos;s resume. Ask anything about his
            background, skills, or projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="panel-card overflow-hidden shadow-panel">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e32]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                    <Bot size={16} className="text-[#050508]" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-lime-400 rounded-full border-2 border-[#161625]" />
                </div>
                <div>
                  <p className="font-mono text-sm text-[#e8e8f0] font-semibold">Varshith AI</p>
                  <p className="font-mono text-xs text-lime-400">online</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0d0d14] rounded-full border border-[#1e1e32]">
                  <Sparkles size={10} className="text-cyan-400" />
                  <span className="font-mono text-[10px] text-[#4a4a6a]">Gemini</span>
                </div>
                <button onClick={reset} title="Clear chat" className="text-[#4a4a6a] hover:text-cyan-400 transition-colors">
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            <div ref={messagesRef} className="h-[380px] overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <Message key={msg.id} msg={msg} />
                ))}
              </AnimatePresence>
              {loading && <TypingIndicator />}
            </div>

            <div className="px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-none">
              {SUGGESTED.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  disabled={loading}
                  className="flex-shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-full bg-[#0d0d14] border border-[#1e1e32] text-[#4a4a6a] hover:border-cyan-400/30 hover:text-cyan-400 transition-all disabled:opacity-40"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-[#0d0d14] border border-[#1e1e32] rounded-xl px-4 py-3 focus-within:border-cyan-400/40 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Varshith's skills, projects..."
                  disabled={loading}
                  className="flex-1 bg-transparent font-body text-sm text-[#e8e8f0] placeholder:text-[#2a2a45] outline-none disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="w-8 h-8 rounded-lg bg-cyan-400 text-[#050508] flex items-center justify-center hover:bg-cyan-400/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="font-mono text-[10px] text-[#2a2a45] text-center mt-2">
                Press Enter to send. Powered by Google Gemini
              </p>
              {error ? <p className="mt-2 text-center text-xs text-red-400">{error}</p> : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
