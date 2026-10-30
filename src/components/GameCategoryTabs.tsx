import React from 'react';
import { 
  Sparkles, 
  Dices, 
  Plane, 
  Palette, 
  Trophy, 
  Layers, 
  Search, 
  Sliders, 
  Filter,
  Check
} from 'lucide-react';
import { GameCategory, SignalSource } from '../types/signal';
import { useLanguage } from '../context/LanguageContext';

interface GameCategoryTabsProps {
  selectedCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  selectedSource: SignalSource | 'ALL';
  onSelectSource: (source: SignalSource | 'ALL') => void;
  minConfidence: number;
  setMinConfidence: (val: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  counts: Record<GameCategory, number>;
}

export const GameCategoryTabs: React.FC<GameCategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSource,
  onSelectSource,
  minConfidence,
  setMinConfidence,
  searchQuery,
  setSearchQuery,
  counts,
}) => {
  const { t, language } = useLanguage();

  const categories: { id: GameCategory; label: string; icon: React.ReactNode; isCasino?: boolean }[] = [
    { id: 'all', label: t.categories.all, icon: <Layers className="w-4 h-4" /> },
    { id: 'casino', label: t.categories.casino, icon: <Dices className="w-4 h-4" />, isCasino: true },
    { id: 'crash', label: t.categories.crash, icon: <Plane className="w-4 h-4" /> },
    { id: 'color', label: t.categories.color, icon: <Palette className="w-4 h-4" /> },
    { id: 'sports', label: t.categories.sports, icon: <Trophy className="w-4 h-4" /> },
    { id: 'slots', label: t.categories.slots, icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4 mb-6">
      
      {/* Category Tabs Scrollable on Mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                isActive
                  ? cat.isCasino
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 border-emerald-400 font-extrabold shadow-lg shadow-emerald-500/25'
                    : 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span
                className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? 'bg-slate-950/30 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {counts[cat.id] || 0}
              </span>
              {cat.isCasino && !isActive && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded uppercase font-bold">
                  HOT
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 border-slate-800">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchGames}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Source Filter (AI / Live Telemetry / Admin Pro / All) */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">{language === 'hi' ? 'Source:' : 'Source:'}</span>
          </span>
          <button
            onClick={() => onSelectSource('ALL')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedSource === 'ALL'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'hi' ? 'Sabhi (3-in-1)' : 'All 3'}
          </button>
          <button
            onClick={() => onSelectSource('AI_ALGORITHM')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedSource === 'AI_ALGORITHM'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Engine
          </button>
          <button
            onClick={() => onSelectSource('LIVE_TELEMETRY')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedSource === 'LIVE_TELEMETRY'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live API
          </button>
          <button
            onClick={() => onSelectSource('ADMIN_MANUAL')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedSource === 'ADMIN_MANUAL'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin Pro
          </button>
        </div>

        {/* Confidence threshold selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden lg:inline">{t.filterConfidence}:</span>
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {[80, 88, 92].map((thresh) => (
              <button
                key={thresh}
                onClick={() => setMinConfidence(thresh)}
                className={`px-2 py-1 rounded-lg font-mono transition ${
                  minConfidence === thresh
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                &ge;{thresh}%
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
