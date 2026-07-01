import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AIHistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="mb-3 text-3xl font-bold">Login required</h1>
          <Link
            href="/login"
            className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </section>
    );
  }

  const chats = await prisma.aiChat.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">AI History</h1>
        <p className="mt-3 text-gray-600">
          Your saved BetsConverter AI conversations.
        </p>
      </div>

      {chats.length === 0 && (
        <div className="rounded-xl border bg-white p-6 text-gray-600 shadow-sm">
          No AI conversations yet.
        </div>
      )}

      <div className="space-y-4">
        {chats.map((chat) => (
          <div key={chat.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs text-gray-500">
              {new Date(chat.createdAt).toLocaleString()}
            </p>

            <div className="mb-4 rounded-lg bg-green-50 p-3">
              <p className="mb-1 text-sm font-semibold text-green-800">You asked:</p>
              <p className="text-sm text-gray-800">{chat.prompt}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="mb-1 text-sm font-semibold">BetsConverter AI:</p>
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {chat.response}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}