import type { NormalizedSlip, TargetEvent } from "./types";
import { normalizeTeamName } from "./teamAliases";

function minutesDifference(dateA: string, dateB: string) {
  const timeA = new Date(dateA).getTime();
  const timeB = new Date(dateB).getTime();

  return Math.abs(timeA - timeB) / 1000 / 60;
}

function calculateEventConfidence(source: NormalizedSlip["selections"][number], target: TargetEvent) {
  let score = 0;

  const sourceHome = normalizeTeamName(source.homeTeam);
  const sourceAway = normalizeTeamName(source.awayTeam);
  const targetHome = normalizeTeamName(target.homeTeam);
  const targetAway = normalizeTeamName(target.awayTeam);

  if (sourceHome === targetHome) score += 25;
  if (sourceAway === targetAway) score += 25;

  const timeDiff = minutesDifference(source.startTime, target.startTime);

  if (timeDiff === 0) score += 25;
  else if (timeDiff <= 15) score += 20;
  else if (timeDiff <= 60) score += 10;

  if (
    source.league.toLowerCase().includes("premier") &&
    target.league.toLowerCase().includes("premier")
  ) {
    score += 10;
  } else if (
    source.league.toLowerCase().includes("liga") &&
    target.league.toLowerCase().includes("liga")
  ) {
    score += 10;
  }

  const targetMarket = target.markets.find((market) => market.market === source.market);

  if (targetMarket) score += 10;

  const targetSelection = targetMarket?.selections.find(
    (selection) => selection.selection === source.selection
  );

  if (targetSelection) score += 5;

  return {
    score,
    targetMarket,
    targetSelection,
  };
}

export function convertSlipToTarget({
  slip,
  targetEvents,
}: {
  slip: NormalizedSlip;
  targetEvents: TargetEvent[];
}) {
  const convertedSelections = slip.selections.map((sourceSelection) => {
    const possibleMatches = targetEvents
      .map((event) => {
        const confidence = calculateEventConfidence(sourceSelection, event);

        return {
          event,
          confidenceScore: confidence.score,
          targetMarket: confidence.targetMarket,
          targetSelection: confidence.targetSelection,
        };
      })
      .sort((a, b) => b.confidenceScore - a.confidenceScore);

    const bestMatch = possibleMatches[0];

    return {
      sourceSelection,
      matchedEvent: bestMatch?.event || null,
      targetMarket: bestMatch?.targetMarket?.market || null,
      targetSelection: bestMatch?.targetSelection || null,
      confidenceScore: bestMatch?.confidenceScore || 0,
      status:
        bestMatch?.confidenceScore >= 90
          ? "MATCHED"
          : bestMatch?.confidenceScore >= 70
          ? "NEEDS_REVIEW"
          : "NOT_MATCHED",
    };
  });

  const matchedCount = convertedSelections.filter(
    (selection) => selection.status === "MATCHED"
  ).length;

  return {
    sourceBookmaker: slip.sourceBookmaker,
    sourceCode: slip.sourceCode,
    totalSelections: slip.selections.length,
    matchedCount,
    convertedSelections,
  };
}