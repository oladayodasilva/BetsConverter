import Link from "next/link";

const glossaryItems = [
  {
    title: "Decimal Odds",
    href: "/glossary/decimal-odds",
    description: "Learn how decimal odds work and how to calculate returns.",
  },
  {
    title: "American Odds",
    href: "/glossary/american-odds",
    description: "Understand positive and negative American betting odds.",
  },
  {
    title: "Fractional Odds",
    href: "/glossary/fractional-odds",
    description: "Learn how UK-style fractional odds are calculated.",
  },
  {
    title: "Implied Probability",
    href: "/glossary/implied-probability",
    description: "Understand the probability hidden inside betting odds.",
  },
  {
    title: "Arbitrage Betting",
    href: "/glossary/arbitrage-betting",
    description: "Learn what arbitrage means and how stake splitting works.",
  },
];

export const metadata = {
  title: "Betting Glossary | BetsConverter",
  description: "Simple explanations of betting odds, probability, arbitrage, and betting terms.",
};

export default function GlossaryPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">Betting Glossary</h1>

      <p className="mb-8 max-w-2xl text-gray-600">
        Learn common betting terms in simple language. BetsConverter focuses on
        education, calculators, and risk awareness.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {glossaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}