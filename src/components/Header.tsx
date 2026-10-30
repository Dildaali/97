import React from 'react';
import { 
  Activity, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  ShieldCheck, 
  Flame, 
  Cpu, 
  Globe, 
  SlidersHorizontal,
  History,
  Radio
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentTab: 'dashboard' | 'history' | 'ai-lab' | 'admin';
  setCurrentTab: (tab: 'dashboard' | 'history' | 'ai-lab' | 'admin') => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenApkModal: () => void;
  activeCount: number;
  accuracy: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  isMuted,
  onToggleMute,
  onOpenApkModal,
  activeCount,
  accuracy,
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Live Radar */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-indigo-500/20 border border-emerald-500/40 glow-emerald">
              <Radio className="w-5 h-5 text-emerald-400" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono">
                  PROSIGNAL
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded">
                  AI v4.8
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {activeCount} {language === 'hi' ? 'Live Signals' : 'Live Feeds Active'}
                </span>
                <span>•</span>
                <span className="text-slate-300 font-mono font-semibold">
                  {accuracy} {language === 'hi' ? 'Jeet Dar' : 'Verified Win Rate'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              {t.liveSignals}
            </button>

            <button
              onClick={() => setCurrentTab('history')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              {t.historyAccuracy}
            </button>

            <button
              onClick={() => setCurrentTab('ai-lab')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'ai-lab'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              {t.aiSignalSystem}
            </button>

            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 border border-amber-500/20'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t.adminPanel}
            </button>
          </nav>

          {/* Quick Action Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? t.soundOff : t.soundOn}
              className={`p-2 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-slate-900 border-slate-800 text-slate-500'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Change Language / Bhasha Badlein"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'en' ? 'EN' : 'हिंदी'}</span>
            </button>

            {/* Android APK Button */}
            <button
              onClick={onOpenApkModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.downloadApp}</span>
              <span className="sm:hidden">APK</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-900 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentTab === 'dashboard' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.liveSignals}
          </button>
          <button
            onClick={() => setCurrentTab('history')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentTab === 'history' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.historyAccuracy}
          </button>
          <button
            onClick={() => setCurrentTab('ai-lab')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentTab === 'ai-lab' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.aiSignalSystem}
          </button>
          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              currentTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-400'
            }`}
          >
            {t.adminPanel}
          </button>
        </div>

      </div>
    </header>
  );
};
