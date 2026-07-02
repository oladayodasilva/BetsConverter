export type BookmakerSlug = "sportybet" | "bet9ja" | "onexbet";

export type SlipSelection = {
  id: string;
  sport: "football";
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  market: string;
  selection: string;
  odds: number;
};

export type NormalizedSlip = {
  sourceBookmaker: BookmakerSlug;
  sourceCode: string;
  selections: SlipSelection[];
};

export type TargetEvent = {
  id: string;
  bookmaker: BookmakerSlug;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  markets: {
    market: string;
    selections: {
      selection: string;
      odds: number;
    }[];
  }[];
};