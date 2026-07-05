export const metadata = {
    title: "Terms of Use | BetsConverter",
    description: "BetsConverter terms of use.",
  };
  
  export default function TermsPage() {
    return (
      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold">Terms of Use</h1>
  
        <p className="mb-4 text-gray-700">
          BetsConverter provides calculators, educational content, AI explanations,
          and bookmaker mapping tools for informational purposes only.
        </p>
  
        <p className="mb-4 text-gray-700">
          BetsConverter does not guarantee betting outcomes, provide fixed games,
          or promise profit.
        </p>
  
        <p className="mb-4 text-gray-700">
          Users are responsible for how they use the information and tools provided
          on this platform.
        </p>
  
        <p className="text-gray-700">
          These starter terms should be reviewed by a legal professional before
          commercial launch.
        </p>
      </article>
    );
  }