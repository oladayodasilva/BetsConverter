import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-green-700">
          BetsConverter
        </Link>

        <div className="flex gap-6 text-sm font-medium text-black-700">
          <Link href="/tools/manual-slip-converter">Manual Converter</Link>
          <Link href="/tools/odds-converter">Odds</Link>
          <Link href="/tools/profit-calculator">Profit</Link>
          <Link href="/tools/accumulator-calculator">Accumulator</Link>
          <Link href="/tools/cashout-calculator">Cashout</Link>
          <Link href="/tools/arbitrage-calculator">Arbitrage</Link>
        </div>
      </nav>
    </header>
  );
}