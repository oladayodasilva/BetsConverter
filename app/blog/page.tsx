import Link from "next/link";

const posts = [
  {
    title: "How to Convert Betting Odds",
    href: "/blog/how-to-convert-betting-odds",
    description: "Learn how decimal, fractional, and American odds compare.",
  },
  {
    title: "How to Calculate Betting Profit",
    href: "/blog/how-to-calculate-betting-profit",
    description: "Understand stake, return, and profit with simple examples.",
  },
  {
    title: "What Is Arbitrage Betting?",
    href: "/blog/what-is-arbitrage-betting",
    description: "Learn how arbitrage calculators split stakes across outcomes.",
  },
];

export const metadata = {
  title: "Betting Guides | BetsConverter Blog",
  description: "Simple betting guides about odds, profit, probability, and arbitrage.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">Betting Guides</h1>

      <p className="mb-8 max-w-2xl text-gray-600">
        Practical guides for understanding odds, returns, probability, and risk.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}