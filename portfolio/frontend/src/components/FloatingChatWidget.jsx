import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { analyticsAPI, chatAPI } from "../utils/api";
import ChatErrorBoundary from "./ChatErrorBoundary";

function createMessage(role, content) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content: typeof content === "string" ? content : String(content ?? ""),
  };
}

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    createMessage("assistant", "Hi, this is Varshith. What can I help you with?"),
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (rawText) => {
    const text = typeof rawText === "string" ? rawText.trim() : String(rawText ?? "").trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, createMessage("user", text)]);
    setLoading(true);

    try {
      analyticsAPI.track({ category: "chat_message", target: "floating_chat", page: "floating_widget" }).catch(() => {});
      const data = await chatAPI.sendMessage(text);
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "I received your message, but the response was empty.";
      setMessages((prev) => [...prev, createMessage("assistant", reply)]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", "I'm not available right now. Please try again in a moment."),
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <ChatErrorBoundary>
    <div className="floating-chat">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="floating-chat-panel"
          >
            <div className="floating-chat-header">
              <div className="flex items-center gap-3">
                <div className="floating-chat-avatar">
                  <Bot size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">Varshith Assistant</p>
                  <p className="text-xs text-slate-400">Quick portfolio help</p>
                </div>
              </div>
              <button type="button" className="floating-chat-close" onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div ref={listRef} className="floating-chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`floating-chat-bubble ${message.role === "user" ? "floating-chat-bubble-user" : ""}`}
                >
                  {message.content}
                </div>
              ))}
              {loading ? <div className="floating-chat-bubble">Typing...</div> : null}
            </div>

            <div className="floating-chat-input-wrap">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask about projects, skills..."
                className="floating-chat-input"
              />
              <button type="button" className="floating-chat-send" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className="floating-chat-trigger" onClick={() => setOpen((value) => !value)}>
        <MessageCircle size={20} />
        <span>Chat</span>
      </button>
    </div>
    </ChatErrorBoundary>
  );
}
