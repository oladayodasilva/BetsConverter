import BookingCodeConverter from "@/components/BookingCodeConverter";

export const metadata = {
  title: "Booking Code Converter | BetsConverter",
  description:
    "Convert betting selections between supported bookmakers using BetsConverter's mapping engine.",
};

export default function BookingCodeConverterPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Mapping Engine
        </p>

        <h1 className="text-4xl font-bold">Booking Code Converter</h1>

        <p className="mt-3 max-w-2xl text-gray-800">
          Test how BetsConverter reads a source slip, matches the same events on
          another bookmaker, and verifies the confidence of each selection.
        </p>
      </div>

      <BookingCodeConverter />
    </section>
  );
}