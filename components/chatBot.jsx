// components/ChatBox.jsx
"use client";
import { useEffect, useState } from "react";
import { Bot, X, SendHorizonal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hey! I’m Trackify AI — ask me anything about your spending 💸" },
  ]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const getSummary = async () => {
      try {
        const res = await fetch("/api/summary");
        const data = await res.json();
        setSummary(data.summary);
      } catch (err) {
        console.error("Summary fetch failed", err);
      }
    };
    getSummary();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !summary) return;

    setMessages((m) => [...m, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, summary }),
      });

      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", content: data.answer || "No response received." }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "bot", content: "⚠️ Error getting response" }]);
    }

    setLoading(false);
  };

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="h-16 w-16 bg-gradient-to-br from-purple-500 to-indigo-600 hover:scale-105 text-white rounded-full flex items-center justify-center shadow-2xl transition"
        >
          {open ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-32 right-8 w-[400px] max-w-[90vw] h-[540px] rounded-2xl backdrop-blur bg-zinc-900/90 border border-zinc-700 shadow-xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold text-sm">Trackify AI</h3>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Beta</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="flex gap-1 items-center bg-zinc-800 text-zinc-400 px-4 py-2 rounded-xl">
                    <span className="animate-bounce">...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-zinc-900 border-zinc-700">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-2 rounded-full text-sm bg-zinc-800 text-white border-none outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ask anything..."
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white disabled:opacity-50"
                >
                  <SendHorizonal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
