"use client";

import { useState } from "react";
import { calculateBetProfit } from "@/lib/calculations/profit";

export default function ProfitCalculator() {
  const [stake, setStake] = useState("1000");
  const [decimalOdds, setDecimalOdds] = useState("2.50");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    try {
      setError("");
      const calculation = calculateBetProfit({
        stake: Number(stake),
        decimalOdds: Number(decimalOdds),
      });
      setResult(calculation);
    } catch (err: any) {
      setResult(null);
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Profit Calculator</h2>

        <div className="space-y-4">
          <input
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Stake e.g. 1000"
          />

          <input
            value={decimalOdds}
            onChange={(e) => setDecimalOdds(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Decimal odds e.g. 2.50"
          />

          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white"
          >
            Calculate Profit
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Result</h2>

        {error && <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>}

        {!result && !error && (
          <p className="text-gray-500">Enter stake and odds to calculate return.</p>
        )}

        {result && (
          <div className="space-y-3 text-sm">
            <p><strong>Stake:</strong> ₦{result.stake.toLocaleString()}</p>
            <p><strong>Odds:</strong> {result.decimalOdds}</p>
            <p><strong>Total Return:</strong> ₦{result.totalReturn.toLocaleString()}</p>
            <p><strong>Profit:</strong> ₦{result.profit.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}