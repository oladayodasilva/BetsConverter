import AIAssistant from "@/components/AIAssistant";

export const metadata = {
  title: "AI Betting Assistant | BetsConverter",
  description:
    "Ask questions about odds, implied probability, bankroll management, and betting calculations.",
};

export default function AIAssistantPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase text-green-700">
          AI Assistant
        </p>

        <h1 className="text-4xl font-bold">AI Betting Assistant</h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          Get beginner-friendly explanations for odds, profit, accumulator risk,
          cashout decisions, bankroll management, and betting terminology.
        </p>
      </div>

      <AIAssistant />
    </section>
  );
}