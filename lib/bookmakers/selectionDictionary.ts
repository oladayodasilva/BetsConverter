import type { SupportedBookmaker } from "./bookmakerConfig";
import type { CanonicalMarket } from "./marketDictionary";

export type CanonicalSelection =
  | "HOME_WIN"
  | "DRAW"
  | "AWAY_WIN"
  | "HOME_OR_DRAW"
  | "HOME_OR_AWAY"
  | "DRAW_OR_AWAY"
  | "OVER_0_5"
  | "UNDER_0_5"
  | "OVER_1_5"
  | "UNDER_1_5"
  | "OVER_2_5"
  | "UNDER_2_5"
  | "OVER_3_5"
  | "UNDER_3_5"
  | "BTTS_YES"
  | "BTTS_NO"
  | "DRAW_NO_BET_HOME"
  | "DRAW_NO_BET_AWAY";

export const selectionLabels: Record<
  SupportedBookmaker,
  Partial<Record<CanonicalSelection, string>>
> = {
  sportybet: {
    HOME_WIN: "Home",
    DRAW: "Draw",
    AWAY_WIN: "Away",
    HOME_OR_DRAW: "1X",
    HOME_OR_AWAY: "12",
    DRAW_OR_AWAY: "X2",
    OVER_0_5: "Over 0.5",
    UNDER_0_5: "Under 0.5",
    OVER_1_5: "Over 1.5",
    UNDER_1_5: "Under 1.5",
    OVER_2_5: "Over 2.5",
    UNDER_2_5: "Under 2.5",
    OVER_3_5: "Over 3.5",
    UNDER_3_5: "Under 3.5",
    BTTS_YES: "Yes",
    BTTS_NO: "No",
    DRAW_NO_BET_HOME: "Home",
    DRAW_NO_BET_AWAY: "Away",
  },

  bet9ja: {
    HOME_WIN: "1",
    DRAW: "X",
    AWAY_WIN: "2",
    HOME_OR_DRAW: "1X",
    HOME_OR_AWAY: "12",
    DRAW_OR_AWAY: "X2",
    OVER_0_5: "Over 0.5",
    UNDER_0_5: "Under 0.5",
    OVER_1_5: "Over 1.5",
    UNDER_1_5: "Under 1.5",
    OVER_2_5: "Over 2.5",
    UNDER_2_5: "Under 2.5",
    OVER_3_5: "Over 3.5",
    UNDER_3_5: "Under 3.5",
    BTTS_YES: "GG",
    BTTS_NO: "NG",
    DRAW_NO_BET_HOME: "1",
    DRAW_NO_BET_AWAY: "2",
  },

  onexbet: {
    HOME_WIN: "1",
    DRAW: "X",
    AWAY_WIN: "2",
    HOME_OR_DRAW: "1X",
    HOME_OR_AWAY: "12",
    DRAW_OR_AWAY: "X2",
    OVER_0_5: "Over 0.5",
    UNDER_0_5: "Under 0.5",
    OVER_1_5: "Over 1.5",
    UNDER_1_5: "Under 1.5",
    OVER_2_5: "Over 2.5",
    UNDER_2_5: "Under 2.5",
    OVER_3_5: "Over 3.5",
    UNDER_3_5: "Under 3.5",
    BTTS_YES: "Yes",
    BTTS_NO: "No",
    DRAW_NO_BET_HOME: "1",
    DRAW_NO_BET_AWAY: "2",
  },
};

export function getDisplaySelection(
  bookmaker: SupportedBookmaker,
  canonicalSelection: CanonicalSelection
) {
  return selectionLabels[bookmaker][canonicalSelection] || canonicalSelection;
}