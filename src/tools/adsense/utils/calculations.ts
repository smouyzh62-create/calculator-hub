import type { AdSenseInputs, AdSenseResults, RevenueBreakdown } from '../types';

/**
 * Calculate AdSense revenue estimates.
 *
 * Formula:
 *   Daily Revenue = Daily Views × (CTR / 100) × CPC
 *
 * Conservative: 80% of expected (lower CPC/CTR)
 * Optimistic:   120% of expected (higher CPC/CTR)
 *
 * Monthly = Daily × 30
 * Yearly  = Daily × 365
 */
export function calculateAdSense(inputs: AdSenseInputs): AdSenseResults {
  const { dailyPageViews, ctr, cpc } = inputs;

  const ctrDecimal = ctr / 100;
  const dailyExpected = dailyPageViews * ctrDecimal * cpc;

  const expected: RevenueBreakdown = {
    daily: Math.round(dailyExpected * 100) / 100,
    monthly: Math.round(dailyExpected * 30 * 100) / 100,
    yearly: Math.round(dailyExpected * 365 * 100) / 100,
  };

  const conservative: RevenueBreakdown = {
    daily: Math.round(dailyExpected * 0.8 * 100) / 100,
    monthly: Math.round(dailyExpected * 0.8 * 30 * 100) / 100,
    yearly: Math.round(dailyExpected * 0.8 * 365 * 100) / 100,
  };

  const optimistic: RevenueBreakdown = {
    daily: Math.round(dailyExpected * 1.2 * 100) / 100,
    monthly: Math.round(dailyExpected * 1.2 * 30 * 100) / 100,
    yearly: Math.round(dailyExpected * 1.2 * 365 * 100) / 100,
  };

  return { inputs, conservative, optimistic, expected };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value);
}
