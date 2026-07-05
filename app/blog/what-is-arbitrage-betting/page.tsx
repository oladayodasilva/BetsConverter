import Link from "next/link";

export const metadata = {
  title: "What Is Arbitrage Betting? | BetsConverter",
  description: "Learn how arbitrage betting works and how stake splitting is calculated.",
};

export default function ArbitrageBettingBlogPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 text-slate-900">
      <h1 className="mb-4 text-4xl font-bold text-slate-900">
        What Is Arbitrage Betting?
      </h1>

      <p className="mb-4 text-slate-800">
        Arbitrage betting happens when odds across bookmakers create a situation
        where all outcomes can be covered for a small guaranteed margin.
      </p>

      <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-slate-900">
        Arbitrage opportunities are rare, can disappear quickly, and may involve
        bookmaker limits or rule differences.
      </div>

      <p className="mb-4 text-slate-800">
        A calculator helps split your stake across outcomes so the return is balanced.
      </p>

      <Link href="/tools/arbitrage-calculator" className="font-semibold text-green-700">
        Use the Arbitrage Calculator →
      </Link>
    </article>
  );
}