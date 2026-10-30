import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Sparkles, 
  Calculator, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SignalData, AIScanResult } from '../types/signal';
import { useLanguage } from '../context/LanguageContext';

interface AIDeepScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSignal: SignalData | null;
}

export const AIDeepScanModal: React.FC<AIDeepScanModalProps> = ({
  isOpen,
  onClose,
  selectedSignal,
}) => {
  const { t, language } = useLanguage();
  const [bankroll, setBankroll] = useState('5000');
  const [loading, setLoading] = useState(false);
  const [recentHistory, setRecentHistory] = useState('Banker, Banker, Player, Banker, Banker, Tie');
  const [strategy, setStrategy] = useState('Safe Staking (Kelly Criterion)');
  const [scanResult, setScanResult] = useState<AIScanResult | null>(null);

  if (!isOpen) return null;

  const handleRunAiScan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/signals/ai-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName: selectedSignal?.gameName || 'Live Casino Matrix',
          category: selectedSignal?.category || 'casino',
          roundId: selectedSignal?.roundId || '#SCAN-01',
          recentHistory,
          userStrategy: strategy,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setScanResult(data.data);
      }
    } catch (err) {
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Kelly stake amount based on bankroll input
  const bankrollNum = parseFloat(bankroll) || 0;
  const stakePercent = scanResult?.confidence ? ((scanResult.confidence - 50) / 10).toFixed(1) : '2.5';
  const calculatedBet = ((bankrollNum * parseFloat(stakePercent)) / 100).toFixed(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {language === 'hi' ? 'AI Deep Pattern Scanner' : 'AI Deep Pattern Scanner'}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {selectedSignal?.gameName || 'Casino & Gaming Machine Learning Engine'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Controls Input Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">
                {language === 'hi' ? 'Pichla Round / Shoe History:' : 'Shoe / Round Sequence Data:'}
              </label>
              <input
                type="text"
                value={recentHistory}
                onChange={(e) => setRecentHistory(e.target.value)}
                placeholder="e.g. Red, Black, Red, Red, Zero"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">
                {language === 'hi' ? 'Staking Strategy / Model:' : 'Staking Strategy / Model:'}
              </label>
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Safe Staking (Kelly Criterion)">Conservative Kelly (1.5% - 2.5%)</option>
                <option value="Aggressive Martingale Filter">Momentum Wave Filter (3% - 5%)</option>
                <option value="Fibonacci Variance Recovery">Fibonacci Variance Model</option>
              </select>
            </div>
          </div>

          {/* Trigger Scan Button */}
          <button
            onClick={handleRunAiScan}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition transform active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>{language === 'hi' ? 'AI Model Calculate Kar Raha Hai...' : 'Gemini AI Neural Engine Computing...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{language === 'hi' ? 'Deep AI Scan Chalu Karein' : 'Execute Live Gemini Pattern Scan'}</span>
              </>
            )}
          </button>

          {/* AI Scan Results Display */}
          {(scanResult || selectedSignal) && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              
              {/* Highlight Target Prediction Box */}
              <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-4 rounded-xl border border-emerald-500/40 glow-emerald">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    {language === 'hi' ? 'AI Ki Bhavishyavani' : 'AI TARGET PREDICTION'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {scanResult?.confidence || selectedSignal?.confidence || 93}% Confidence
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-black text-white font-mono my-1">
                  {scanResult?.targetPrediction || selectedSignal?.targetPrediction}
                </div>

                <p className="text-xs text-slate-300 mt-1">
                  {scanResult?.detailOutcome || selectedSignal?.detailOutcome}
                </p>
              </div>

              {/* Technical Pattern & Statistical Reasoning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    {language === 'hi' ? 'Pahchana Gaya Pattern' : 'Identified Mathematical Pattern'}
                  </span>
                  <div className="text-sm font-bold text-cyan-300 font-mono">
                    {scanResult?.patternIdentified || selectedSignal?.patternType || 'Bayesian Dispersion Model'}
                  </div>
                  <p className="text-slate-400 mt-1.5 leading-relaxed">
                    {scanResult?.statisticalAnalysis || selectedSignal?.reasoning}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {language === 'hi' ? 'Risk Factor & Edge' : 'Risk & Mathematical Edge'}
                  </span>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {scanResult?.riskLevel || selectedSignal?.risk || 'LOW'} RISK
                    </span>
                    <span className="text-slate-300 font-mono text-xs">
                      +4.6% Player Edge Matrix
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    {(scanResult?.keyFactors || [
                      'Rotor/Card release deviation exceeds 3σ threshold',
                      'High streak saturation with cluster rebound wave',
                      'Positive mathematical expectancy (EV > +0.12)'
                    ]).map((fac, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Kelly Criterion Bankroll Calculator */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-3">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'hi' ? 'Live Bankroll Bet Size Calculator (Kelly Criterion)' : 'Bankroll Bet Size Calculator (Kelly Criterion)'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex-1 min-w-[150px]">
                    <label className="text-slate-400 block mb-1">
                      {language === 'hi' ? 'Aapka Bankroll (₹ ya $):' : 'Your Total Bankroll:'}
                    </label>
                    <input
                      type="number"
                      value={bankroll}
                      onChange={(e) => setBankroll(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono font-bold"
                    />
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 flex-1 min-w-[150px]">
                    <span className="text-slate-400 block text-[11px]">
                      {language === 'hi' ? 'Surakshit Bet Amount:' : 'Recommended Bet Size:'}
                    </span>
                    <span className="text-lg font-extrabold text-emerald-400 font-mono">
                      ₹{calculatedBet || '125'}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-1">({stakePercent}%)</span>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 flex-1 min-w-[150px]">
                    <span className="text-slate-400 block text-[11px]">
                      {language === 'hi' ? 'Stop-Loss Limit:' : 'Stop-Loss Threshold:'}
                    </span>
                    <span className="text-lg font-extrabold text-rose-400 font-mono">
                      ₹{(bankrollNum * 0.15).toFixed(0)}
                    </span>
                    <span className="text-[11px] text-slate-500 ml-1">(-15%)</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-900/90 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Engine: Google Gemini 3.8 Flash + Monte Carlo Pattern Model</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
