import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/responsible-gambling">Responsible Gambling</Link>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} BetsConverter. Betting involves risk.
          BetsConverter does not provide fixed games, sure odds, or guaranteed profit.
        </p>
      </div>
    </footer>
  );
}