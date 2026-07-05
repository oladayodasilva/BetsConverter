export const metadata = {
    title: "Responsible Gambling | BetsConverter",
    description: "Responsible gambling information for BetsConverter users.",
  };
  
  export default function ResponsibleGamblingPage() {
    return (
      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold">Responsible Gambling</h1>
  
        <p className="mb-4 text-gray-700">
          BetsConverter provides betting calculators, education, and risk-awareness
          tools. We do not guarantee profits, fixed games, or certain outcomes.
        </p>
  
        <h2 className="mb-3 mt-8 text-2xl font-bold">Use Betting Tools Responsibly</h2>
  
        <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
          <li>Only stake money you can afford to lose.</li>
          <li>Do not treat betting as a guaranteed income source.</li>
          <li>Avoid chasing losses.</li>
          <li>Set limits before placing bets.</li>
          <li>Take breaks if betting stops feeling controlled.</li>
        </ul>
  
        <div className="rounded-xl bg-yellow-50 p-5 text-yellow-800">
          If betting is causing financial, emotional, or relationship problems,
          consider seeking support from a qualified professional or a local gambling
          support organization.
        </div>
      </article>
    );
  }