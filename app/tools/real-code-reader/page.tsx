import RealCodeReader from "@/components/RealCodeReader";

export const metadata = {
  title: "Real Code Reader | BetsConverter",
  description: "Prototype reader for extracting booking-code slip details.",
};

export default function RealCodeReaderPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Prototype
        </p>

        <h1 className="text-4xl font-bold">Real Booking Code Reader</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Test whether BetsConverter can load a booking code and extract visible
          slip information for mapping.
        </p>
      </div>

      <RealCodeReader />
    </section>
  );
}