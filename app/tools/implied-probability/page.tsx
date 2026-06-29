import ImpliedProbabilityCalculator from "@/components/ImpliedProbabilityCalculator";

export const metadata = {
  title: "Implied Probability Calculator | BetsConverter",
  description: "Calculate implied probability from decimal betting odds.",
};

export default function ImpliedProbabilityPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Betting Calculator
        </p>

        <h1 className="text-4xl font-bold">Implied Probability Calculator</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Implied probability shows the chance of an outcome based on the odds offered.
        </p>
      </div>

      <ImpliedProbabilityCalculator />
    </section>
  );
}