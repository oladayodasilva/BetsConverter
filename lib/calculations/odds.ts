export type OddsFormat = "decimal" | "american" | "fractional";

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function decimalToAmerican(decimalOdds: number): string {
  if (decimalOdds <= 1) {
    throw new Error("Decimal odds must be greater than 1.");
  }

  if (decimalOdds >= 2) {
    return `+${Math.round((decimalOdds - 1) * 100)}`;
  }

  return `${Math.round(-100 / (decimalOdds - 1))}`;
}

export function americanToDecimal(americanOdds: number): number {
  if (americanOdds === 0) {
    throw new Error("American odds cannot be zero.");
  }

  if (americanOdds > 0) {
    return Number((americanOdds / 100 + 1).toFixed(2));
  }

  return Number((100 / Math.abs(americanOdds) + 1).toFixed(2));
}

export function decimalToFractional(decimalOdds: number): string {
  if (decimalOdds <= 1) {
    throw new Error("Decimal odds must be greater than 1.");
  }

  const value = decimalOdds - 1;
  const denominator = 100;
  const numerator = Math.round(value * denominator);
  const divisor = gcd(numerator, denominator);

  return `${numerator / divisor}/${denominator / divisor}`;
}

export function fractionalToDecimal(fractionalOdds: string): number {
  const [num, den] = fractionalOdds.split("/").map(Number);

  if (!num || !den || den === 0) {
    throw new Error("Invalid fractional odds.");
  }

  return Number((num / den + 1).toFixed(2));
}

export function decimalToImpliedProbability(decimalOdds: number): number {
  if (decimalOdds <= 1) {
    throw new Error("Decimal odds must be greater than 1.");
  }

  return Number(((1 / decimalOdds) * 100).toFixed(2));
}

export function convertOdds(value: string, format: OddsFormat) {
  let decimal: number;

  if (format === "decimal") {
    decimal = Number(value);
  } else if (format === "american") {
    decimal = americanToDecimal(Number(value));
  } else {
    decimal = fractionalToDecimal(value);
  }

  if (!decimal || decimal <= 1) {
    throw new Error("Invalid odds value.");
  }

  return {
    decimal: Number(decimal.toFixed(2)),
    american: decimalToAmerican(decimal),
    fractional: decimalToFractional(decimal),
    impliedProbability: decimalToImpliedProbability(decimal),
  };
}