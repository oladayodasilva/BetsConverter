export type ArbitrageOutcome = {
    name: string;
    odds: number;
  };
  
  export function calculateArbitrage({
    bankroll,
    outcomes,
  }: {
    bankroll: number;
    outcomes: ArbitrageOutcome[];
  }) {
    if (bankroll <= 0) {
      throw new Error("Bankroll must be greater than zero.");
    }
  
    if (outcomes.length < 2) {
      throw new Error("Add at least two outcomes.");
    }
  
    if (outcomes.some((outcome) => outcome.odds <= 1 || Number.isNaN(outcome.odds))) {
      throw new Error("Each odd must be greater than 1.");
    }
  
    const impliedProbabilities = outcomes.map((outcome) => 1 / outcome.odds);
    const totalImpliedProbability = impliedProbabilities.reduce(
      (sum, probability) => sum + probability,
      0
    );
  
    const isArbitrage = totalImpliedProbability < 1;
    const profitMargin = (1 - totalImpliedProbability) * 100;
  
    const stakes = outcomes.map((outcome) => {
      const stake = bankroll * ((1 / outcome.odds) / totalImpliedProbability);
      const returnAmount = stake * outcome.odds;
  
      return {
        name: outcome.name,
        odds: outcome.odds,
        stake: Number(stake.toFixed(2)),
        returnAmount: Number(returnAmount.toFixed(2)),
      };
    });
  
    const guaranteedReturn = stakes[0]?.returnAmount || 0;
    const guaranteedProfit = guaranteedReturn - bankroll;
  
    return {
      bankroll: Number(bankroll.toFixed(2)),
      outcomes: stakes,
      totalImpliedProbability: Number((totalImpliedProbability * 100).toFixed(2)),
      isArbitrage,
      profitMargin: Number(profitMargin.toFixed(2)),
      guaranteedReturn: Number(guaranteedReturn.toFixed(2)),
      guaranteedProfit: Number(guaranteedProfit.toFixed(2)),
    };
  }