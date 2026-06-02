import type { HelocInputs, HelocResults } from '../types';

/**
 * Calculate HELOC-related metrics from home value, mortgage balance, and max LTV.
 * All logic is isolated here for testability and future extension.
 *
 * Formula: Available Equity = (Home Value × Max LTV) - Mortgage Balance
 */
export function calculateHeloc(inputs: HelocInputs): HelocResults {
  const { homeValue, currentBalance, maxLtv } = inputs;

  if (homeValue <= 0 || maxLtv <= 0) {
    return {
      homeValue: 0,
      currentBalance: 0,
      maxLtv: 80,
      maxBorrowingPower: 0,
      availableEquity: 0,
      currentLtvRatio: 0,
      helocUsagePercent: 0,
      equityPercent: 0,
      colorClass: 'success',
    };
  }

  const maxLtvDecimal = maxLtv / 100;
  const maxBorrowingPower = homeValue * maxLtvDecimal;
  const availableEquity = Math.max(maxBorrowingPower - currentBalance, 0);

  // Current LTV = how much of the home's value is already mortgaged
  const currentLtvRatio = Math.min((currentBalance / homeValue) * 100, 100);

  // HELOC Usage = what % of the max borrowing capacity is already consumed
  const helocUsagePercent = maxBorrowingPower > 0
    ? Math.min((currentBalance / maxBorrowingPower) * 100, 100)
    : 0;

  // Available equity as % of max borrowing power
  const equityPercent = maxBorrowingPower > 0
    ? Math.min((availableEquity / maxBorrowingPower) * 100, 100)
    : 0;

  // Color thresholds based on remaining available equity:
  // green >= 40% of max capacity remaining
  // warning >= 20%
  // danger < 20%
  let colorClass: HelocResults['colorClass'] = 'success';
  if (equityPercent < 20) {
    colorClass = 'danger';
  } else if (equityPercent < 40) {
    colorClass = 'warning';
  }

  return {
    homeValue,
    currentBalance,
    maxLtv,
    maxBorrowingPower: Math.round(maxBorrowingPower),
    availableEquity: Math.round(availableEquity),
    currentLtvRatio: Math.round(currentLtvRatio * 100) / 100,
    helocUsagePercent: Math.round(helocUsagePercent * 100) / 100,
    equityPercent: Math.round(equityPercent * 100) / 100,
    colorClass,
  };
}
