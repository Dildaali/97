export type GameCategory = 'all' | 'casino' | 'crash' | 'color' | 'sports' | 'slots';

export type SignalSource = 'AI_ALGORITHM' | 'LIVE_TELEMETRY' | 'ADMIN_MANUAL';

export type SignalStatus = 'ACTIVE' | 'VERIFYING' | 'WON' | 'LOST';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface SignalData {
  id: string;
  gameId: string;
  gameName: string;
  category: 'casino' | 'crash' | 'color' | 'sports' | 'slots';
  roundId: string;
  targetPrediction: string;
  detailOutcome: string;
  odds: string;
  confidence: number; // e.g. 94
  risk: RiskLevel;
  source: SignalSource;
  status: SignalStatus;
  expirySeconds: number;
  remainingSeconds: number;
  createdAt: number;
  streakCount?: number;
  patternType: string;
  reasoning: string;
  recommendedUnits: string; // e.g. "2.5 Units (Kelly)"
  resolvedAt?: number;
  resultProfit?: string;
}

export interface StatsData {
  totalSignals: number;
  wonSignals: number;
  lostSignals: number;
  winRate: string;
  currentStreak: number;
  dailyPerformance: string;
  liveActiveCount: number;
}

export interface SystemSettings {
  aiAutoGeneration: boolean;
  autoVerification: boolean;
  adminNotificationBanner: string;
  vipModeOnly: boolean;
}

export interface AIScanResult {
  gameName: string;
  targetPrediction: string;
  detailOutcome: string;
  confidence: number;
  riskLevel: RiskLevel;
  patternIdentified: string;
  statisticalAnalysis: string;
  kellyStakeMultiplier: string;
  keyFactors: string[];
  aiModel?: string;
}

export interface SubscriberUser {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  winRate: string;
  joined: string;
}
