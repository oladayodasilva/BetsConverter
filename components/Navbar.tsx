import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-green-700">
          BetsConverter
        </Link>

        <div className="flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/tools/manual-slip-converter">Manual Converter</Link>
            <Link href="/tools/odds-converter">Odds Converter</Link>
            <Link href="/tools/implied-probability">Probability</Link>
             <Link href="/tools/profit-calculator">Profit</Link>
        </div>
      </nav>
    </header>
  );
}