"use client";

import { useState } from "react";
import {
  mockBet9jaEvents,
  mockOneXBetEvents,
} from "@/lib/booking/mockSlips";
import { convertSlipToTarget } from "@/lib/booking/matchEngine";

export default function StructuredCodeReader() {
  const [code, setCode] = useState("");
  const [targetBookmaker, setTargetBookmaker] = useState("bet9ja");
  const [result, setResult] = useState<any>(null);
  const [mappingResult, setMappingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReadAndMap() {
    try {
      setLoading(true);
      setError("");
      setResult(null);
      setMappingResult(null);

      const response = await fetch("/api/read-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookmaker: "sportybet",
          code,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Could not read code.");
        return;
      }

      setResult(data);

      if (!data.parsedSlip?.selections?.length) {
        setError("Code was read, but no structured selections were found.");
        return;
      }

      const targetEvents =
        targetBookmaker === "bet9ja" ? mockBet9jaEvents : mockOneXBetEvents;

      const conversion = convertSlipToTarget({
        slip: data.parsedSlip,
        targetEvents,
      });

      setMappingResult(conversion);
    } catch {
      setError("Could not read and map code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Structured Code Reader</h2>

        <div className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Enter SportyBet code"
          />

          <select
            value={targetBookmaker}
            onChange={(e) => setTargetBookmaker(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="bet9ja">Map to Bet9ja</option>
            <option value="onexbet">Map to 1xBet</option>
          </select>

          <button
            onClick={handleReadAndMap}
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Reading and mapping..." : "Read and Map Code"}
          </button>

          <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
            Week 9 converts raw reader output into structured selections, then maps
            them against mock target bookmaker events.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {!result && !error && (
          <div className="rounded-xl border bg-white p-6 text-gray-500 shadow-sm">
            Enter a SportyBet code to parse and map.
          </div>
        )}

        {result?.parsedSlip && (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Parsed Slip</h2>

            {result.parsedSlip.parserWarnings?.length > 0 && (
              <div className="mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
                {result.parsedSlip.parserWarnings.map((warning: string) => (
                  <p key={warning}>{warning}</p>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {result.parsedSlip.selections.map((selection: any) => (
                <div key={selection.id} className="rounded-lg border p-4 text-sm">
                  <p className="font-bold">
                    {selection.homeTeam} vs {selection.awayTeam}
                  </p>
                  <p>League: {selection.league}</p>
                  <p>Market: {selection.market}</p>
                  <p>Selection: {selection.selection}</p>
                  <p>Odds: {selection.odds || "Not detected"}</p>
                  <p>Parser Confidence: {selection.confidence}%</p>

                  {selection.warnings?.length > 0 && (
                    <div className="mt-3 rounded-lg bg-yellow-50 p-3 text-yellow-800">
                      {selection.warnings.map((warning: string) => (
                        <p key={warning}>{warning}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {mappingResult && (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Mapping Result</h2>

            <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-800">
              {mappingResult.matchedCount} of {mappingResult.totalSelections} selections matched.
            </div>

            <div className="space-y-4">
              {mappingResult.convertedSelections.map((item: any) => (
                <div key={item.sourceSelection.id} className="rounded-lg border p-4 text-sm">
                  <p className="mb-2 font-bold">
                    {item.sourceSelection.homeTeam} vs {item.sourceSelection.awayTeam}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="font-semibold">Source</p>
                      <p>Market: {item.sourceSelection.market}</p>
                      <p>Selection: {item.sourceSelection.selection}</p>
                      <p>Odds: {item.sourceSelection.odds}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Target</p>
                      {item.matchedEvent ? (
                        <>
                          <p>
                            Event: {item.matchedEvent.homeTeam} vs{" "}
                            {item.matchedEvent.awayTeam}
                          </p>
                          <p>Market: {item.targetMarket || "Not found"}</p>
                          <p>
                            Selection:{" "}
                            {item.targetSelection
                              ? `${item.targetSelection.selection} @ ${item.targetSelection.odds}`
                              : "Not found"}
                          </p>
                        </>
                      ) : (
                        <p>Not matched</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between rounded-lg bg-gray-50 p-3">
                    <span>Status: {item.status}</span>
                    <span>Confidence: {item.confidenceScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {result?.rawText && (
          <details className="rounded-xl border bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">View Raw Text</summary>
            <pre className="mt-4 max-h-[400px] overflow-auto rounded-lg bg-gray-50 p-4 text-xs">
              {result.rawText}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}