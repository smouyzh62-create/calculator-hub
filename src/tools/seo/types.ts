export type Locale = 'en' | 'zh';
export type Theme = 'light' | 'dark';

export interface AnalysisInput {
  text: string;
  targetPlatform: 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'twitter' | 'general';
}

export interface ScoreDimension {
  label: string;
  score: number;       // 0-100
  weight: number;      // weight for overall score
  details: string[];
}

export interface AnalysisResult {
  overallScore: number;     // 0-100
  dimensions: ScoreDimension[];
  tips: string[];
  hashtags: string[];
  optimizedCopy: string;
}

export type ScoreLevel = 'poor' | 'fair' | 'good' | 'excellent';
