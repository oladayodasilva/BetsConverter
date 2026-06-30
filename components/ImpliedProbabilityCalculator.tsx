"use client";

import { useState } from "react";
import { decimalToImpliedProbability } from "@/lib/calculations/odds";

export default function ImpliedProbabilityCalculator() {
  const [decimalOdds, setDecimalOdds] = useState("2.50");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    try {
      setError("");
      const probability = decimalToImpliedProbability(Number(decimalOdds));
      setResult(probability);
    } catch (err: any) {
      setResult(null);
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Implied Probability Calculator
        </h2>

        <div className="space-y-4">
          <input
            value={decimalOdds}
            onChange={(e) => setDecimalOdds(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Decimal odds e.g. 2.50"
          />

          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            Calculate Probability
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Result</h2>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {result === null && !error && (
          <p className="text-slate-600">
            Enter decimal odds to calculate probability.
          </p>
        )}

        {result !== null && (
          <p className="text-3xl font-bold text-green-700">{result}%</p>
        )}
      </div>
    </div>
  );
}