import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function SavedCalculationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-900 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            Login required
          </h1>

          <Link
            href="/login"
            className="inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-800"
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
        <h1 className="text-4xl font-bold text-white">
          Saved Calculations
        </h1>

        <p className="mt-3 text-white">
          Your saved BetsConverter calculations.
        </p>
      </div>

      {calculations.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-slate-600 shadow-sm">
          No saved calculations yet.
        </div>
      )}

      <div className="space-y-4">
        {calculations.map((calculation) => (
          <div
            key={calculation.id}
            className="rounded-xl border border-gray-200 bg-white p-5 text-slate-900 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-bold capitalize text-slate-900">
                {calculation.type.replaceAll("_", " ")}
              </h2>

              <p className="text-xs text-slate-500">
                {new Date(calculation.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-800">
                  Input
                </p>

                <pre className="overflow-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
                  {JSON.stringify(calculation.input, null, 2)}
                </pre>
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold text-slate-800">
                  Result
                </p>

                <pre className="overflow-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
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