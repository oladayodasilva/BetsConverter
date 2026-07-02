"use client";

import { useState } from "react";

export default function RealCodeReader() {
  const [code, setCode] = useState("");
  const [bookmaker, setBookmaker] = useState("sportybet");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReadCode() {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch("/api/read-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookmaker,
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not read code.");
        return;
      }

      setResult(data);
    } catch {
      setError("Could not connect to code reader.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Real Code Reader</h2>

        <div className="space-y-4">
          <select
            value={bookmaker}
            onChange={(e) => setBookmaker(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900"
          >
            <option value="sportybet">SportyBet</option>
          </select>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Enter SportyBet code"
          />

          <button
            onClick={handleReadCode}
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Reading code..." : "Read Code"}
          </button>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-slate-900">
            This prototype only reads visible slip information. It does not login,
            place bets, or generate paid slips.
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Reader Output</h2>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {!result && !error && (
          <p className="text-slate-700">
            Enter a SportyBet booking code to test the reader.
          </p>
        )}

        {result && (
          <div className="space-y-4">
            <div
              className={`rounded-lg p-4 ${
                result.success
                  ? "border border-green-200 bg-green-50 text-slate-900"
                  : "border border-red-200 bg-red-50 text-slate-900"
              }`}
            >
              {result.success ? "Code read successfully." : result.message}
            </div>

            {result.rawText && (
              <pre className="max-h-[500px] overflow-auto rounded-lg bg-gray-50 p-4 text-xs text-slate-900">
                {result.rawText}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}