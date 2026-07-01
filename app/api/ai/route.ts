import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BETSCONVERTER_SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { message: "Message is required." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: "OpenAI API key is missing." },
        { status: 500 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions: BETSCONVERTER_SYSTEM_PROMPT,
      input: message,
    });

    const aiText =
      response.output_text ||
      "I could not generate a response. Please try again.";

    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
      await prisma.aiChat.create({
        data: {
          userId: session.user.id,
          prompt: message,
          response: aiText,
        },
      });
    }

    return NextResponse.json({ response: aiText });
  } catch (error) {
    console.error(error);

    if ((error as any)?.status === 429 || (error as any)?.code === "insufficient_quota") {
        return NextResponse.json(
          {
            message:
              "OpenAI quota exceeded. Please add API credits or check your billing plan.",
          },
          { status: 429 }
        );
      }  

    return NextResponse.json(
      { message: "AI assistant failed. Please try again." },
      { status: 500 }
    );
  }
}