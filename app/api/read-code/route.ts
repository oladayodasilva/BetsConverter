import { NextResponse } from "next/server";
import { readSportyBetCode } from "@/lib/readers/sportybetReader";
import { parseSportyBetRawText } from "@/lib/readers/parsers/sportybetParser";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bookmaker = String(body.bookmaker || "").toLowerCase();
    const code = String(body.code || "").trim();

    if (!bookmaker || !code) {
      return NextResponse.json(
        { message: "Bookmaker and code are required." },
        { status: 400 }
      );
    }

    if (bookmaker !== "sportybet") {
      return NextResponse.json(
        { message: "Only SportyBet reader is available in Week 9." },
        { status: 400 }
      );
    }

    const result = await readSportyBetCode(code);

    if (!result.success || !result.rawText) {
      return NextResponse.json(result);
    }

    const parsedSlip = parseSportyBetRawText({
      sourceCode: code,
      rawText: result.rawText,
    });

    return NextResponse.json({
      ...result,
      parsedSlip,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not read booking code." },
      { status: 500 }
    );
  }
}