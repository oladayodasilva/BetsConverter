-- CreateTable
CREATE TABLE "aiChat" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aiChat_pkey" PRIMARY KEY ("id")
);
