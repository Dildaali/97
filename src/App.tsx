/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveTicker } from './components/LiveTicker';
import { StatsDashboard } from './components/StatsDashboard';
import { GameCategoryTabs } from './components/GameCategoryTabs';
import { SignalCard } from './components/SignalCard';
import { AIDeepScanModal } from './components/AIDeepScanModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { HistoryTable } from './components/HistoryTable';
import { AdminPanel } from './components/AdminPanel';
import { AILabView } from './components/AILabView';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SignalData, StatsData, SystemSettings, GameCategory, SignalSource } from './types/signal';
import { getIsMuted, setMuted, playSignalPing } from './utils/audio';
import { AlertCircle, RefreshCw, Radio, Shield, Sparkles } from 'lucide-react';

function AppContent() {
  const { t, language } = useLanguage();
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'history' | 'ai-lab' | 'admin'>('dashboard');
  const [isMutedState, setIsMutedState] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [deepScanSignal, setDeepScanSignal] = useState<SignalData | null>(null);
  const [isDeepScanOpen, setIsDeepScanOpen] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('casino');
  const [selectedSource, setSelectedSource] = useState<SignalSource | 'ALL'>('ALL');
  const [minConfidence, setMinConfidence] = useState(80);
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [activeSignals, setActiveSignals] = useState<SignalData[]>([]);
  const [historySignals, setHistorySignals] = useState<(SignalData & { resolvedAt?: number; resultProfit?: string })[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalSignals: 420,
    wonSignals: 386,
    lostSignals: 34,
    winRate: '91.9%',
    currentStreak: 8,
    dailyPerformance: '+18.4% ROI',
    liveActiveCount: 8,
  });
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    aiAutoGeneration: true,
    autoVerification: true,
    adminNotificationBanner: '🔥 Live Hot Streak: Casino & Roulette signals accuracy currently at 94.2%! Follow recommended unit staking.',
    vipModeOnly: false,
  });
  const [prevSignalCount, setPrevSignalCount] = useState(0);

  // Initialize audio state
  useEffect(() => {
    setIsMutedState(getIsMuted());
  }, []);

  const handleToggleMute = () => {
    const newState = !isMutedState;
    setIsMutedState(newState);
    setMuted(newState);
  };

  // Fetch signals data from server
  const fetchData = async () => {
    try {
      const res = await fetch('/api/signals');
      const data = await res.json();
      if (data.activeSignals) {
        // If new signals arrived and not muted, play chime
        if (data.activeSignals.length > prevSignalCount && prevSignalCount > 0) {
          playSignalPing();
        }
        setPrevSignalCount(data.activeSignals.length);
        setActiveSignals(data.activeSignals);
      }
      if (data.stats) {
        setStats(data.stats);
      }
      if (data.systemSettings) {
        setSystemSettings(data.systemSettings);
      }
    } catch (e) {
      console.error('Failed to fetch signals:', e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/signals/history');
      const data = await res.json();
      if (data.history) {
        setHistorySignals(data.history);
      }
    } catch (e) {
      console.error('Failed to fetch history:', e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchHistory();
    const interval = setInterval(() => {
      fetchData();
      fetchHistory();
    }, 2500);
    return () => clearInterval(interval);
  }, [prevSignalCount]);

  // Filter signals
  const filteredSignals = activeSignals.filter((sig) => {
    const matchesCategory =
      selectedCategory === 'all' || sig.category === selectedCategory;

    const matchesSource =
      selectedSource === 'ALL' || sig.source === selectedSource;

    const matchesConfidence = sig.confidence >= minConfidence;

    const matchesSearch =
      searchQuery === '' ||
      sig.gameName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.targetPrediction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sig.roundId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSource && matchesConfidence && matchesSearch;
  });

  // Calculate category counts
  const categoryCounts: Record<GameCategory, number> = {
    all: activeSignals.length,
    casino: activeSignals.filter((s) => s.category === 'casino').length,
    crash: activeSignals.filter((s) => s.category === 'crash').length,
    color: activeSignals.filter((s) => s.category === 'color').length,
    sports: activeSignals.filter((s) => s.category === 'sports').length,
    slots: activeSignals.filter((s) => s.category === 'slots').length,
  };

  const handleOpenDeepScan = (sig: SignalData) => {
    setDeepScanSignal(sig);
    setIsDeepScanOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Main Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMuted={isMutedState}
        onToggleMute={handleToggleMute}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        activeCount={activeSignals.filter((s) => s.status === 'ACTIVE').length}
        accuracy={stats.winRate}
      />

      {/* Real-time Ticker & Admin Broadcast Announcement */}
      <LiveTicker
        bannerText={systemSettings.adminNotificationBanner}
        recentSignals={activeSignals}
      />

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: LIVE SIGNALS DASHBOARD */}
        {currentTab === 'dashboard' && (
          <div>
            {/* Top Stat Cards (Win Rate, Total signals, Daily ROI, Streak) */}
            <StatsDashboard stats={stats} />

            {/* Category Switcher, Filter and Search Bar */}
            <GameCategoryTabs
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedSource={selectedSource}
              onSelectSource={setSelectedSource}
              minConfidence={minConfidence}
              setMinConfidence={setMinConfidence}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              counts={categoryCounts}
            />

            {/* Signals Grid */}
            {filteredSignals.length === 0 ? (
              <div className="glass-panel p-12 rounded-2xl text-center border-slate-800 space-y-3">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-base font-bold text-white">
                  {language === 'hi' ? 'Koi signal match nahi hua' : 'No Active Signals Match Your Filter'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {language === 'hi'
                    ? 'Confidence filter kam karein ya category badalkar dekhein. Naye signals har 20-30 seconds mein aate hain.'
                    : 'Try lowering the minimum confidence slider or clearing search keywords. Signals auto-calibrate continuously.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSource('ALL');
                    setMinConfidence(80);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs transition hover:bg-emerald-400"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSignals.map((signal) => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    onOpenDeepScan={handleOpenDeepScan}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: HISTORY & ACCURACY */}
        {currentTab === 'history' && (
          <HistoryTable history={historySignals} />
        )}

        {/* VIEW 3: AI PATTERN LAB */}
        {currentTab === 'ai-lab' && (
          <AILabView />
        )}

        {/* VIEW 4: ADMIN OPERATIONS CONSOLE */}
        {currentTab === 'admin' && (
          <AdminPanel
            activeSignals={activeSignals}
            systemSettings={systemSettings}
            onRefreshData={() => {
              fetchData();
              fetchHistory();
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300 font-mono">PROSIGNAL AI</span>
            <span>•</span>
            <span>All Games & Casino Intelligence Terminal</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry Connected (Port 3000)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              18+ Responsible Staking Only
            </span>
          </div>
        </div>
      </footer>

      {/* Deep AI Scan Modal */}
      <AIDeepScanModal
        isOpen={isDeepScanOpen}
        onClose={() => setIsDeepScanOpen(false)}
        selectedSignal={deepScanSignal}
      />

      {/* Android APK & PWA Install Modal */}
      <AndroidInstallModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
