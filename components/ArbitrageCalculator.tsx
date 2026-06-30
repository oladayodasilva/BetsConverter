"use client";

import { useState } from "react";
import { calculateArbitrage } from "@/lib/calculations/arbitrage";
import SaveCalculationButton from "@/components/SaveCalculationButton";

type OutcomeInput = {
  name: string;
  odds: string;
};

export default function ArbitrageCalculator() {
  const [bankroll, setBankroll] = useState("100000");
  const [outcomes, setOutcomes] = useState<OutcomeInput[]>([
    { name: "Team A", odds: "2.20" },
    { name: "Team B", odds: "2.10" },
  ]);

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function updateOutcome(index: number, field: keyof OutcomeInput, value: string) {
    const updated = [...outcomes];
    updated[index][field] = value;
    setOutcomes(updated);
  }

  function addOutcome() {
    if (outcomes.length >= 3) return;
    setOutcomes([...outcomes, { name: `Outcome ${outcomes.length + 1}`, odds: "" }]);
  }

  function removeOutcome(index: number) {
    if (outcomes.length <= 2) return;
    setOutcomes(outcomes.filter((_, i) => i !== index));
  }

  function handleCalculate() {
    try {
      setError("");

      const calculation = calculateArbitrage({
        bankroll: Number(bankroll),
        outcomes: outcomes.map((outcome) => ({
          name: outcome.name,
          odds: Number(outcome.odds),
        })),
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
          Arbitrage Calculator
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Total Bankroll
            </label>
            <input
              value={bankroll}
              onChange={(e) => setBankroll(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="Example: 100000"
            />
          </div>

          <div className="space-y-3">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-3 text-slate-900"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    Outcome {index + 1}
                  </p>

                  {outcomes.length > 2 && (
                    <button
                      onClick={() => removeOutcome(index)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={outcome.name}
                    onChange={(e) => updateOutcome(index, "name", e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                    placeholder="Outcome name"
                  />

                  <input
                    value={outcome.odds}
                    onChange={(e) => updateOutcome(index, "odds", e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                    placeholder="Odds"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addOutcome}
            disabled={outcomes.length >= 3}
            className="w-full rounded-lg border border-green-700 px-4 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add 3rd Outcome
          </button>

          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            Calculate Arbitrage
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
            Enter odds from different bookmakers to check if there is an arbitrage
            opportunity.
          </p>
        )}

        {result && (
          <div className="space-y-4 text-sm text-slate-700">
            <div
              className={`rounded-lg p-4 ${
                result.isArbitrage
                  ? "bg-green-50 text-green-800"
                  : "bg-yellow-50 text-yellow-800"
              }`}
            >
              {result.isArbitrage
                ? "Arbitrage opportunity found."
                : "No arbitrage opportunity found."}
            </div>

            <p>
              <strong className="text-slate-900">Bankroll:</strong> ₦
              {result.bankroll.toLocaleString()}
            </p>

            <p>
              <strong className="text-slate-900">
                Total Implied Probability:
              </strong>{" "}
              {result.totalImpliedProbability}%
            </p>

            <p>
              <strong className="text-slate-900">Profit Margin:</strong>{" "}
              {result.profitMargin}%
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">
                Recommended Stakes
              </h3>

              {result.outcomes.map((outcome: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-3 text-slate-700"
                >
                  <p>
                    <strong className="text-slate-900">{outcome.name}</strong>
                  </p>
                  <p>Odds: {outcome.odds}</p>
                  <p>Stake: ₦{outcome.stake.toLocaleString()}</p>
                  <p>Return: ₦{outcome.returnAmount.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <p>
              <strong className="text-slate-900">Guaranteed Return:</strong> ₦
              {result.guaranteedReturn.toLocaleString()}
            </p>

            <p>
              <strong className="text-slate-900">Guaranteed Profit:</strong> ₦
              {result.guaranteedProfit.toLocaleString()}
            </p>

            <SaveCalculationButton
              type="arbitrage_calculator" 
              input={{
                bankroll,
                outcomes,
              }}
              result={result}
            /> 
          </div>
        )}
      </div>
    </div>
  );
}