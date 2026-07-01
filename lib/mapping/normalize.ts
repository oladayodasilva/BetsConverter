import type { Bookmaker } from "./bookmakers";
import { marketMappings, type Market } from "./markets";
import { selectionMappings, reverseSelectionLabels } from "./selections";
import { calculateConfidenceScore, getConfidenceLabel } from "./confidence";

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function findCanonicalMarket(
  sourceBookmaker: Bookmaker,
  marketName: string
): Market | undefined {
  const sourceMappings = marketMappings[sourceBookmaker];

  const sourceMatch = Object.entries(sourceMappings).find(
    ([label]) => normalizeText(label) === normalizeText(marketName)
  )?.[1];

  if (sourceMatch) return sourceMatch;

  for (const mappings of Object.values(marketMappings)) {
    const fallbackMatch = Object.entries(mappings).find(
      ([label]) => normalizeText(label) === normalizeText(marketName)
    )?.[1];

    if (fallbackMatch) return fallbackMatch;
  }

  return undefined;
}

function findCanonicalSelection({
  canonicalMarket,
  sourceBookmaker,
  selectionName,
}: {
  canonicalMarket: Market;
  sourceBookmaker: Bookmaker;
  selectionName: string;
}) {
  const sourceMappings = selectionMappings[canonicalMarket]?.[sourceBookmaker];

  const sourceMatch = sourceMappings
    ? Object.entries(sourceMappings).find(
        ([label]) => normalizeText(label) === normalizeText(selectionName)
      )?.[1]
    : undefined;

  if (sourceMatch) return sourceMatch;

  const allMarketMappings = selectionMappings[canonicalMarket];

  if (!allMarketMappings) return undefined;

  for (const mappings of Object.values(allMarketMappings)) {
    const fallbackMatch = Object.entries(mappings).find(
      ([label]) => normalizeText(label) === normalizeText(selectionName)
    )?.[1];

    if (fallbackMatch) return fallbackMatch;
  }

  return undefined;
}

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
  const canonicalMarket = findCanonicalMarket(sourceBookmaker, marketName);

  if (!canonicalMarket) {
    return {
      success: false,
      message: "Market could not be mapped.",
    };
  }

  const canonicalSelection = findCanonicalSelection({
    canonicalMarket,
    sourceBookmaker,
    selectionName,
  });

  if (!canonicalSelection) {
    return {
      success: false,
      message: "Selection could not be mapped.",
    };
  }

  const targetSelection =
    reverseSelectionLabels[targetBookmaker]?.[canonicalSelection];

  if (!targetSelection) {
    return {
      success: false,
      message: "Target selection label could not be found.",
    };
  }

  const targetMarketEntry = Object.entries(marketMappings[targetBookmaker]).find(
    ([, value]) => value === canonicalMarket
  );

  if (!targetMarketEntry) {
    return {
      success: false,
      message: "Target market label could not be found.",
    };
  }

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
    targetMarket: targetMarketEntry[0],
    targetSelection,
    confidenceScore,
    confidenceLabel: getConfidenceLabel(confidenceScore),
  };
}