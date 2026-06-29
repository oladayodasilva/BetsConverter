export function calculateConfidenceScore({
    teamMatchScore,
    timeMatchScore,
    leagueMatchScore,
    marketMatchScore,
    selectionMatchScore,
  }: {
    teamMatchScore: number;
    timeMatchScore: number;
    leagueMatchScore: number;
    marketMatchScore: number;
    selectionMatchScore: number;
  }) {
    return (
      teamMatchScore +
      timeMatchScore +
      leagueMatchScore +
      marketMatchScore +
      selectionMatchScore
    );
  }
  
  export function getConfidenceLabel(score: number) {
    if (score >= 90) return "High confidence";
    if (score >= 70) return "Medium confidence";
    return "Needs review";
  }