import React, { useState, useEffect } from 'react';
import { 
  Send, 
  PlusCircle, 
  Users, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Bell, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Settings, 
  TrendingUp,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { SignalData, SystemSettings, SubscriberUser } from '../types/signal';
import { useLanguage } from '../context/LanguageContext';

interface AdminPanelProps {
  activeSignals: SignalData[];
  systemSettings: SystemSettings;
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  activeSignals,
  systemSettings,
  onRefreshData,
}) => {
  const { t, language } = useLanguage();
  const [adminSubTab, setAdminSubTab] = useState<'publish' | 'manage' | 'games' | 'users' | 'settings'>('publish');
  
  // Publish Signal Form
  const [gameName, setGameName] = useState('Lightning Roulette');
  const [category, setCategory] = useState<'casino' | 'crash' | 'color' | 'sports' | 'slots'>('casino');
  const [targetPrediction, setTargetPrediction] = useState('RED (2nd Dozen 13-24)');
  const [detailOutcome, setDetailOutcome] = useState('High multiplier clump detected in 2nd Dozen');
  const [odds, setOdds] = useState('2.00x');
  const [confidence, setConfidence] = useState(93);
  const [risk, setRisk] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [expirySeconds, setExpirySeconds] = useState(45);
  const [reasoning, setReasoning] = useState('Admin technical chart validation: Sector bias confirmed');
  const [recommendedUnits, setRecommendedUnits] = useState('2.5 Units');
  const [publishStatus, setPublishStatus] = useState<string | null>(null);

  // Broadcast Banner state
  const [bannerText, setBannerText] = useState(systemSettings.adminNotificationBanner);
  const [aiAuto, setAiAuto] = useState(systemSettings.aiAutoGeneration);
  const [autoVerify, setAutoVerify] = useState(systemSettings.autoVerification);

  // New Game Form
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameCat, setNewGameCat] = useState<'casino' | 'crash' | 'color' | 'sports'>('casino');
  const [newGameOdds, setNewGameOdds] = useState('2.00x');

  // Users State
  const [users, setUsers] = useState<SubscriberUser[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTier, setNewUserTier] = useState('VIP Elite');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/signals/admin/users');
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublishSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/signals/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName,
          category,
          targetPrediction,
          detailOutcome,
          odds,
          confidence,
          risk,
          expirySeconds,
          reasoning,
          recommendedUnits,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPublishStatus('✓ Signal successfully broadcast to all active terminals!');
        onRefreshData();
        setTimeout(() => setPublishStatus(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveSignal = async (id: string, result: 'WON' | 'LOST') => {
    try {
      const res = await fetch('/api/signals/admin/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, result }),
      });
      const data = await res.json();
      if (data.success) {
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/signals/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminNotificationBanner: bannerText,
          aiAutoGeneration: aiAuto,
          autoVerification: autoVerify,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPublishStatus('✓ System settings updated successfully!');
        onRefreshData();
        setTimeout(() => setPublishStatus(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNewGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameTitle) return;
    try {
      const res = await fetch('/api/signals/admin/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameName: newGameTitle,
          category: newGameCat,
          defaultOdds: newGameOdds,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewGameTitle('');
        setPublishStatus('✓ New game added to dashboard feed!');
        onRefreshData();
        setTimeout(() => setPublishStatus(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName) return;
    try {
      const res = await fetch('/api/signals/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          tier: newUserTier,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewUserName('');
        setNewUserEmail('');
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Top Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 p-5 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 glow-amber">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{language === 'hi' ? 'Admin Control Terminal' : 'Admin Operations Console'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                ROOT AUTH
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'hi'
                ? 'Signals publish karein, active signals ko WON/LOST mark karein, aur naye games jodain'
                : 'Publish manual signals, resolve live rounds, manage user subscribers, and broadcast alerts'}
            </p>
          </div>
        </div>

        {/* Sub-Navigation Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setAdminSubTab('publish')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminSubTab === 'publish'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? '1. Signal Publish' : '1. Publish Signal'}
          </button>
          <button
            onClick={() => setAdminSubTab('manage')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminSubTab === 'manage'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? '2. Manage Signals' : '2. Active Signals'} ({activeSignals.length})
          </button>
          <button
            onClick={() => setAdminSubTab('games')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminSubTab === 'games'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? '3. Games Add' : '3. Add Game'}
          </button>
          <button
            onClick={() => setAdminSubTab('users')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminSubTab === 'users'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? '4. Users Manage' : '4. Users'}
          </button>
          <button
            onClick={() => setAdminSubTab('settings')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminSubTab === 'settings'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? '5. System Settings' : '5. Settings'}
          </button>
        </div>
      </div>

      {publishStatus && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{publishStatus}</span>
        </div>
      )}

      {/* TAB 1: PUBLISH NEW SIGNAL */}
      {adminSubTab === 'publish' && (
        <div className="glass-panel p-6 rounded-2xl border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Send className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? 'Naya VIP Signal Publish Karein' : 'Broadcast Live Gaming Signal'}</span>
          </h3>

          <form onSubmit={handlePublishSignal} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Game Name</label>
                <select
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Lightning Roulette (Live)">Lightning Roulette (Live)</option>
                  <option value="Speed Baccarat A">Speed Baccarat A</option>
                  <option value="Dragon Tiger Live">Dragon Tiger Live</option>
                  <option value="Super Andar Bahar">Super Andar Bahar</option>
                  <option value="Live Teen Patti 20-20">Live Teen Patti 20-20</option>
                  <option value="Aviator Crash Pro">Aviator Crash Pro</option>
                  <option value="WinGo 1-Minute Color">WinGo 1-Minute Color</option>
                  <option value="Live T20 Cricket Championship">Live T20 Cricket Championship</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="casino">Casino (Roulette / Baccarat / Cards)</option>
                  <option value="crash">Crash Games (Aviator)</option>
                  <option value="color">Color Prediction</option>
                  <option value="sports">Sports Betting</option>
                  <option value="slots">Slots / Live Tables</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Odds / Payout</label>
                <input
                  type="text"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  placeholder="e.g. 2.00x or 2.45x"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1 font-medium">
                  {language === 'hi' ? 'Target Prediction (Mukhya Signal):' : 'Target Prediction (Clear Action):'}
                </label>
                <input
                  type="text"
                  value={targetPrediction}
                  onChange={(e) => setTargetPrediction(e.target.value)}
                  placeholder="e.g. BANKER, RED 2nd Dozen, CASH OUT @ 2.40x"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-emerald-300 font-bold font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Confidence Score: {confidence}%</label>
                <input
                  type="range"
                  min="80"
                  max="99"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Risk Level</label>
                <select
                  value={risk}
                  onChange={(e) => setRisk(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="LOW">LOW RISK</option>
                  <option value="MEDIUM">MEDIUM RISK</option>
                  <option value="HIGH">HIGH RISK</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">
                  {language === 'hi' ? 'Bet Timer (Seconds):' : 'Signal Expiry Timer (Seconds):'}
                </label>
                <input
                  type="number"
                  value={expirySeconds}
                  onChange={(e) => setExpirySeconds(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Recommended Bet Units</label>
                <input
                  type="text"
                  value={recommendedUnits}
                  onChange={(e) => setRecommendedUnits(e.target.value)}
                  placeholder="e.g. 2.5 Units (Kelly Safe)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-cyan-300 font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-slate-400 block mb-1 font-medium">Detailed Instructions / Sub-Bets</label>
                <input
                  type="text"
                  value={detailOutcome}
                  onChange={(e) => setDetailOutcome(e.target.value)}
                  placeholder="Specific numbers, card combinations, or cashout timing"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-slate-400 block mb-1 font-medium">Technical Rationale & Pattern</label>
                <textarea
                  rows={2}
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="Why is this signal high confidence?"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'Signal Live Bhejein (Broadcast Now)' : 'Broadcast Live Signal To All Terminals'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: MANAGE & RESOLVE ACTIVE SIGNALS */}
      {adminSubTab === 'manage' && (
        <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'Active Signals Nateeja Nirdharan (Resolve/Verify)' : 'Live Signal Resolution Console'}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{activeSignals.length} Active Feeds</span>
          </div>

          <div className="divide-y divide-slate-800">
            {activeSignals.map((sig) => (
              <div key={sig.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{sig.gameName}</span>
                    <span className="font-mono text-slate-400">({sig.roundId})</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {sig.remainingSeconds}s left
                    </span>
                  </div>
                  <div className="text-emerald-300 font-bold font-mono text-sm mt-0.5">
                    {sig.targetPrediction}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Odds: {sig.odds} • Confidence: {sig.confidence}% • Source: {sig.source}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResolveSignal(sig.id, 'WON')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 font-bold transition"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'hi' ? 'Mark Won ✓' : 'Mark WON'}</span>
                  </button>

                  <button
                    onClick={() => handleResolveSignal(sig.id, 'LOST')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 font-bold transition"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>{language === 'hi' ? 'Mark Lost ✗' : 'Mark LOST'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ADD NEW GAME */}
      {adminSubTab === 'games' && (
        <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-cyan-400" />
            <span>{language === 'hi' ? 'Naya Game Dashboard Par Jodein' : 'Register New Casino or Gaming Table'}</span>
          </h3>

          <form onSubmit={handleAddNewGame} className="space-y-4 text-xs max-w-xl">
            <div>
              <label className="text-slate-400 block mb-1">Game Name</label>
              <input
                type="text"
                value={newGameTitle}
                onChange={(e) => setNewGameTitle(e.target.value)}
                placeholder="e.g. Mega Sic Bo, Hindi Roulette, Crazy Time Live"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={newGameCat}
                  onChange={(e) => setNewGameCat(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="casino">Casino (Roulette, Cards)</option>
                  <option value="crash">Crash Game</option>
                  <option value="color">Color Prediction</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Default Odds</label>
                <input
                  type="text"
                  value={newGameOdds}
                  onChange={(e) => setNewGameOdds(e.target.value)}
                  placeholder="2.00x"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'Game Activate Karein' : 'Activate Game Feed'}</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: USERS & SUBSCRIBERS */}
      {adminSubTab === 'users' && (
        <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>{language === 'hi' ? 'Subscribers Aur VIP Users Manage Karein' : 'Subscriber Management & VIP Access'}</span>
            </h3>
            <span className="text-xs text-slate-400">{users.length} Registered Traders</span>
          </div>

          {/* Quick add user form */}
          <form onSubmit={handleAddUser} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex flex-wrap gap-2 text-xs">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="User Name (e.g. Suresh Kumar)"
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white flex-1 min-w-[140px]"
              required
            />
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Email address"
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white flex-1 min-w-[140px]"
            />
            <select
              value={newUserTier}
              onChange={(e) => setNewUserTier(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white"
            >
              <option value="VIP Elite">VIP Elite (All Games)</option>
              <option value="Pro Trader">Pro Trader (Casino Only)</option>
              <option value="Free Trial">Free Trial</option>
            </select>
            <button
              type="submit"
              className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg transition"
            >
              Add User
            </button>
          </form>

          {/* Users List */}
          <div className="divide-y divide-slate-800 text-xs">
            {users.map((u) => (
              <div key={u.id} className="py-2.5 flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-slate-400 text-[11px]">{u.email} • Joined {u.joined}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 text-[11px]">
                    {u.tier}
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">{u.winRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM SETTINGS & BROADCASTS */}
      {adminSubTab === 'settings' && (
        <div className="glass-panel p-6 rounded-2xl border-slate-800 space-y-5 text-xs max-w-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>{language === 'hi' ? 'System Broadcast & Automation Controls' : 'System Automation & Broadcast Config'}</span>
          </h3>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">
              {language === 'hi' ? 'Live Announcement Ticker Banner:' : 'Live Announcement Ticker Message:'}
            </label>
            <input
              type="text"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-200"
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={aiAuto}
                onChange={(e) => setAiAuto(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <div>
                <span className="font-bold text-white block">
                  {language === 'hi' ? 'AI Automatic Signal Generation' : 'AI Autonomous Background Signal Generation'}
                </span>
                <span className="text-slate-400 text-[11px]">
                  Automatically recalculates casino and crash volatility cycles every 30 seconds
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoVerify}
                onChange={(e) => setAutoVerify(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <div>
                <span className="font-bold text-white block">
                  {language === 'hi' ? 'Auto Round Verification Engine' : 'Auto Round Resolution & Win Rate Tracker'}
                </span>
                <span className="text-slate-400 text-[11px]">
                  Simulates realistic live round closures and adds to accuracy archive
                </span>
              </div>
            </label>
          </div>

          <button
            onClick={handleSaveSettings}
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
          >
            Save System Settings
          </button>
        </div>
      )}

    </div>
  );
};
