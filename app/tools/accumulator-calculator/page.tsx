import AccumulatorCalculator from "@/components/AccumulatorCalculator";

export const metadata = {
  title: "Accumulator Calculator | BetsConverter",
  description: "Calculate total odds, potential return, and profit for accumulator bets.",
};

export default function AccumulatorCalculatorPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Betting Calculator
        </p>

        <h1 className="text-4xl font-bold">Accumulator Calculator</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Add multiple selections to calculate total odds, total return, and profit.
        </p>
      </div>

      <AccumulatorCalculator />
    </section>
  );
}