import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import VerificationDashboard from "@/components/VerificationDashboard";

export const metadata = {
  title: "Verification Dashboard | BetsConverter",
  description: "Review and verify bookmaker mapping results.",
};

export default async function VerificationPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold">Login required</h1>
          <p className="mb-6 text-gray-600">
            You need to login before accessing verification.
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
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          Quality Control
        </p>

        <h1 className="text-4xl font-bold">Verification Dashboard</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Review uncertain booking-code matches, correct wrong mappings, and approve
          verified conversions before they are trusted by the system.
        </p>
      </div>

      <VerificationDashboard />
    </section>
  );
}