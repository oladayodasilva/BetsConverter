import { NextResponse } from "next/server";
import { readSportyBetCode } from "@/lib/readers/sportybetReader";

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
        { message: "Only SportyBet reader is available in Week 8." },
        { status: 400 }
      );
    }

    const result = await readSportyBetCode(code);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: "Could not read booking code." },
      { status: 500 }
    );
  }
}