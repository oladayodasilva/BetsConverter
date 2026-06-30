import CashoutCalculator from "@/components/CashoutCalculator";

export const metadata = {
  title: "Cashout Calculator | BetsConverter",
  description: "Compare a cashout offer against your potential betting return.",
};

export default function CashoutCalculatorPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Betting Calculator
        </p>

        <h1 className="text-4xl font-bold">Cashout Calculator</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Analyze whether a cashout offer is strong, moderate, or low compared to
          your potential return.
        </p>
      </div>

      <CashoutCalculator />
    </section>
  );
}