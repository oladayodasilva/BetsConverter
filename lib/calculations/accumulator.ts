export function calculateAccumulator({
    stake,
    odds,
  }: {
    stake: number;
    odds: number[];
  }) {
    if (stake <= 0) {
      throw new Error("Stake must be greater than zero.");
    }
  
    if (!odds.length) {
      throw new Error("Add at least one selection.");
    }
  
    if (odds.some((odd) => odd <= 1 || Number.isNaN(odd))) {
      throw new Error("Each odd must be greater than 1.");
    }
  
    const totalOdds = odds.reduce((total, odd) => total * odd, 1);
    const totalReturn = stake * totalOdds;
    const profit = totalReturn - stake;
  
    return {
      stake: Number(stake.toFixed(2)),
      totalOdds: Number(totalOdds.toFixed(2)),
      totalReturn: Number(totalReturn.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      selections: odds.length,
    };
  }