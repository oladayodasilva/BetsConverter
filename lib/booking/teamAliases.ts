export const teamAliases: Record<string, string[]> = {
    "Manchester United": [
      "Manchester United",
      "Man United",
      "Man Utd",
      "Manchester Utd",
      "Manchester United FC",
    ],
  
    Chelsea: ["Chelsea", "Chelsea FC"],
  
    Barcelona: ["Barcelona", "FC Barcelona", "Barca", "Barça"],
  
    Sevilla: ["Sevilla", "Sevilla FC"],
  };
  
  export function normalizeTeamName(name: string) {
    const cleaned = name.toLowerCase().trim();
  
    for (const [canonical, aliases] of Object.entries(teamAliases)) {
      const normalizedAliases = aliases.map((alias) => alias.toLowerCase().trim());
  
      if (normalizedAliases.includes(cleaned)) {
        return canonical;
      }
    }
  
    return name.trim();
  }