"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const samplePrompts = [
  "Explain decimal odds like I am a beginner.",
  "If I stake ₦5,000 at 2.40 odds, what is my profit?",
  "Compare singles vs accumulator bets.",
  "What does implied probability mean?",
  "How should I think about bankroll management?",
];

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(customMessage?: string) {
    const finalMessage = customMessage || message;

    if (!finalMessage.trim()) return;

    try {
      setLoading(true);
      setError("");

      setChat((prev) => [
        ...prev,
        {
          role: "user",
          content: finalMessage,
        },
      ]);

      setMessage("");

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: finalMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch {
      setError("Could not connect to AI assistant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl text-gray-700">BetsConverter AI</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ask about odds, profit, bankroll, accumulator risk, cashout decisions,
            and betting terms.
          </p>
        </div>

        <div className="mb-4 min-h-[320px] space-y-4 rounded-xl bg-gray-50 p-4">
          {chat.length === 0 && (
            <p className="text-sm text-gray-500">
              Start with a question like: “If I stake ₦5,000 at 2.40 odds, what
              is my profit?”
            </p>
          )}

          {chat.map((item, index) => (
            <div
              key={index}
              className={`rounded-lg p-3 text-sm ${
                item.role === "user"
                  ? "ml-auto max-w-[85%] bg-green-700 text-white"
                  : "mr-auto max-w-[85%] bg-white text-gray-800"
              }`}
            >
              <p className="whitespace-pre-wrap">{item.content}</p>
            </div>
          ))}

          {loading && (
            <div className="mr-auto max-w-[85%] rounded-lg bg-white p-3 text-sm text-gray-500">
              Thinking...
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="w-full rounded-lg border px-3 py-3"
            placeholder="Ask BetsConverter AI..."
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>

      <aside className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-slate-900">
        Try asking
      </h3>

        <div className="space-y-3">
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-left text-sm font-medium text-slate-900 transition-all hover:border-green-700 hover:bg-green-50 hover:text-green-700"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
          BetsConverter AI does not provide sure odds, fixed games, or guaranteed
          betting predictions.
        </div>
      </aside>
    </div>
  );
}