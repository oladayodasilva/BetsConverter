"use client";

import { useState } from "react";
import { convertManualSlip } from "@/lib/mapping/normalize";
import type { Bookmaker } from "@/lib/mapping/bookmakers";

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
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Manual Slip Converter</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Source Bookmaker</label>
            <select
              value={sourceBookmaker}
              onChange={(e) => setSourceBookmaker(e.target.value as Bookmaker)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="sportybet">SportyBet</option>
              <option value="bet9ja">Bet9ja</option>
              <option value="onexbet">1xBet</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Target Bookmaker</label>
            <select
              value={targetBookmaker}
              onChange={(e) => setTargetBookmaker(e.target.value as Bookmaker)}
              className="w-full rounded-lg border px-3 py-2"
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
              className="rounded-lg border px-3 py-2"
              placeholder="Home Team"
            />

            <input
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="rounded-lg border px-3 py-2"
              placeholder="Away Team"
            />
          </div>

          <input
            value={marketName}
            onChange={(e) => setMarketName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Market e.g. Full Time Result"
          />

          <input
            value={selectionName}
            onChange={(e) => setSelectionName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Selection e.g. Home"
          />

          <input
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Odds e.g. 2.10"
          />

          <button
            onClick={handleConvert}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white"
          >
            Convert Selection
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Conversion Result</h2>

        {!result && (
          <p className="text-gray-500">
            Enter a selection and click convert to see the mapped result.
          </p>
        )}

        {result && !result.success && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {result.message}
          </div>
        )}

        {result && result.success && (
          <div className="space-y-3 text-sm">
            <p><strong>Match:</strong> {result.homeTeam} vs {result.awayTeam}</p>
            <p><strong>Source:</strong> {result.sourceBookmaker}</p>
            <p><strong>Target:</strong> {result.targetBookmaker}</p>
            <p><strong>Mapped Market:</strong> {result.targetMarket}</p>
            <p><strong>Mapped Selection:</strong> {result.targetSelection}</p>
            <p><strong>Original Odds:</strong> {result.odds}</p>
            <p><strong>Confidence:</strong> {result.confidenceScore}%</p>
            <p><strong>Status:</strong> {result.confidenceLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}