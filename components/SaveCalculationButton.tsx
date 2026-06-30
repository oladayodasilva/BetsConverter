"use client";

import { useState } from "react";

export default function SaveCalculationButton({
  type,
  input,
  result,
}: {
  type: string;
  input: any;
  result: any;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/saved-calculations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          input,
          result,
        }),
      });

      if (response.status === 401) {
        setMessage("Login required to save calculations.");
        return;
      }

      if (!response.ok) {
        setMessage("Could not save calculation.");
        return;
      }

      setMessage("Calculation saved.");
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleSave}
        disabled={loading}
        className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Calculation"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}