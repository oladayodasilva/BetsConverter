-- CreateTable
CREATE TABLE "CodeReadTest" (
    "id" TEXT NOT NULL,
    "bookmaker" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "rawText" TEXT,
    "parsedSlip" JSONB,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeReadTest_pkey" PRIMARY KEY ("id")
);
