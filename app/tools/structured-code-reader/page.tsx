import StructuredCodeReader from "@/components/StructuredCodeReader";

export const metadata = {
  title: "Structured Code Reader | BetsConverter",
  description:
    "Parse booking-code text into structured selections and map them to target bookmakers.",
};

export default function StructuredCodeReaderPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Parser Engine
        </p>

        <h1 className="text-4xl font-bold">Structured Code Reader</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Read a SportyBet code, extract selections, and map them to another
          bookmaker using BetsConverter’s matching engine.
        </p>
      </div>

      <StructuredCodeReader />
    </section>
  );
}