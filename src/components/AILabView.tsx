import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Calculator, 
  ShieldCheck, 
  Zap, 
  BarChart, 
  Activity,
  Layers,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AIScanResult } from '../types/signal';

export const AILabView: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedGameModel, setSelectedGameModel] = useState('lightning-roulette');
  const [shoeHistoryInput, setShoeHistoryInput] = useState('Red 14, Red 18, Black 22, Red 16, Red 21, Zero');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIScanResult | null>({
    gameName: 'Lightning Roulette (Live)',
    targetPrediction: 'RED (2nd Dozen 13-24) & Number 18, 19, 21',
    detailOutcome: 'High multiplier density detected in sector 2nd Dozen with 50x-500x lightning trigger',
    confidence: 94,
    riskLevel: 'LOW',
    patternIdentified: 'Sector Clumping & Radial Spin Deceleration',
    statisticalAnalysis: 'Monte Carlo simulation of 50,000 rotor spins reveals a 74.2% probability bias toward the 2nd Dozen quad sector after 3 consecutive low-tier rebounds.',
    kellyStakeMultiplier: '2.5% of bankroll',
    keyFactors: [
      'Rotor release speed deviation: +1.2 RPM (predictable rebound index)',
      'Cold number deficit recovery triggered for numbers 18, 19, 21',
      'Expected Value (EV): +5.2% against house default advantage'
    ],
    aiModel: 'Gemini 3.8 Flash Neural Engine'
  });

  const gamePresets: Record<string, { name: string; category: string; defaultShoe: string }> = {
    'lightning-roulette': {
      name: 'Lightning Roulette (Live)',
      category: 'casino',
      defaultShoe: 'Red 14, Red 18, Black 22, Red 16, Red 21, Zero'
    },
    'speed-baccarat': {
      name: 'Speed Baccarat A',
      category: 'casino',
      defaultShoe: 'Banker, Banker, Banker, Player, Banker, Banker, Tie'
    },
    'aviator-pro': {
      name: 'Aviator Crash Pro',
      category: 'crash',
      defaultShoe: '1.18x, 1.25x, 1.09x (Cold Cluster -> Pink Wave Imminent)'
    },
    'dragon-tiger': {
      name: 'Dragon Tiger Live',
      category: 'casino',
      defaultShoe: 'Dragon, Tiger, Dragon, Dragon, Dragon, Tie'
    },
    'andar-bahar': {
      name: 'Super Andar Bahar',
      category: 'casino',
      defaultShoe: 'Joker 8♦ -> Bahar (2 rounds), Andar (1 round)'
    },
    'wingo-color': {
      name: 'WinGo 1-Minute Color',
      category: 'color',
      defaultShoe: 'Red 2, Green 7, Red 4, Green 9, Green 1'
    }
  };

  const handleSelectPreset = (key: string) => {
    setSelectedGameModel(key);
    setShoeHistoryInput(gamePresets[key].defaultShoe);
  };

  const handleRunScan = async () => {
    setLoading(true);
    const preset = gamePresets[selectedGameModel];
    try {
      const res = await fetch('/api/signals/ai-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName: preset.name,
          category: preset.category,
          roundId: `#SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
          recentHistory: shoeHistoryInput,
          userStrategy: 'Kelly Criterion AI Model',
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 p-6 rounded-2xl border border-emerald-500/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Cpu className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white">
                {language === 'hi' ? 'AI Signal System & Pattern Lab' : 'AI Signal Intelligence & Pattern Laboratory'}
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {language === 'hi'
                ? 'Data-based predictions, confidence score, mathematical probability distribution, aur shoe pattern history analysis ek jagah.'
                : 'Advanced data-driven prediction model analyzing statistical shoe variance, rotor clumping, server seed clusters, and optimal Kelly criterion staking.'}
            </p>
          </div>
        </div>

        {/* Game Presets Selector */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {Object.entries(gamePresets).map(([key, val]) => (
            <button
              key={key}
              onClick={() => handleSelectPreset(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedGameModel === key
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {val.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Configuration & Execution */}
      <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="md:col-span-2">
            <label className="text-slate-300 font-semibold block mb-1.5">
              {language === 'hi' ? 'Shoe Data / Pichle Rounds Ka Sequence:' : 'Shoe Sequence / Live History Feed:'}
            </label>
            <input
              type="text"
              value={shoeHistoryInput}
              onChange={(e) => setShoeHistoryInput(e.target.value)}
              placeholder="e.g. Banker, Banker, Player, Banker"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-300 font-mono text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">
              {language === 'hi' ? 'AI Analytical Strategy:' : 'Algorithmic Strategy:'}
            </label>
            <select className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200">
              <option>Kelly Criterion Optimal Multiplier</option>
              <option>Cluster Variance Rebound Model</option>
              <option>Bayesian Predictive Road-Map</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleRunScan}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{language === 'hi' ? 'Gemini 3.8 Neural Matrix Compute Kar Raha Hai...' : 'Computing Neural Probability Matrix...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{language === 'hi' ? 'Run Live AI Pattern Scan' : 'Run Live AI Pattern Scan'}</span>
            </>
          )}
        </button>
      </div>

      {/* Output Results */}
      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Main Signal Prediction Card */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-emerald-500/40 glow-emerald space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                {result.gameName}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                {result.confidence}% Confidence
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                {language === 'hi' ? 'AI Target Prediction:' : 'AI Target Prediction:'}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1 text-emerald-300">
                {result.targetPrediction}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {result.detailOutcome}
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs">
              <span className="text-cyan-300 font-bold block mb-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {result.patternIdentified}
              </span>
              <p className="text-slate-400 leading-relaxed">
                {result.statisticalAnalysis}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs text-slate-400 font-semibold block">Key Algorithmic Triggers:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {result.keyFactors.map((fac, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-[11px]">{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Staking & Mathematical Edge Matrix */}
          <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Kelly Staking Framework</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Recommended Stake:</span>
                  <span className="text-lg font-extrabold text-cyan-300 font-mono">
                    {result.kellyStakeMultiplier || '2.5% of bankroll'}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Calculated Risk Index:</span>
                  <span className="text-sm font-bold text-emerald-400">
                    {result.riskLevel} RISK (Safe Margin)
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Model Architecture:</span>
                  <span className="text-xs font-mono text-purple-300">
                    {result.aiModel || 'Gemini 3.8 Flash Neural Engine'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              *Signals utilize real-time probability distributions, Markov chain transitions, and Kelly money management principles. Always gamble responsibly.
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
