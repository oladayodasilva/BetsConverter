"use client";

import { useState } from "react";
import { convertOdds, type OddsFormat } from "@/lib/calculations/odds";

export default function OddsConverter() {
  const [value, setValue] = useState("2.50");
  const [format, setFormat] = useState<OddsFormat>("decimal");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function handleConvert() {
    try {
      setError("");
      const converted = convertOdds(value, format);
      setResult(converted);
    } catch (err: any) {
      setResult(null);
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Odds Converter</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Odds Value</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Example: 2.50, +150, 3/2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Input Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as OddsFormat)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="decimal">Decimal</option>
              <option value="american">American</option>
              <option value="fractional">Fractional</option>
            </select>
          </div>

          <button
            onClick={handleConvert}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white"
          >
            Convert Odds
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Result</h2>

        {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

        {!result && !error && (
          <p className="text-gray-500">Enter odds and convert.</p>
        )}

        {result && (
          <div className="space-y-3 text-sm">
            <p><strong>Decimal:</strong> {result.decimal}</p>
            <p><strong>American:</strong> {result.american}</p>
            <p><strong>Fractional:</strong> {result.fractional}</p>
            <p><strong>Implied Probability:</strong> {result.impliedProbability}%</p>
          </div>
        )}
      </div>
    </div>
  );
}