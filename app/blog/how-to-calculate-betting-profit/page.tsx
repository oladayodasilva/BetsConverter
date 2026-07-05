import Link from "next/link";

export const metadata = {
  title: "How to Calculate Betting Profit | BetsConverter",
  description: "Learn how to calculate betting profit, total returns, and stake outcomes.",
};

export default function CalculateProfitBlogPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 text-slate-900">
      <h1 className="mb-4 text-4xl font-bold text-slate-900">
        How to Calculate Betting Profit
      </h1>

      <p className="mb-4 text-slate-800">
        Betting profit is the amount you win after removing your original stake.
      </p>

      <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5 text-slate-900">
        Formula: Stake × Odds = Total Return. Profit = Total Return − Stake.
      </div>

      <p className="mb-4 text-slate-800">
        Example: if you stake ₦1,000 at odds of 2.50, your total return is ₦2,500.
        Your profit is ₦1,500.
      </p>

      <Link href="/tools/profit-calculator" className="font-semibold text-green-700">
        Use the Profit Calculator →
      </Link>
    </article>
  );
}