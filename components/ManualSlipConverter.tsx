"use client";

import { useState } from "react";
import { convertManualSlip } from "@/lib/mapping/normalize";
import type { Bookmaker } from "@/lib/mapping/bookmakers";
import SaveCalculationButton from "./SaveCalculationButton";

export default function ManualSlipConverter() {
  const [sourceBookmaker, setSourceBookmaker] = useState<Bookmaker>("sportybet");
  const [targetBookmaker, setTargetBookmaker] = useState<Bookmaker>("bet9ja");
  const [marketName, setMarketName] = useState("Full Time Result");
  const [selectionName, setSelectionName] = useState("Home");
  const [homeTeam, setHomeTeam] = useState("Arsenal");
  const [awayTeam, setAwayTeam] = useState("Chelsea");
  const [odds, setOdds] = useState("2.10");
  const [result, setResult] = useState<any>(null);

  function handleConvert() {
    const conversion = convertManualSlip({
      sourceBookmaker,
      targetBookmaker,
      marketName,
      selectionName,
    });

    setResult({
      ...conversion,
      homeTeam,
      awayTeam,
      odds,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Manual Slip Converter
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Source Bookmaker
            </label>
            <select
              value={sourceBookmaker}
              onChange={(e) => setSourceBookmaker(e.target.value as Bookmaker)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900"
            >
              <option value="sportybet">SportyBet</option>
              <option value="bet9ja">Bet9ja</option>
              <option value="onexbet">1xBet</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Target Bookmaker
            </label>
            <select
              value={targetBookmaker}
              onChange={(e) => setTargetBookmaker(e.target.value as Bookmaker)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900"
            >
              <option value="bet9ja">Bet9ja</option>
              <option value="sportybet">SportyBet</option>
              <option value="onexbet">1xBet</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="Home Team"
            />

            <input
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="Away Team"
            />
          </div>

          <input
            value={marketName}
            onChange={(e) => setMarketName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Market e.g. Full Time Result"
          />

          <input
            value={selectionName}
            onChange={(e) => setSelectionName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Selection e.g. Home"
          />

          <input
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="Odds e.g. 2.10"
          />

          <button
            onClick={handleConvert}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            Convert Selection
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          Conversion Result
        </h2>

        {!result && (
          <p className="text-slate-600">
            Enter a selection and click convert to see the mapped result.
          </p>
        )}

        {result && !result.success && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {result.message}
          </div>
        )}

        {result && result.success && (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <strong className="text-slate-900">Match:</strong>{" "}
              {result.homeTeam} vs {result.awayTeam}
            </p>
            <p>
              <strong className="text-slate-900">Source:</strong>{" "}
              {result.sourceBookmaker}
            </p>
            <p>
              <strong className="text-slate-900">Target:</strong>{" "}
              {result.targetBookmaker}
            </p>
            <p>
              <strong className="text-slate-900">Mapped Market:</strong>{" "}
              {result.targetMarket}
            </p>
            <p>
              <strong className="text-slate-900">Mapped Selection:</strong>{" "}
              {result.targetSelection}
            </p>
            <p>
              <strong className="text-slate-900">Original Odds:</strong>{" "}
              {result.odds}
            </p>
            <p>
              <strong className="text-slate-900">Confidence:</strong>{" "}
              {result.confidenceScore}%
            </p>
            <p>
              <strong className="text-slate-900">Status:</strong>{" "}
              {result.confidenceLabel}
            </p>

            <SaveCalculationButton
              type="manual_slip_converter"
              input={{
                sourceBookmaker,
                targetBookmaker,
                marketName,
                selectionName,
                homeTeam,
                awayTeam,
                odds,
              }}
              result={result}
            />
          </div>
        )}
      </div>
    </div>
  );
}