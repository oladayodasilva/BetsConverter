import ArbitrageCalculator from "@/components/ArbitrageCalculator";

export const metadata = {
  title: "Arbitrage Calculator | BetsConverter",
  description:
    "Calculate betting arbitrage opportunities, stake distribution, and guaranteed profit.",
};

export default function ArbitrageCalculatorPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Betting Calculator
        </p>

        <h1 className="text-4xl font-bold">Arbitrage Calculator</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Check whether odds from different bookmakers create a guaranteed profit
          opportunity and calculate how much to stake on each outcome.
        </p>
      </div>

      <ArbitrageCalculator />
    </section>
  );
}