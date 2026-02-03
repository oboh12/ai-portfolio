import { useState, useRef, useEffect } from "react";
import MessageBubble from "./ai/MessageBubble";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    // 1. Add user message immediately
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      // 2. Add AI response
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function resetChat() {
    try {
      await fetch("/api/reset", { method: "POST" });
      setMessages([]);
    } catch (err) {
      console.error("Failed to reset memory");
    }
  }

  return (
    <div className="chat-window">
      {/* === Chat Header + Memory Signal === */}
      <div className="chat-header">
        <h3>
          Portfolio Assistant
          <span className="memory-badge">🧠 Memory On</span>
        </h3>

        <p className="memory-hint">
          This assistant remembers context and adapts over time.
        </p>

        <button onClick={resetChat} className="reset-btn">
          Reset conversation
        </button>
      </div>

      {/* === Messages (Scrollable) === */}
      <div className="messages">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} />
        ))}

        {loading && (
          <MessageBubble role="ai" text="Thinking" className="thinking" />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* === Input === */}
      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my work, projects, or AI skills…"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}