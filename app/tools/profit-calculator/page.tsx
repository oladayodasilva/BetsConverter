import ProfitCalculator from "@/components/ProfitCalculator";

export const metadata = {
  title: "Bet Profit Calculator | BetsConverter",
  description: "Calculate betting profit and total returns from stake and odds.",
};

export default function ProfitCalculatorPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Betting Calculator
        </p>

        <h1 className="text-4xl font-bold">Bet Profit Calculator</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Enter your stake and decimal odds to calculate your total return and profit.
        </p>
      </div>

      <ProfitCalculator />
    </section>
  );
}