import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-green-700">
          BetsConverter
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-900">
          <div className="group relative">
            <button className="transition-colors hover:text-green-700">
              Tools
            </button>

            <div className="invisible absolute left-0 top-full z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-3 text-slate-900 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <Link href="/tools/manual-slip-converter" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Manual Converter
              </Link>
              <Link href="/tools/odds-converter" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Odds Converter
              </Link>
              <Link href="/tools/profit-calculator" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Profit Calculator
              </Link>
              <Link href="/tools/accumulator-calculator" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Accumulator
              </Link>
              <Link href="/tools/cashout-calculator" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Cashout
              </Link>
              <Link href="/tools/arbitrage-calculator" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Arbitrage
              </Link>
              <Link href="/tools/booking-code-converter" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Code Converter
              </Link>
              <Link href="/tools/real-code-reader" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Real Reader
              </Link>
              <Link href="/tools/structured-code-reader" className="block rounded-lg px-3 py-2 hover:bg-green-50 hover:text-green-700">
                Structured Reader
              </Link>
            </div>
          </div>

          <Link href="/ai-assistant" className="transition-colors hover:text-green-700">
            AI
          </Link>

          <Link href="/dashboard/verification" className="transition-colors hover:text-green-700">
            Verify
          </Link>

          <Link href="/blog" className="transition-colors hover:text-green-700">
            Blog
          </Link>

          <Link href="/dashboard" className="transition-colors hover:text-green-700">
            Dashboard
          </Link>

          <Link href="/login" className="transition-colors hover:text-green-700">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}