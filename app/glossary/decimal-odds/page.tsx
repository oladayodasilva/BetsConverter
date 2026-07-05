import Link from "next/link";

export const metadata = {
  title: "What Are Decimal Odds? | BetsConverter",
  description: "Learn what decimal odds mean and how to calculate betting returns.",
};

export default function DecimalOddsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">What Are Decimal Odds?</h1>

      <p className="mb-4 text-slate-800">
        Decimal odds show the total return for every 1 unit staked. For example,
        odds of 2.50 mean that a ₦1,000 stake would return ₦2,500 if the bet wins.
      </p>

      <div className="mb-6 rounded-xl bg-green-50 p-5 text-green-800">
        Formula: Stake × Decimal Odds = Total Return
      </div>

      <p className="mb-4 text-slate-800">
        Profit is calculated by subtracting your original stake from the total return.
      </p>

      <div className="mb-6 rounded-xl bg-gray-50 p-5">
        Example: ₦1,000 × 2.50 = ₦2,500 total return. Profit = ₦1,500.
      </div>

      <Link
        href="/tools/odds-converter"
        className="font-semibold text-green-700"
      >
        Try the Odds Converter →
      </Link>
    </article>
  );
}