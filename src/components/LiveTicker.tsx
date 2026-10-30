import React from 'react';
import { Flame, Bell, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { SignalData } from '../types/signal';

interface LiveTickerProps {
  bannerText: string;
  recentSignals: SignalData[];
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ bannerText, recentSignals }) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-3">
        
        {/* Urgent Live Broadcast Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="hidden sm:inline uppercase tracking-wide text-[11px]">HOT RADAR</span>
        </div>

        {/* Marquee ticker container */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs text-slate-300">
            {/* Admin Banner Announcement */}
            <span className="flex items-center gap-2 text-amber-200 font-medium">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              {bannerText}
            </span>

            <span className="text-slate-600">•</span>

            {/* Live Winning items */}
            {recentSignals.slice(0, 5).map((sig) => (
              <span key={sig.id} className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">[{sig.gameName}]</span>
                <span className="text-emerald-400 font-semibold">{sig.targetPrediction}</span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded font-mono">
                  {sig.odds}
                </span>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              </span>
            ))}

            <span className="text-slate-600">•</span>

            <span className="flex items-center gap-1 text-cyan-300 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              Casino AI Engine: 94.2% Success on Lightning Roulette & Speed Baccarat
            </span>

            <span className="text-slate-600">•</span>

            <span className="flex items-center gap-1 text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              Aviator Crash Wave: 2.10x to 2.80x auto cashout streak active
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
