import { NextResponse } from "next/server";
import { readSportyBetCode } from "@/lib/readers/sportybetReader";
import { parseSportyBetRawText } from "@/lib/readers/parsers/sportybetParser";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bookmaker = String(body.bookmaker || "").toLowerCase();
    const code = String(body.code || "").trim();

    if (!bookmaker || !code) {
      return NextResponse.json(
        {
          message: "Bookmaker and code are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (bookmaker !== "sportybet") {
      return NextResponse.json(
        {
          message: "Only SportyBet reader is available for now.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await readSportyBetCode(code);

    if (!result.success || !result.rawText) {
      await prisma.codeReadTest.create({
        data: {
          bookmaker,
          code,
          success: false,
          errorMessage: result.message || "Reader failed.",
        },
      });

      return NextResponse.json(result);
    }

    const parsedSlip = parseSportyBetRawText({
      sourceCode: code,
      rawText: result.rawText,
    });

    const parsedSlipJson = JSON.parse(
      JSON.stringify(parsedSlip)
    );

    await prisma.codeReadTest.create({
      data: {
        bookmaker,
        code,
        success: true,
        rawText: result.rawText,
        parsedSlip: parsedSlipJson,
      },
    });

    return NextResponse.json({
      ...result,
      parsedSlip,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not read booking code.";

    return NextResponse.json(
      {
        message,
      },
      {
        status: 500,
      }
    );
  }
}