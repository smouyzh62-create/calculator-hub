import type { CompoundInputs, YearlyData, CompoundResults } from '../types';

/**
 * Calculate compound interest with monthly contributions.
 *
 * Formula:
 *   Future Value = P(1 + r/n)^{nt} + PMT × ((1 + r/n)^{nt} - 1) / (r/n)
 *
 * Where:
 *   P   = initial investment
 *   PMT = monthly contribution
 *   r   = annual return (decimal)
 *   n   = compounding periods per year (12 for monthly)
 *   t   = time in years
 */
export function calculateCompound(inputs: CompoundInputs): CompoundResults {
  const { initialInvestment, monthlyContribution, annualReturn, timeHorizon } = inputs;

  const r = annualReturn / 100;          // decimal rate
  const n = 12;                          // monthly compounding
  const totalMonths = timeHorizon * 12;

  // Calculate final values
  const finalTotal = computeFutureValue(initialInvestment, monthlyContribution, r, n, totalMonths);
  const totalPrincipal = initialInvestment + monthlyContribution * totalMonths;
  const totalInterest = finalTotal - totalPrincipal;

  // Build yearly breakdown
  const yearlyData: YearlyData[] = [];
  for (let year = 1; year <= timeHorizon; year++) {
    const months = year * 12;
    const totalValue = computeFutureValue(initialInvestment, monthlyContribution, r, n, months);
    const principal = initialInvestment + monthlyContribution * months;
    const interest = totalValue - principal;
    yearlyData.push({
      year,
      totalPrincipal: Math.round(principal),
      totalInterest: Math.max(Math.round(interest), 0),
      totalValue: Math.round(totalValue),
    });
  }

  return {
    inputs,
    yearlyData,
    finalTotal: Math.round(finalTotal),
    totalPrincipal: Math.round(totalPrincipal),
    totalInterest: Math.max(Math.round(totalInterest), 0),
  };
}

function computeFutureValue(
  principal: number,
  monthly: number,
  rate: number,       // decimal annual rate
  periodsPerYear: number,
  totalPeriods: number
): number {
  if (rate === 0) {
    return principal + monthly * totalPeriods;
  }

  const rPerPeriod = rate / periodsPerYear;

  // Compound growth of initial principal: P(1 + r/n)^{nt}
  const principalGrowth = principal * Math.pow(1 + rPerPeriod, totalPeriods);

  // Future value of annuity stream: PMT × ((1 + r/n)^{nt} - 1) / (r/n)
  const annuityFactor = (Math.pow(1 + rPerPeriod, totalPeriods) - 1) / rPerPeriod;
  const annuityGrowth = monthly * annuityFactor;

  return principalGrowth + annuityGrowth;
}

/**
 * Format number as currency string.
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
