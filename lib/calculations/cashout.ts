export function calculateCashout({
    stake,
    originalOdds,
    currentCashout,
  }: {
    stake: number;
    originalOdds: number;
    currentCashout: number;
  }) {
    if (stake <= 0) {
      throw new Error("Stake must be greater than zero.");
    }
  
    if (originalOdds <= 1) {
      throw new Error("Original odds must be greater than 1.");
    }
  
    if (currentCashout < 0) {
      throw new Error("Cashout value cannot be negative.");
    }
  
    const potentialReturn = stake * originalOdds;
    const potentialProfit = potentialReturn - stake;
    const cashoutProfit = currentCashout - stake;
    const cashoutPercentage = (currentCashout / potentialReturn) * 100;
  
    let recommendation = "Neutral";
  
    if (cashoutPercentage >= 75) {
      recommendation = "Strong cashout offer compared to potential return.";
    } else if (cashoutPercentage >= 50) {
      recommendation = "Moderate cashout offer. Consider your risk.";
    } else {
      recommendation = "Low cashout offer compared to potential return.";
    }
  
    return {
      stake: Number(stake.toFixed(2)),
      originalOdds: Number(originalOdds.toFixed(2)),
      potentialReturn: Number(potentialReturn.toFixed(2)),
      potentialProfit: Number(potentialProfit.toFixed(2)),
      currentCashout: Number(currentCashout.toFixed(2)),
      cashoutProfit: Number(cashoutProfit.toFixed(2)),
      cashoutPercentage: Number(cashoutPercentage.toFixed(2)),
      recommendation,
    };
  }