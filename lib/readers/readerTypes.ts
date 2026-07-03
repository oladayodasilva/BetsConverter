export type ParsedSelection = {
    id: string;
    sport: "football";
    league: string;
    homeTeam: string;
    awayTeam: string;
    startTime: string;
    market: string;
    selection: string;
    odds: number;
    confidence: number;
    warnings: string[];
  };
  
  export type ParsedSlip = {
    sourceBookmaker: "sportybet";
    sourceCode: string;
    selections: ParsedSelection[];
    rawLines: string[];
    parserWarnings: string[];
  };