"use client";

import { useState } from "react";
import { mockVerificationQueue } from "@/lib/verification/mockVerificationQueue";
import type { VerificationItem, VerificationStatus } from "@/lib/verification/types";

export default function VerificationDashboard() {
  const [items, setItems] = useState<VerificationItem[]>(mockVerificationQueue);

  function updateStatus(id: string, status: VerificationStatus) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }

  function updateField(id: string, field: keyof VerificationItem, value: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "targetOdds" || field === "sourceOdds"
                  ? Number(value)
                  : value,
              status: "EDITED",
            }
          : item
      )
    );
  }

  const pending = items.filter((item) => item.status === "PENDING").length;
  const approved = items.filter((item) => item.status === "APPROVED").length;
  const rejected = items.filter((item) => item.status === "REJECTED").length;
  const edited = items.filter((item) => item.status === "EDITED").length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Pending" value={pending} />
        <StatCard label="Approved" value={approved} />
        <StatCard label="Rejected" value={rejected} />
        <StatCard label="Edited" value={edited} />
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase text-green-700">
                  {item.sourceBookmaker} → {item.targetBookmaker}
                </p>
                <h2 className="text-xl font-bold">{item.matchName}</h2>
                <p className="text-sm text-gray-500">
                  Code: {item.sourceCode} · Confidence: {item.confidenceScore}%
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  item.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : item.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : item.status === "EDITED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="mb-3 font-semibold">Source Selection</h3>
                <p className="text-sm">Market: {item.sourceMarket}</p>
                <p className="text-sm">Selection: {item.sourceSelection}</p>
                <p className="text-sm">Odds: {item.sourceOdds}</p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-semibold">Target Match</h3>

                <label className="mb-1 block text-xs font-medium">Target Event</label>
                <input
                  value={item.targetEvent}
                  onChange={(e) => updateField(item.id, "targetEvent", e.target.value)}
                  className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
                />

                <label className="mb-1 block text-xs font-medium">Target Market</label>
                <input
                  value={item.targetMarket}
                  onChange={(e) => updateField(item.id, "targetMarket", e.target.value)}
                  className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
                />

                <label className="mb-1 block text-xs font-medium">Target Selection</label>
                <input
                  value={item.targetSelection}
                  onChange={(e) =>
                    updateField(item.id, "targetSelection", e.target.value)
                  }
                  className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
                />

                <label className="mb-1 block text-xs font-medium">Target Odds</label>
                <input
                  value={item.targetOdds}
                  onChange={(e) => updateField(item.id, "targetOdds", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(item.id, "APPROVED")}
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(item.id, "REJECTED")}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Reject
              </button>

              <button
                onClick={() => updateStatus(item.id, "PENDING")}
                className="rounded-lg border px-4 py-2 text-sm font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}