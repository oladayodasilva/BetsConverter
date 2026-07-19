import { NextResponse } from "next/server";
import { readSportyBetCode } from "@/lib/readers/sportybetReader";
import { parseSportyBetRawText } from "@/lib/readers/parsers/sportybetParser";
import { convertSlipAcrossBookmakers } from "@/lib/bookmakers/conversionEngine";
import type { SupportedBookmaker } from "@/lib/bookmakers/bookmakerConfig";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const sourceBookmaker = String(body.sourceBookmaker || "").toLowerCase();
    const targetBookmaker = String(body.targetBookmaker || "").toLowerCase() as SupportedBookmaker;
    const code = String(body.code || "").trim();

    if (!sourceBookmaker || !targetBookmaker || !code) {
      return NextResponse.json(
        { message: "Source bookmaker, target bookmaker, and code are required." },
        { status: 400 }
      );
    }

    if (sourceBookmaker !== "sportybet") {
      return NextResponse.json(
        { message: "Only SportyBet source-code reading is available for now." },
        { status: 400 }
      );
    }

    if (!["sportybet", "bet9ja", "onexbet"].includes(targetBookmaker)) {
      return NextResponse.json(
        { message: "Unsupported target bookmaker." },
        { status: 400 }
      );
    }

    const readResult = await readSportyBetCode(code);

    if (!readResult.success || !readResult.rawText) {
      return NextResponse.json(readResult);
    }

    const parsedSlip = parseSportyBetRawText({
      sourceCode: code,
      rawText: readResult.rawText,
    });

    const conversion = convertSlipAcrossBookmakers({
      slip: parsedSlip,
      targetBookmaker,
    });

    return NextResponse.json({
      success: true,
      readResult,
      parsedSlip,
      conversion,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Code conversion failed." },
      { status: 500 }
    );
  }
}