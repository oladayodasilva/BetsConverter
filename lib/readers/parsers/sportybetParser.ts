import type { ParsedSlip, ParsedSelection } from "@/lib/readers/readerTypes";

function normalizeMarket(line: string) {
  const value = line.toLowerCase();

  if (value.includes("1x2") || value.includes("full time result")) {
    return "MATCH_RESULT";
  }

  if (value.includes("double chance")) {
    return "DOUBLE_CHANCE";
  }

  if (value.includes("over") || value.includes("under") || value.includes("total")) {
    return "OVER_UNDER";
  }

  if (value.includes("both teams") || value.includes("btts")) {
    return "BOTH_TEAMS_TO_SCORE";
  }

  return "UNKNOWN_MARKET";
}

function normalizeSelection(line: string) {
  const value = line.toLowerCase();

  if (value === "1" || value.includes("home")) return "HOME_WIN";
  if (value === "x" || value.includes("draw")) return "DRAW";
  if (value === "2" || value.includes("away")) return "AWAY_WIN";

  if (value.includes("over 2.5")) return "OVER_2_5";
  if (value.includes("under 2.5")) return "UNDER_2_5";
  if (value.includes("over 1.5")) return "OVER_1_5";
  if (value.includes("under 1.5")) return "UNDER_1_5";

  if (value.includes("yes")) return "BTTS_YES";
  if (value.includes("no")) return "BTTS_NO";

  return "UNKNOWN_SELECTION";
}

function extractOdds(line: string) {
  const match = line.match(/\b\d+(\.\d{1,2})\b/);

  if (!match) return null;

  const odds = Number(match[0]);

  if (odds <= 1) return null;

  return odds;
}

function looksLikeMatch(line: string) {
  return (
    line.includes(" vs ") ||
    line.includes(" v ") ||
    line.includes(" - ")
  );
}

function splitTeams(line: string) {
  if (line.includes(" vs ")) {
    const [homeTeam, awayTeam] = line.split(" vs ");
    return { homeTeam: homeTeam.trim(), awayTeam: awayTeam.trim() };
  }

  if (line.includes(" v ")) {
    const [homeTeam, awayTeam] = line.split(" v ");
    return { homeTeam: homeTeam.trim(), awayTeam: awayTeam.trim() };
  }

  if (line.includes(" - ")) {
    const [homeTeam, awayTeam] = line.split(" - ");
    return { homeTeam: homeTeam.trim(), awayTeam: awayTeam.trim() };
  }

  return null;
}

export function parseSportyBetRawText({
  sourceCode,
  rawText,
}: {
  sourceCode: string;
  rawText: string;
}): ParsedSlip {
  const rawLines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const selections: ParsedSelection[] = [];
  const parserWarnings: string[] = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];

    if (!looksLikeMatch(line)) continue;

    const teams = splitTeams(line);

    if (!teams) continue;

    const nearbyLines = rawLines.slice(i, i + 8);

    const marketLine =
      nearbyLines.find((item) => normalizeMarket(item) !== "UNKNOWN_MARKET") || "";

    const selectionLine =
      nearbyLines.find((item) => normalizeSelection(item) !== "UNKNOWN_SELECTION") || "";

    const oddsLine =
      nearbyLines.find((item) => extractOdds(item) !== null) || "";

    const market = normalizeMarket(marketLine);
    const selection = normalizeSelection(selectionLine);
    const odds = extractOdds(oddsLine) || 0;

    const warnings: string[] = [];
    let confidence = 40;

    if (market !== "UNKNOWN_MARKET") confidence += 20;
    else warnings.push("Market could not be confidently detected.");

    if (selection !== "UNKNOWN_SELECTION") confidence += 20;
    else warnings.push("Selection could not be confidently detected.");

    if (odds > 1) confidence += 10;
    else warnings.push("Odds could not be detected.");

    const league =
      nearbyLines.find(
        (item) =>
          item.toLowerCase().includes("league") ||
          item.toLowerCase().includes("premier") ||
          item.toLowerCase().includes("liga") ||
          item.toLowerCase().includes("serie")
      ) || "Unknown League";

    const startTime = new Date().toISOString();

    selections.push({
      id: `parsed_${selections.length + 1}`,
      sport: "football",
      league,
      homeTeam: teams.homeTeam,
      awayTeam: teams.awayTeam,
      startTime,
      market,
      selection,
      odds,
      confidence,
      warnings,
    });
  }

  if (selections.length === 0) {
    parserWarnings.push("No selections could be parsed from the raw text.");
  }

  return {
    sourceBookmaker: "sportybet",
    sourceCode,
    selections,
    rawLines,
    parserWarnings,
  };
}