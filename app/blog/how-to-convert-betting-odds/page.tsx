import Link from "next/link";

export const metadata = {
  title: "How to Convert Betting Odds | BetsConverter",
  description: "Learn how to convert decimal, fractional, and American betting odds.",
};

export default function ConvertOddsBlogPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">How to Convert Betting Odds</h1>

      <p className="mb-4 text-gray-700">
        Betting odds can appear in decimal, fractional, or American formats.
        The format changes how odds are displayed, but the underlying probability
        and potential return remain connected.
      </p>

      <h2 className="mb-3 mt-8 text-2xl font-bold">Decimal Odds</h2>
      <p className="mb-4 text-gray-700">
        Decimal odds show the total return. A ₦1,000 stake at 2.50 odds returns
        ₦2,500 if successful.
      </p>

      <h2 className="mb-3 mt-8 text-2xl font-bold">Fractional Odds</h2>
      <p className="mb-4 text-gray-700">
        Fractional odds show profit relative to stake. Odds of 3/2 mean you win
        ₦3 for every ₦2 staked.
      </p>

      <h2 className="mb-3 mt-8 text-2xl font-bold">American Odds</h2>
      <p className="mb-4 text-gray-700">
        Positive American odds show profit on a 100-unit stake. Negative odds show
        how much you need to stake to win 100 units.
      </p>

      <div className="my-6 rounded-xl bg-yellow-50 p-5 text-yellow-800">
        BetsConverter is for education and calculation only. Betting involves risk.
      </div>

      <Link
        href="/tools/odds-converter"
        className="font-semibold text-green-700"
      >
        Use the free Odds Converter →
      </Link>
    </article>
  );
}