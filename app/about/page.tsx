export const metadata = {
    title: "About | BetsConverter",
    description: "Learn about BetsConverter and its betting calculation tools.",
  };
  
  export default function AboutPage() {
    return (
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold">About BetsConverter</h1>
  
        <p className="mb-4 text-slate-800">
          BetsConverter is a betting calculation and education platform designed to
          help users understand odds, potential returns, implied probability,
          accumulator risk, arbitrage concepts, and booking-code mapping.
        </p>
  
        <p className="text-slate-800">
          BetsConverter does not guarantee wins, provide fixed matches, or place bets
          on behalf of users.
        </p>
      </section>
    );
  }