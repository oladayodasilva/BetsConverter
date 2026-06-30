import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-green-700">
          BetsConverter
        </Link>

        <div className="flex gap-6 text-sm font-medium text-slate-800">
          <Link
            href="/tools/manual-slip-converter"
            className="transition-colors hover:text-green-700"
          >
            Manual Converter
          </Link>

          <Link
            href="/tools/odds-converter"
            className="transition-colors hover:text-green-700"
          >
            Odds
          </Link>

          <Link
            href="/tools/profit-calculator"
            className="transition-colors hover:text-green-700"
          >
            Profit
          </Link>

          <Link
            href="/tools/accumulator-calculator"
            className="transition-colors hover:text-green-700"
          >
            Accumulator
          </Link>

          <Link
            href="/tools/cashout-calculator"
            className="transition-colors hover:text-green-700"
          >
            Cashout
          </Link>

          <Link
            href="/tools/arbitrage-calculator"
            className="transition-colors hover:text-green-700"
          >
            Arbitrage
          </Link>

          <Link 
            href="/dashboard"
            className="transition-colors hover:text-green-700"
          >
            Dashboard
          </Link>
          
          <Link 
            href="/login"
            className="transition-colors hover:text-green-700"
            >
              Login
          </Link>


        </div>
      </nav>
    </header>
  );
}