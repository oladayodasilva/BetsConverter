import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const calculations = await prisma.calculation.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(calculations);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();

  if (!body.type || !body.input || !body.result) {
    return NextResponse.json(
      { message: "Type, input, and result are required." },
      { status: 400 }
    );
  }

  const calculation = await prisma.calculation.create({
    data: {
      userId: session.user.id,
      type: body.type,
      input: body.input,
      result: body.result,
    },
  });

  return NextResponse.json(calculation, { status: 201 });
}