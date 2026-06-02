export interface CompoundInputs {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;       // e.g. 8 = 8%
  timeHorizon: number;        // years
}

export interface YearlyData {
  year: number;
  totalPrincipal: number;     // cumulative principal paid in
  totalInterest: number;      // cumulative interest earned
  totalValue: number;         // total principal + interest
}

export interface CompoundResults {
  inputs: CompoundInputs;
  yearlyData: YearlyData[];
  finalTotal: number;
  totalPrincipal: number;
  totalInterest: number;
}

export type Theme = 'light' | 'dark';
export type Locale = 'en' | 'zh';
