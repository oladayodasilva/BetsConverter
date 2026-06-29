import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase text-green-700">
          Betting tools, simplified
        </p>

        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          Convert odds, calculate bets, and map betting slips faster.
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          BetsConverter helps bettors understand odds, calculate potential returns,
          analyze bet slips, and convert selections across supported bookmakers.
        </p>

        <div className="flex gap-4">
          <Link
            href="/tools/manual-slip-converter"
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white"
          >
            Try Manual Converter
          </Link>

          <Link
            href="/tools/odds-converter"
            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold"
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </section>
  );
}