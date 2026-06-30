import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function SavedCalculationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold">Login required</h1>
          <Link
            href="/login"
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </section>
    );
  }

  const calculations = await prisma.calculation.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Saved Calculations</h1>
        <p className="mt-3 text-gray-600">
          Your saved BetsConverter calculations.
        </p>
      </div>

      {calculations.length === 0 && (
        <div className="rounded-xl border bg-white p-6 text-gray-600 shadow-sm">
          No saved calculations yet.
        </div>
      )}

      <div className="space-y-4">
        {calculations.map((calculation) => (
          <div
            key={calculation.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold capitalize">
                {calculation.type.replaceAll("_", " ")}
              </h2>

              <p className="text-xs text-gray-500">
                {new Date(calculation.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm font-semibold">Input</p>
                <pre className="overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
                  {JSON.stringify(calculation.input, null, 2)}
                </pre>
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold">Result</p>
                <pre className="overflow-auto rounded-lg bg-gray-50 p-3 text-xs">
                  {JSON.stringify(calculation.result, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}