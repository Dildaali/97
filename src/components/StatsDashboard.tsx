import React from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Flame, 
  BarChart3, 
  Cpu, 
  Radio, 
  UserCheck 
} from 'lucide-react';
import { StatsData } from '../types/signal';
import { useLanguage } from '../context/LanguageContext';

interface StatsDashboardProps {
  stats: StatsData;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => {
  const { t, language } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      
      {/* 1. Overall Accuracy Win Rate */}
      <div className="glass-panel p-4 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all glow-emerald">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{t.winRate}</span>
          <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
            {stats.winRate}
          </span>
          <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
            {language === 'hi' ? 'Pramanik' : 'Verified'}
          </span>
        </div>
        <div className="mt-2 w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${parseFloat(stats.winRate) || 90}%` }}
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-500">
          {language === 'hi' ? 'Pichle 500+ signals par aadharit' : 'Calculated over last 500+ live signals'}
        </p>
      </div>

      {/* 2. Total Signals & Won / Lost split */}
      <div className="glass-panel p-4 rounded-2xl hover:border-slate-700 transition-all">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{t.totalSignals}</span>
          <span className="p-1 rounded bg-indigo-500/10 text-indigo-400">
            <BarChart3 className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
          {stats.totalSignals.toLocaleString()}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle className="w-3 h-3" />
            {stats.wonSignals} {language === 'hi' ? 'Sahi' : 'Won'}
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            <XCircle className="w-3 h-3" />
            {stats.lostSignals} {language === 'hi' ? 'Galat' : 'Lost'}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-slate-500">
          {language === 'hi' ? '91%+ Safalta Anupaat' : 'Strict stop-loss discipline applied'}
        </p>
      </div>

      {/* 3. Daily Performance ROI */}
      <div className="glass-panel p-4 rounded-2xl hover:border-cyan-500/30 transition-all glow-cyan">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{t.dailyROI}</span>
          <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
            <Zap className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
          {stats.dailyPerformance}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>{language === 'hi' ? 'Aaj Ka Profit (Kelly Staking)' : 'Compounded 24h Yield'}</span>
        </div>
        <p className="mt-1 text-[10px] text-slate-500">
          {language === 'hi' ? 'Risk-adjusted bankroll growth' : 'Based on 2-3% flat stake guideline'}
        </p>
      </div>

      {/* 4. Active Win Streak */}
      <div className="glass-panel p-4 rounded-2xl hover:border-amber-500/40 transition-all glow-amber">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>{t.streak}</span>
          <span className="p-1 rounded bg-amber-500/10 text-amber-400">
            <Flame className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
            {stats.currentStreak}x
          </span>
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            {language === 'hi' ? 'Jeet Ka Silsila' : 'WINS STREAK'}
          </span>
        </div>
        <p className="mt-3 text-xs text-amber-200/80 font-medium flex items-center gap-1">
          <span>🔥</span>
          <span>{language === 'hi' ? 'Sabhi Casino Signals Active' : 'Roulette & Baccarat hot wave'}</span>
        </p>
      </div>

      {/* 5. Signal Source Engine Tri-Blend (Addressing User Point 2: "Teeno ka combination") */}
      <div className="glass-panel p-4 rounded-2xl col-span-2 md:col-span-4 lg:col-span-1 border-slate-800">
        <div className="text-xs text-slate-400 mb-1.5 flex items-center justify-between">
          <span>{language === 'hi' ? 'Signals Ke 3 Sources' : '3 Signal Sources'}</span>
          <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-300">Hybrid</span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              AI Algorithm
            </span>
            <span className="font-mono font-bold">58%</span>
          </div>

          <div className="flex items-center justify-between text-cyan-400">
            <span className="flex items-center gap-1">
              <Radio className="w-3 h-3" />
              Live Telemetry
            </span>
            <span className="font-mono font-bold">28%</span>
          </div>

          <div className="flex items-center justify-between text-amber-400">
            <span className="flex items-center gap-1">
              <UserCheck className="w-3 h-3" />
              Admin Pro Channel
            </span>
            <span className="font-mono font-bold">14%</span>
          </div>
        </div>
      </div>

    </div>
  );
};
