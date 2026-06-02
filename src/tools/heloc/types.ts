export interface HelocInputs {
  homeValue: number;
  currentBalance: number;
  maxLtv: number;  // Max Loan-to-Value ratio (e.g. 80 = 80%)
}

export interface HelocResults {
  homeValue: number;
  currentBalance: number;
  maxLtv: number;
  maxBorrowingPower: number;  // Home Value × Max LTV
  availableEquity: number;    // Max Borrowing Power - Mortgage Balance
  currentLtvRatio: number;    // (Balance / Home Value) * 100
  helocUsagePercent: number;  // Balance / Max Borrowing Power * 100
  equityPercent: number;      // Available Equity / Max Borrowing Power * 100
  colorClass: 'success' | 'warning' | 'danger';
}

export type Theme = 'light' | 'dark';

export type Locale = 'en' | 'zh';
