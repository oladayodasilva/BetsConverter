export function calculateBetProfit({
    stake,
    decimalOdds,
  }: {
    stake: number;
    decimalOdds: number;
  }) {
    if (stake <= 0) {
      throw new Error("Stake must be greater than zero.");
    }
  
    if (decimalOdds <= 1) {
      throw new Error("Decimal odds must be greater than 1.");
    }
  
    const totalReturn = stake * decimalOdds;
    const profit = totalReturn - stake;
  
    return {
      stake: Number(stake.toFixed(2)),
      decimalOdds: Number(decimalOdds.toFixed(2)),
      totalReturn: Number(totalReturn.toFixed(2)),
      profit: Number(profit.toFixed(2)),
    };
  }