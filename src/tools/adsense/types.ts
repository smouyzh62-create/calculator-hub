export interface AdSenseInputs {
  dailyPageViews: number;
  ctr: number;           // e.g. 1.5 = 1.5%
  cpc: number;           // e.g. 0.35 = $0.35
}

export interface RevenueBreakdown {
  daily: number;
  monthly: number;
  yearly: number;
}

export interface AdSenseResults {
  inputs: AdSenseInputs;
  conservative: RevenueBreakdown;
  optimistic: RevenueBreakdown;
  expected: RevenueBreakdown;
}

export type Theme = 'light' | 'dark';
export type Locale = 'en' | 'zh';
