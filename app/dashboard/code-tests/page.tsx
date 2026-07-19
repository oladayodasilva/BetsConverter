import { prisma } from "@/lib/prisma";

type CodeReadTestRecord = {
  id: string;
  bookmaker: string;
  code: string;
  success: boolean;
  rawText: string | null;
  parsedSlip: unknown;
  errorMessage: string | null;
  createdAt: Date;
};

export default async function CodeTestsPage() {
  const tests: CodeReadTestRecord[] =
    await prisma.codeReadTest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Reader Testing
        </p>

        <h1 className="text-4xl font-bold text-slate-900">
          Code Reader Test History
        </h1>

        <p className="mt-3 text-slate-600">
          Review successful and failed booking-code reads.
        </p>
      </div>

      <div className="space-y-4">
        {tests.map((test) => (
          <div
            key={test.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-900">
                  {test.bookmaker} — {test.code}
                </h2>

                <p className="text-sm text-slate-500">
                  {new Date(test.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  test.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {test.success ? "SUCCESS" : "FAILED"}
              </span>
            </div>

            {test.errorMessage && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {test.errorMessage}
              </div>
            )}

            {test.parsedSlip !== null && (
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  View Parsed Slip
                </summary>

                <pre className="mt-3 max-h-[300px] overflow-auto rounded-lg bg-slate-50 p-4 text-xs text-slate-800">
                  {JSON.stringify(test.parsedSlip, null, 2)}
                </pre>
              </details>
            )}

            {test.rawText && (
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  View Raw Text
                </summary>

                <pre className="mt-3 max-h-[300px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs text-slate-800">
                  {test.rawText}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}