import type { NormalizedSlip, TargetEvent } from "./types";

export const mockSportyBetSlips: NormalizedSlip[] = [
  {
    sourceBookmaker: "sportybet",
    sourceCode: "SP12345",
    selections: [
      {
        id: "sel_1",
        sport: "football",
        league: "Premier League",
        homeTeam: "Manchester United",
        awayTeam: "Chelsea",
        startTime: "2026-07-01T18:00:00",
        market: "MATCH_RESULT",
        selection: "HOME_WIN",
        odds: 2.1,
      },
      {
        id: "sel_2",
        sport: "football",
        league: "La Liga",
        homeTeam: "Barcelona",
        awayTeam: "Sevilla",
        startTime: "2026-07-01T20:00:00",
        market: "OVER_UNDER",
        selection: "OVER_2_5",
        odds: 1.75,
      },
    ],
  },
];

export const mockBet9jaEvents: TargetEvent[] = [
  {
    id: "b9_event_1",
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
    ],
  },
  {
    id: "b9_event_2",
    bookmaker: "bet9ja",
    league: "Spanish La Liga",
    homeTeam: "Barcelona",
    awayTeam: "Sevilla",
    startTime: "2026-07-01T20:00:00",
    markets: [
      {
        market: "OVER_UNDER",
        selections: [
          { selection: "OVER_2_5", odds: 1.72 },
          { selection: "UNDER_2_5", odds: 2.05 },
        ],
      },
    ],
  },
];

export const mockOneXBetEvents: TargetEvent[] = [
  {
    id: "x_event_1",
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
          { selection: "DRAW", odds: 3.3 },
          { selection: "AWAY_WIN", odds: 3.0 },
        ],
      },
    ],
  },
  {
    id: "x_event_2",
    bookmaker: "onexbet",
    league: "LaLiga",
    homeTeam: "FC Barcelona",
    awayTeam: "Sevilla",
    startTime: "2026-07-01T20:00:00",
    markets: [
      {
        market: "OVER_UNDER",
        selections: [
          { selection: "OVER_2_5", odds: 1.78 },
          { selection: "UNDER_2_5", odds: 2.0 },
        ],
      },
    ],
  },
];