import type { SupportedBookmaker } from "./bookmakerConfig";
import type { CanonicalMarket } from "./marketDictionary";
import type { CanonicalSelection } from "./selectionDictionary";

export type TargetBookmakerSelection = {
  selection: CanonicalSelection;
  odds: number;
};

export type TargetBookmakerMarket = {
  market: CanonicalMarket;
  selections: TargetBookmakerSelection[];
};

export type TargetBookmakerEvent = {
  id: string;
  bookmaker: SupportedBookmaker;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  markets: TargetBookmakerMarket[];
};

export const targetEvents: Record<SupportedBookmaker, TargetBookmakerEvent[]> = {
  sportybet: [
    {
      id: "sporty_event_1",
      bookmaker: "sportybet",
      league: "Premier League",
      homeTeam: "Manchester United",
      awayTeam: "Chelsea",
      startTime: "2026-07-01T18:00:00",
      markets: [
        {
          market: "MATCH_RESULT",
          selections: [
            { selection: "HOME_WIN", odds: 2.1 },
            { selection: "DRAW", odds: 3.45 },
            { selection: "AWAY_WIN", odds: 3.05 },
          ],
        },
        {
          market: "BOTH_TEAMS_TO_SCORE",
          selections: [
            { selection: "BTTS_YES", odds: 1.85 },
            { selection: "BTTS_NO", odds: 1.95 },
          ],
        },
      ],
    },
  ],

  bet9ja: [
    {
      id: "bet9ja_event_1",
      bookmaker: "bet9ja",
      league: "English Premier League",
      homeTeam: "Man Utd",
      awayTeam: "Chelsea",
      startTime: "2026-07-01T18:00:00",
      markets: [
        {
          market: "MATCH_RESULT",
          selections: [
            { selection: "HOME_WIN", odds: 2.05 },
            { selection: "DRAW", odds: 3.4 },
            { selection: "AWAY_WIN", odds: 3.1 },
          ],
        },
        {
          market: "BOTH_TEAMS_TO_SCORE",
          selections: [
            { selection: "BTTS_YES", odds: 1.82 },
            { selection: "BTTS_NO", odds: 1.98 },
          ],
        },
      ],
    },
  ],

  onexbet: [
    {
      id: "onex_event_1",
      bookmaker: "onexbet",
      league: "Premier League",
      homeTeam: "Manchester Utd",
      awayTeam: "Chelsea FC",
      startTime: "2026-07-01T18:00:00",
      markets: [
        {
          market: "MATCH_RESULT",
          selections: [
            { selection: "HOME_WIN", odds: 2.12 },
            { selection: "DRAW", odds: 3.35 },
            { selection: "AWAY_WIN", odds: 3.0 },
          ],
        },
        {
          market: "BOTH_TEAMS_TO_SCORE",
          selections: [
            { selection: "BTTS_YES", odds: 1.88 },
            { selection: "BTTS_NO", odds: 1.91 },
          ],
        },
      ],
    },
  ],
};