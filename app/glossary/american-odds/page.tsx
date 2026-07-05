import Link from "next/link";

export const metadata = {
  title: "Glossary Topic | BetsConverter",
  description: "Learn this betting concept in simple terms.",
};

export default function GlossaryTopicPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">Glossary Topic</h1>

      <p className="mb-4 text-gray-700">
        Replace this with a simple beginner-friendly explanation.
      </p>

      <div className="mb-6 rounded-xl bg-yellow-50 p-5 text-yellow-800">
        Betting involves risk. These tools are for education and calculation only.
      </div>

      <Link href="/tools/odds-converter" className="font-semibold text-green-700">
        Try BetsConverter tools →
      </Link>
    </article>
  );
}