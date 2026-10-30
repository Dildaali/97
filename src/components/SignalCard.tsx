import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Copy, 
  Check, 
  Cpu, 
  Radio, 
  UserCheck, 
  ShieldAlert, 
  Sparkles, 
  Zap, 
  ArrowUpRight,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SignalData } from '../types/signal';
import { useLanguage } from '../context/LanguageContext';
import { playWinCelebration, playWarningTick } from '../utils/audio';

interface SignalCardProps {
  signal: SignalData;
  onOpenDeepScan: (signal: SignalData) => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onOpenDeepScan }) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [prevStatus, setPrevStatus] = useState(signal.status);

  // Trigger win sound & celebratory confetti if signal changes to WON
  useEffect(() => {
    if (signal.status === 'WON' && prevStatus !== 'WON') {
      playWinCelebration();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8']
      });
    }
    // Warning tick on last 5 seconds of active signal
    if (signal.status === 'ACTIVE' && signal.remainingSeconds <= 5 && signal.remainingSeconds > 0) {
      playWarningTick();
    }
    setPrevStatus(signal.status);
  }, [signal.status, signal.remainingSeconds, prevStatus]);

  const handleCopy = () => {
    const textToCopy = `[PROSIGNAL AI] 🎯 Game: ${signal.gameName} | Round: ${signal.roundId} | Prediction: ${signal.targetPrediction} | Odds: ${signal.odds} | Confidence: ${signal.confidence}% | Staking: ${signal.recommendedUnits}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Color mappings
  const riskColors = {
    LOW: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    MEDIUM: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    HIGH: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  };

  const sourceDetails = {
    AI_ALGORITHM: {
      label: 'AI Algorithm',
      icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" />,
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    },
    LIVE_TELEMETRY: {
      label: 'Live Telemetry',
      icon: <Radio className="w-3.5 h-3.5 text-cyan-400" />,
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    },
    ADMIN_MANUAL: {
      label: 'Admin Pro Signal',
      icon: <UserCheck className="w-3.5 h-3.5 text-amber-400" />,
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    },
  }[signal.source];

  // Calculate percentage of remaining time
  const percentLeft = Math.max(0, Math.min(100, (signal.remainingSeconds / (signal.expirySeconds || 45)) * 100));

  return (
    <div
      className={`glass-panel rounded-2xl p-5 relative overflow-hidden transition-all duration-300 border flex flex-col justify-between ${
        signal.status === 'WON'
          ? 'border-emerald-500/60 bg-emerald-950/20 glow-emerald'
          : signal.status === 'VERIFYING'
          ? 'border-amber-500/60 bg-amber-950/15 glow-amber'
          : signal.status === 'LOST'
          ? 'border-slate-800 opacity-75'
          : 'border-slate-800 hover:border-emerald-500/40 hover:shadow-xl'
      }`}
    >
      {/* Top Bar: Game Name, Round ID, Source Badge */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition">
                {signal.gameName}
              </span>
              {signal.streakCount && signal.streakCount > 2 && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {signal.streakCount}x
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="font-mono text-slate-300">{signal.roundId}</span>
              <span>•</span>
              <span className="capitalize text-slate-400">{signal.category}</span>
            </div>
          </div>

          {/* Source Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${sourceDetails.badge}`}>
            {sourceDetails.icon}
            <span className="hidden sm:inline">{sourceDetails.label}</span>
          </div>
        </div>

        {/* Live Timer & Status Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-mono">
              {signal.status === 'ACTIVE' ? (
                <>
                  <Clock className={`w-3.5 h-3.5 ${signal.remainingSeconds <= 10 ? 'text-rose-400 animate-spin' : 'text-emerald-400'}`} />
                  <span className={signal.remainingSeconds <= 10 ? 'text-rose-400 font-bold' : 'text-slate-300 font-bold'}>
                    00:{signal.remainingSeconds < 10 ? `0${signal.remainingSeconds}` : signal.remainingSeconds}s
                  </span>
                  <span className="text-slate-500">
                    {language === 'hi' ? 'tak bet khula hai' : 'remaining'}
                  </span>
                </>
              ) : signal.status === 'VERIFYING' ? (
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  {t.verifying}
                </span>
              ) : signal.status === 'WON' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.won} (+100% ROI)
                </span>
              ) : (
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                  {t.lost}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono">
              <span className="text-slate-400">{t.odds}:</span>
              <span className="text-cyan-300 font-bold">{signal.odds}</span>
            </div>
          </div>

          {/* Progress countdown bar */}
          {signal.status === 'ACTIVE' && (
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-1000 ${
                  signal.remainingSeconds <= 10 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${percentLeft}%` }}
              />
            </div>
          )}
        </div>

        {/* TARGET PREDICTION (Hero Box) */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800/90 rounded-xl p-3.5 mb-3 group-hover:border-slate-700 transition">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>{language === 'hi' ? 'Target Prediction (Ishara)' : 'TARGET PREDICTION'}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskColors[signal.risk]}`}>
              {signal.risk} RISK
            </span>
          </div>

          <div className="text-lg sm:text-xl font-extrabold text-emerald-300 font-mono tracking-tight leading-snug">
            {signal.targetPrediction}
          </div>

          <div className="mt-1 text-xs text-slate-300 leading-relaxed">
            {signal.detailOutcome}
          </div>
        </div>

        {/* Confidence & Kelly Staking Recommendation */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-0.5">{t.confidence}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-emerald-400 text-base">
                {signal.confidence}%
              </span>
              <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${signal.confidence}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
            <span className="text-[11px] text-slate-400 block mb-0.5">{t.stake}</span>
            <span className="font-semibold text-cyan-300 text-xs sm:text-sm font-mono truncate block">
              {signal.recommendedUnits}
            </span>
          </div>
        </div>

        {/* Algorithmic Reason / Pattern Tag */}
        <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded-lg border border-slate-800/50 mb-4">
          <span className="text-slate-300 font-semibold block">{signal.patternType}</span>
          <p className="line-clamp-2 text-slate-400 mt-0.5">{signal.reasoning}</p>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? t.copied : t.copySignal}</span>
        </button>

        <button
          onClick={() => onOpenDeepScan(signal)}
          className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
          title={t.scanDetails}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">{t.deepScanBtn}</span>
          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
        </button>
      </div>
    </div>
  );
};
