// components/CashoutCalculator.tsx

"use client";

import { useState } from "react";
import { calculateCashout } from "@/lib/calculations/cashout";
import SaveCalculationButton from "./SaveCalculationButton";

export default function CashoutCalculator() {
  const [stake, setStake] = useState("1000");
  const [originalOdds, setOriginalOdds] = useState("5.00");
  const [currentCashout, setCurrentCashout] = useState("3000");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    try {
      setError("");

      const calculation = calculateCashout({
        stake: Number(stake),
        originalOdds: Number(originalOdds),
        currentCashout: Number(currentCashout),
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
          Cashout Calculator
        </h2>

        <div className="space-y-4">
          <input
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Stake e.g. 1000"
          />

          <input
            value={originalOdds}
            onChange={(e) => setOriginalOdds(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Original total odds e.g. 5.00"
          />

          <input
            value={currentCashout}
            onChange={(e) => setCurrentCashout(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Current cashout offer e.g. 3000"
          />

          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            Analyze Cashout
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
            Enter your stake, original odds, and cashout offer.
          </p>
        )}

        {result && (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <strong className="text-slate-900">Stake:</strong> ₦
              {result.stake.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Original Odds:</strong>{" "}
              {result.originalOdds}
            </p>
            <p>
              <strong className="text-slate-900">Potential Return:</strong> ₦
              {result.potentialReturn.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Potential Profit:</strong> ₦
              {result.potentialProfit.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Cashout Offer:</strong> ₦
              {result.currentCashout.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Cashout Profit/Loss:</strong> ₦
              {result.cashoutProfit.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Cashout Value:</strong>{" "}
              {result.cashoutPercentage}% of potential return
            </p>

            <SaveCalculationButton
              type="cashout_calculator"
              input={{
                stake,
                originalOdds,
                currentCashout,
              }}
              result={result}
            />

            <div className="rounded-lg bg-green-50 p-4 text-green-800">
              {result.recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}