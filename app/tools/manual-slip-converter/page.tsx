import ManualSlipConverter from "@/components/ManualSlipConverter";

export default function ManualSlipConverterPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Mapping Lab
        </p>

        <h1 className="text-4xl font-bold">Manual Slip Converter</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Test how BetsConverter maps markets and selections between bookmakers.
          This is the foundation for future booking-code conversion.
        </p>
      </div>

      <ManualSlipConverter />
    </section>
  );
}