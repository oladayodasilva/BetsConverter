import type { Bookmaker } from "./bookmakers";
import type { Market } from "./markets";

export const selectionMappings: Partial<
  Record<Market, Record<Bookmaker, Record<string, string>>>
> = {
  MATCH_RESULT: {
    sportybet: {
      Home: "HOME_WIN",
      "1": "HOME_WIN",
      Draw: "DRAW",
      X: "DRAW",
      Away: "AWAY_WIN",
      "2": "AWAY_WIN",
    },
    bet9ja: {
      "1": "HOME_WIN",
      X: "DRAW",
      "2": "AWAY_WIN",
      Home: "HOME_WIN",
      Draw: "DRAW",
      Away: "AWAY_WIN",
    },
    onexbet: {
      "1": "HOME_WIN",
      X: "DRAW",
      "2": "AWAY_WIN",
      Home: "HOME_WIN",
      Draw: "DRAW",
      Away: "AWAY_WIN",
    },
  },

  BOTH_TEAMS_TO_SCORE: {
    sportybet: {
      Yes: "BTTS_YES",
      No: "BTTS_NO",
    },
    bet9ja: {
      GG: "BTTS_YES",
      NG: "BTTS_NO",
      Yes: "BTTS_YES",
      No: "BTTS_NO",
    },
    onexbet: {
      Yes: "BTTS_YES",
      No: "BTTS_NO",
    },
  },
};

export const reverseSelectionLabels: Record<Bookmaker, Record<string, string>> = {
  sportybet: {
    HOME_WIN: "Home",
    DRAW: "Draw",
    AWAY_WIN: "Away",
    BTTS_YES: "Yes",
    BTTS_NO: "No",
  },
  bet9ja: {
    HOME_WIN: "1",
    DRAW: "X",
    AWAY_WIN: "2",
    BTTS_YES: "GG",
    BTTS_NO: "NG",
  },
  onexbet: {
    HOME_WIN: "1",
    DRAW: "X",
    AWAY_WIN: "2",
    BTTS_YES: "Yes",
    BTTS_NO: "No",
  },
};