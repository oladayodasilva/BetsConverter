import type { Bookmaker } from "./bookmakers";
import { marketMappings } from "./markets";
import { selectionMappings, reverseSelectionLabels } from "./selections";
import { calculateConfidenceScore, getConfidenceLabel } from "./confidence";

export function convertManualSlip({
  sourceBookmaker,
  targetBookmaker,
  marketName,
  selectionName,
}: {
  sourceBookmaker: Bookmaker;
  targetBookmaker: Bookmaker;
  marketName: string;
  selectionName: string;
}) {
  const canonicalMarket = marketMappings[sourceBookmaker][marketName];

  if (!canonicalMarket) {
    return {
      success: false,
      message: "Market could not be mapped.",
    };
  }

  const canonicalSelection =
    selectionMappings[canonicalMarket]?.[sourceBookmaker]?.[selectionName];

  if (!canonicalSelection) {
    return {
      success: false,
      message: "Selection could not be mapped.",
    };
  }

  const targetSelection =
    reverseSelectionLabels[targetBookmaker][canonicalSelection];

  if (!targetSelection) {
    return {
      success: false,
      message: "Target selection label could not be found.",
    };
  }

  const targetMarketEntry = Object.entries(marketMappings[targetBookmaker]).find(
    ([, value]) => value === canonicalMarket
  );

  const confidenceScore = calculateConfidenceScore({
    teamMatchScore: 40,
    timeMatchScore: 20,
    leagueMatchScore: 10,
    marketMatchScore: 20,
    selectionMatchScore: 10,
  });

  return {
    success: true,
    sourceBookmaker,
    targetBookmaker,
    canonicalMarket,
    canonicalSelection,
    targetMarket: targetMarketEntry?.[0] || canonicalMarket,
    targetSelection,
    confidenceScore,
    confidenceLabel: getConfidenceLabel(confidenceScore),
  };
}