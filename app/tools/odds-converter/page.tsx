import OddsConverter from "@/components/OddsConverter";

export const metadata = {
  title: "Odds Converter | BetsConverter",
  description: "Convert decimal, fractional, and American odds instantly.",
};

export default function OddsConverterPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Betting Calculator
        </p>

        <h1 className="text-4xl font-bold">Odds Converter</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Convert odds between decimal, fractional, and American formats. Also
          calculate implied probability from odds.
        </p>
      </div>

      <OddsConverter />
    </section>
  );
}