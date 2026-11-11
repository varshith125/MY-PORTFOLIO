import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ask } from "../lib/chat.js";
import { starterQuestions } from "../data/profile.js";

export default function AskBox() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const log = useRef(null);
  const nextId = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (log.current) log.current.scrollTo({ top: log.current.scrollHeight, behavior: reducedMotion ? "instant" : "smooth" });
  }, [messages, busy, reducedMotion]);

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;
    setValue("");
    setMessages((m) => [...m.slice(-38), { id: nextId.current++, from: "you", text: question }]);
    setBusy(true);
    try {
      const answer = await ask(question);
      setMessages((m) => [...m, { id: nextId.current++, from: "site", ...answer }]);
    } catch {
      setMessages((m) => [...m, { id: nextId.current++, from: "site", text: "Please try again, or use the contact links below." }]);
    } finally { setBusy(false); }
  }

  return (
    <div className="ask">
      <h2 className="ask__title">Ask about Varshith</h2>

      <AnimatePresence initial={false}>
        {messages.length > 0 && (
          <motion.div
            className="ask__log"
            ref={log}
            role="log"
            aria-live="polite"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          >
            {messages.map((m) => (
              <motion.p
                key={m.id}
                className={`ask__msg ask__msg--${m.from}`}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                {m.text}
                {m.offline && <small>Answered from published profile information.</small>}
              </motion.p>
            ))}
            {busy && (
              <p className="ask__msg ask__msg--site ask__typing" aria-label="Writing an answer">
                <span /><span /><span />
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {messages.length === 0 && (
        <ul className="ask__starters">
          {starterQuestions.map((q) => (
            <li key={q}>
              <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} onClick={() => send(q)}>
                {q}
              </motion.button>
            </li>
          ))}
        </ul>
      )}

      <form
        className="ask__form"
        onSubmit={(e) => {
          e.preventDefault();
          send(value);
        }}
      >
        <label className="sr" htmlFor="ask-input">Your question</label>
        <input
          id="ask-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a question"
          maxLength={1000}
          autoComplete="off"
          enterKeyHint="send"
        />
        <motion.button type="submit" disabled={busy || !value.trim()} whileTap={{ scale: 0.94 }}>
          Ask
        </motion.button>
      </form>
      <p className="ask__note">Profile-based answers &middot; No messages leave your browser.</p>
    </div>
  );
}

