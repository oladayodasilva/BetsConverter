"use client";

import { useState } from "react";
import { calculateAccumulator } from "@/lib/calculations/accumulator";
import SaveCalculationButton from "@/components/SaveCalculationButton";

export default function AccumulatorCalculator() {
  const [stake, setStake] = useState("1000");
  const [oddsInputs, setOddsInputs] = useState(["1.50", "2.00"]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function updateOdd(index: number, value: string) {
    const updated = [...oddsInputs];
    updated[index] = value;
    setOddsInputs(updated);
  }

  function addSelection() {
    setOddsInputs([...oddsInputs, ""]);
  }

  function removeSelection(index: number) {
    setOddsInputs(oddsInputs.filter((_, i) => i !== index));
  }

  function handleCalculate() {
    try {
      setError("");

      const calculation = calculateAccumulator({
        stake: Number(stake),
        odds: oddsInputs.map(Number),
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
          Accumulator Calculator
        </h2>

        <div className="space-y-4">
          <input
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Stake e.g. 1000"
          />

          <div className="space-y-3">
            {oddsInputs.map((odd, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={odd}
                  onChange={(e) => updateOdd(index, e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                  placeholder={`Selection ${index + 1} odds`}
                />

                {oddsInputs.length > 1 && (
                  <button
                    onClick={() => removeSelection(index)}
                    className="rounded-lg border border-gray-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:border-red-300 hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addSelection}
            className="w-full rounded-lg border border-green-700 px-4 py-3 font-semibold text-green-700 transition-colors hover:bg-green-50"
          >
            Add Selection
          </button>

          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            Calculate Accumulator
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
            Add your stake and selection odds to calculate your accumulator
            return.
          </p>
        )}

        {result && (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <strong className="text-slate-900">Selections:</strong>{" "}
              {result.selections}
            </p>
            <p>
              <strong className="text-slate-900">Stake:</strong> ₦
              {result.stake.toLocaleString()}
            </p>
            <p>
              <strong className="text-slate-900">Total Odds:</strong>{" "}
              {result.totalOdds}
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
              type="accumulator_calculator"
              input={{
                stake,
                oddsInputs,
              }}
              result={result}
            />  
          </div>
        )}
      </div>
    </div>
  );
}