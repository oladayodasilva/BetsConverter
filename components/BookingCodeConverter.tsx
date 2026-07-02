"use client";

import { useState } from "react";
import {
  mockBet9jaEvents,
  mockOneXBetEvents,
  mockSportyBetSlips,
} from "@/lib/booking/mockSlips";
import { convertSlipToTarget } from "@/lib/booking/matchEngine";
import type { BookmakerSlug } from "@/lib/booking/types";

export default function BookingCodeConverter() {
  const [sourceCode, setSourceCode] = useState("SP12345");
  const [targetBookmaker, setTargetBookmaker] = useState<BookmakerSlug>("bet9ja");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  function handleConvert() {
    setError("");
    setResult(null);

    const slip = mockSportyBetSlips.find(
      (item) => item.sourceCode.toLowerCase() === sourceCode.toLowerCase()
    );

    if (!slip) {
      setError("Booking code not found in mock database.");
      return;
    }

    const targetEvents =
      targetBookmaker === "bet9ja" ? mockBet9jaEvents : mockOneXBetEvents;

    const conversion = convertSlipToTarget({
      slip,
      targetEvents,
    });

    setResult({
      ...conversion,
      targetBookmaker,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Booking Code Converter</h2>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-bold">SportyBet Code</label>
            <input
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Example: SP12345"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Convert To</label>
            <select
              value={targetBookmaker}
              onChange={(e) => setTargetBookmaker(e.target.value as BookmakerSlug)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="bet9ja">Bet9ja</option>
              <option value="onexbet">1xBet</option>
            </select>
          </div>

          <button
            onClick={handleConvert}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white"
          >
            Convert Booking Code
          </button>

          <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
            Week 7 uses mock data only. Real sportsbook code reading comes later.
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Conversion Result</h2>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
        )}

        {!result && !error && (
          <p className="text-gray-500">
            Enter the mock code <strong>SP12345</strong> and convert it.
          </p>
        )}

        {result && (
          <div className="space-y-5">
            <div className="rounded-lg bg-green-50 p-4 text-green-800">
              {result.matchedCount} of {result.totalSelections} selections matched
              for {result.targetBookmaker}.
            </div>

            {result.convertedSelections.map((item: any) => (
              <div key={item.sourceSelection.id} className="rounded-lg border p-4">
                <div className="mb-3">
                  <p className="font-bold">
                    {item.sourceSelection.homeTeam} vs {item.sourceSelection.awayTeam}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.sourceSelection.league} ·{" "}
                    {new Date(item.sourceSelection.startTime).toLocaleString()}
                  </p>
                </div>

                <div className="grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <p className="font-semibold">Source Selection</p>
                    <p>Market: {item.sourceSelection.market}</p>
                    <p>Selection: {item.sourceSelection.selection}</p>
                    <p>Odds: {item.sourceSelection.odds}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Target Match</p>

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

                <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm">
                  <span>Status: {item.status}</span>
                  <span>Confidence: {item.confidenceScore}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}