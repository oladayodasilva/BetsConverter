export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED" | "EDITED";

export type VerificationItem = {
  id: string;
  sourceBookmaker: string;
  targetBookmaker: string;
  sourceCode: string;
  matchName: string;
  sourceMarket: string;
  sourceSelection: string;
  sourceOdds: number;
  targetEvent: string;
  targetMarket: string;
  targetSelection: string;
  targetOdds: number;
  confidenceScore: number;
  status: VerificationStatus;
};