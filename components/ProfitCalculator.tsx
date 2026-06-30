"use client";

import { useState } from "react";
import { calculateBetProfit } from "@/lib/calculations/profit";
import SaveCalculationButton from "@/components/SaveCalculationButton";

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
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Profit Calculator
        </h2>

        <div className="space-y-4">
          <input
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Stake e.g. 1000"
          />

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
            Calculate Profit
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Result</h2>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {!result && !error && (
          <p className="text-slate-600">
            Enter stake and odds to calculate return.
          </p>
        )}

        {result && (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <strong className="text-slate-900">Stake:</strong> ₦
              {result.stake.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Odds:</strong>{" "}
              {result.decimalOdds}
            </p>
            <p>
              <strong className="text-slate-900">Total Return:</strong> ₦
              {result.totalReturn.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Profit:</strong> ₦
              {result.profit.toLocaleString()}
            </p>

            <SaveCalculationButton
              type="profit_calculator"
              input={{
                stake,
                decimalOdds,
            }}
              result={result}
          />
        </div>
        )}
      </div>
    </div>
  );
}