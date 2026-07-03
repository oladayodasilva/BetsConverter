import { NextResponse } from "next/server";
import { parseSportyBetRawText } from "@/lib/readers/parsers/sportybetParser";
import { mockSportyBetRawText } from "@/lib/readers/mockRawText";

export async function GET() {
  const parsed = parseSportyBetRawText({
    sourceCode: "SP12345",
    rawText: mockSportyBetRawText,
  });

  return NextResponse.json(parsed);
}