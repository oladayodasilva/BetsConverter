import { normalizeTeamName } from "@/lib/booking/teamAliases";
import type { SupportedBookmaker } from "./bookmakerConfig";
import { getDisplayMarket } from "./marketDictionary";
import { getDisplaySelection } from "./selectionDictionary";
import { targetEvents } from "./targetEvents";
import type { ParsedSlip, ParsedSelection } from "@/lib/readers/readerTypes";

function minutesDifference(dateA: string, dateB: string) {
  return Math.abs(new Date(dateA).getTime() - new Date(dateB).getTime()) / 1000 / 60;
}

function leagueSimilarity(sourceLeague: string, targetLeague: string) {
  const source = sourceLeague.toLowerCase();
  const target = targetLeague.toLowerCase();

  if (source === target) return 15;
  if (source.includes("premier") && target.includes("premier")) return 12;
  if (source.includes("liga") && target.includes("liga")) return 12;
  if (source.includes("serie") && target.includes("serie")) return 12;

  return 0;
}

function scoreEventMatch(source: ParsedSelection, target: any) {
  let score = 0;

  const sourceHome = normalizeTeamName(source.homeTeam);
  const sourceAway = normalizeTeamName(source.awayTeam);
  const targetHome = normalizeTeamName(target.homeTeam);
  const targetAway = normalizeTeamName(target.awayTeam);

  if (sourceHome === targetHome) score += 25;
  if (sourceAway === targetAway) score += 25;

  score += leagueSimilarity(source.league, target.league);

  const diff = minutesDifference(source.startTime, target.startTime);

  if (diff === 0) score += 20;
  else if (diff <= 15) score += 15;
  else if (diff <= 60) score += 8;

  const market = target.markets.find((item: any) => item.market === source.market);

  if (market) score += 10;

  const selection = market?.selections.find(
    (item: any) => item.selection === source.selection
  );

  if (selection) score += 5;

  const oddsDifference =
    selection && source.odds
      ? Math.abs(Number(selection.odds) - Number(source.odds))
      : null;

  if (oddsDifference !== null) {
    if (oddsDifference <= 0.05) score += 5;
    else if (oddsDifference <= 0.15) score += 3;
  }

  return {
    score,
    market,
    selection,
    oddsDifference,
  };
}

export function convertSlipAcrossBookmakers({
  slip,
  targetBookmaker,
}: {
  slip: ParsedSlip;
  targetBookmaker: SupportedBookmaker;
}) {
  const events = targetEvents[targetBookmaker];

  const convertedSelections = slip.selections.map((selection) => {
    const rankedMatches = events
      .map((event) => {
        const matchScore = scoreEventMatch(selection, event);

        return {
          event,
          ...matchScore,
        };
      })
      .sort((a, b) => b.score - a.score);

    const best = rankedMatches[0];

    const status =
      best?.score >= 90
        ? "MATCHED"
        : best?.score >= 70
        ? "NEEDS_REVIEW"
        : "NOT_MATCHED";

    return {
      source: selection,
      targetBookmaker,
      matchedEvent: best?.event || null,
      targetMarket: best?.market
        ? getDisplayMarket(targetBookmaker, best.market.market)
        : null,
      targetSelection: best?.selection
        ? {
            canonical: best.selection.selection,
            label: getDisplaySelection(targetBookmaker, best.selection.selection),
            odds: best.selection.odds,
          }
        : null,
      confidenceScore: best?.score || 0,
      oddsDifference: best?.oddsDifference,
      status,
    };
  });

  return {
    sourceBookmaker: slip.sourceBookmaker,
    targetBookmaker,
    sourceCode: slip.sourceCode,
    totalSelections: slip.selections.length,
    matchedCount: convertedSelections.filter((item) => item.status === "MATCHED")
      .length,
    reviewCount: convertedSelections.filter((item) => item.status === "NEEDS_REVIEW")
      .length,
    failedCount: convertedSelections.filter((item) => item.status === "NOT_MATCHED")
      .length,
    convertedSelections,
  };
}