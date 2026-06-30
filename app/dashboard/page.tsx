import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold">Login required</h1>
          <p className="mb-6 text-gray-600">
            You need to login before accessing your dashboard.
          </p>

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

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-3 text-4xl font-bold">Dashboard</h1>

      <p className="mb-8 text-gray-600">
        Welcome back, {session.user.name || session.user.email}.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/dashboard/saved-calculations"
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <h2 className="mb-2 font-bold">Saved Calculations</h2>
          <p className="text-sm text-gray-600">
            View your saved odds, profit, accumulator, and arbitrage calculations.
          </p>
        </Link>

        <Link
          href="/tools/arbitrage-calculator"
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <h2 className="mb-2 font-bold">Arbitrage Calculator</h2>
          <p className="text-sm text-gray-600">
            Check stake distribution and profit margins.
          </p>
        </Link>

        <Link
          href="/tools/manual-slip-converter"
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <h2 className="mb-2 font-bold">Manual Converter</h2>
          <p className="text-sm text-gray-600">
            Test bookmaker market and selection mapping.
          </p>
        </Link>
      </div>
    </section>
  );
}