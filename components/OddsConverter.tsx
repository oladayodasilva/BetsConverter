"use client";

import { useState } from "react";
import { convertOdds, type OddsFormat } from "@/lib/calculations/odds";
import SaveCalculationButton from "./SaveCalculationButton";

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
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Odds Converter
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Odds Value
            </label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="Example: 2.50, +150, 3/2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Input Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as OddsFormat)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900"
            >
              <option value="decimal">Decimal</option>
              <option value="american">American</option>
              <option value="fractional">Fractional</option>
            </select>
          </div>

          <button
            onClick={handleConvert}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            Convert Odds
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Result</h2>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {!result && !error && (
          <p className="text-slate-600">Enter odds and convert.</p>
        )}

        {result && (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <strong className="text-slate-900">Decimal:</strong>{" "}
              {result.decimal}
            </p>
            <p>
              <strong className="text-slate-900">American:</strong>{" "}
              {result.american}
            </p>
            <p>
              <strong className="text-slate-900">Fractional:</strong>{" "}
              {result.fractional}
            </p>
            <p>
              <strong className="text-slate-900">Implied Probability:</strong>{" "}
              {result.impliedProbability}%
            </p>

            <SaveCalculationButton
              type="odds_converter"
              input={{
                value,
                format,
              }}
              result={result}
            />  
          </div>
        )}
      </div>
    </div>
  );
}