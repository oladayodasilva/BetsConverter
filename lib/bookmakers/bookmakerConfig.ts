export type SupportedBookmaker = "sportybet" | "bet9ja" | "onexbet";

export const bookmakerConfig = {
  sportybet: {
    name: "SportyBet",
    slug: "sportybet",
    supportsCodeReading: true,
    supportsTargetMatching: true,
  },

  bet9ja: {
    name: "Bet9ja",
    slug: "bet9ja",
    supportsCodeReading: false,
    supportsTargetMatching: true,
  },

  onexbet: {
    name: "1xBet",
    slug: "onexbet",
    supportsCodeReading: false,
    supportsTargetMatching: true,
  },
} as const;