export const BOOKMAKERS = {
    SPORTYBET: "sportybet",
    BET9JA: "bet9ja",
    ONEXBET: "onexbet",
  } as const;
  
  export type Bookmaker = typeof BOOKMAKERS[keyof typeof BOOKMAKERS];