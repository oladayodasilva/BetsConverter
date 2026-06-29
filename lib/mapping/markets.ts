import type { Bookmaker } from "./bookmakers";

export const MARKETS = {
  MATCH_RESULT: "MATCH_RESULT",
  DOUBLE_CHANCE: "DOUBLE_CHANCE",
  OVER_UNDER: "OVER_UNDER",
  BOTH_TEAMS_TO_SCORE: "BOTH_TEAMS_TO_SCORE",
  DRAW_NO_BET: "DRAW_NO_BET",
  FIRST_HALF_RESULT: "FIRST_HALF_RESULT",
} as const;

export type Market = typeof MARKETS[keyof typeof MARKETS];

export const marketMappings: Record<Bookmaker, Record<string, Market>> = {
  sportybet: {
    "Full Time Result": "MATCH_RESULT",
    "1X2": "MATCH_RESULT",
    "Double Chance": "DOUBLE_CHANCE",
    "Total Goals": "OVER_UNDER",
    "Over/Under": "OVER_UNDER",
    "Both Teams To Score": "BOTH_TEAMS_TO_SCORE",
    "Draw No Bet": "DRAW_NO_BET",
    "1st Half Result": "FIRST_HALF_RESULT",
  },

  bet9ja: {
    "1X2": "MATCH_RESULT",
    "Match Result": "MATCH_RESULT",
    "Double Chance": "DOUBLE_CHANCE",
    "Under/Over": "OVER_UNDER",
    "Total Goals": "OVER_UNDER",
    "GG/NG": "BOTH_TEAMS_TO_SCORE",
    "Both Teams To Score": "BOTH_TEAMS_TO_SCORE",
    "Draw No Bet": "DRAW_NO_BET",
    "1st Half - 1X2": "FIRST_HALF_RESULT",
  },

  onexbet: {
    "Match Result": "MATCH_RESULT",
    "1X2": "MATCH_RESULT",
    "Double Chance": "DOUBLE_CHANCE",
    "Total": "OVER_UNDER",
    "Total Goals": "OVER_UNDER",
    "Both Teams To Score": "BOTH_TEAMS_TO_SCORE",
    "Draw No Bet": "DRAW_NO_BET",
    "1st Half Result": "FIRST_HALF_RESULT",
  },
};