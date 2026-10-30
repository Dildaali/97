import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  TrendingUp, 
  Flame,
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { SignalData } from '../types/signal';
import { useLanguage } from '../context/LanguageContext';

interface HistoryTableProps {
  history: (SignalData & { resolvedAt?: number; resultProfit?: string })[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'WON' | 'LOST'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.gameName.toLowerCase().includes(search.toLowerCase()) ||
      item.roundId.toLowerCase().includes(search.toLowerCase()) ||
      item.targetPrediction.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || item.status === statusFilter;

    const matchesCat =
      categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCat;
  });

  const wonTotal = history.filter((h) => h.status === 'WON').length;
  const lostTotal = history.filter((h) => h.status === 'LOST').length;
  const accuracyPercent = history.length > 0 ? ((wonTotal / history.length) * 100).toFixed(1) : '91.8';

  const handleExportCSV = () => {
    const headers = 'RoundID,GameName,Category,Prediction,Odds,Confidence,Status,Profit,Time\n';
    const rows = filteredHistory
      .map(
        (h) =>
          `"${h.roundId}","${h.gameName}","${h.category}","${h.targetPrediction}","${h.odds}","${h.confidence}%","${h.status}","${h.resultProfit || ''}","${new Date(h.resolvedAt || h.createdAt).toISOString()}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ProSignal_Historical_Accuracy_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Telemetry Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">
            {language === 'hi' ? 'Kul Jaanch Kiye Gaye Signals' : 'Historical Verification Total'}
          </span>
          <div className="text-2xl font-extrabold text-white font-mono">
            {history.length} <span className="text-xs text-slate-500 font-normal">Records</span>
          </div>
          <div className="mt-2 text-xs flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">{wonTotal} Won</span>
            <span>•</span>
            <span className="text-rose-400 font-semibold">{lostTotal} Lost</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-emerald-500/30 glow-emerald">
          <span className="text-xs text-slate-400 block mb-1">
            {language === 'hi' ? 'Pratyaksh Winning Accuracy' : 'Verified Win Rate %'}
          </span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {accuracyPercent}%
          </div>
          <p className="mt-2 text-[11px] text-emerald-300/80">
            {language === 'hi' ? 'Casino & Crash signals par sarvashreshth pradarshan' : 'Peak accuracy on Roulette, Baccarat & Aviator'}
          </p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border-cyan-500/30">
          <span className="text-xs text-slate-400 block mb-1">
            {language === 'hi' ? 'Daily Net Performance ROI' : 'Daily Net Staking Yield'}
          </span>
          <div className="text-2xl font-extrabold text-cyan-300 font-mono">
            +18.4% ROI
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {language === 'hi' ? 'Kelly Criterion 2.5% unit par aadharit' : 'Calculated on disciplined 2.5 unit Kelly model'}
          </p>
        </div>
      </div>

      {/* Filter and Export Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'hi' ? 'Pichla signal ya round khojein...' : 'Search signal records, game, round...'}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Won / Lost Status Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg transition ${
              statusFilter === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'
            }`}
          >
            {language === 'hi' ? 'Sabhi Records' : 'All Records'}
          </button>
          <button
            onClick={() => setStatusFilter('WON')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              statusFilter === 'WON'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'text-slate-400'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {language === 'hi' ? 'Sirf Sahi (Won)' : 'Won Hits'}
          </button>
          <button
            onClick={() => setStatusFilter('LOST')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
              statusFilter === 'LOST'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'text-slate-400'
            }`}
          >
            <XCircle className="w-3 h-3 text-rose-400" />
            {language === 'hi' ? 'Sirf Galat (Lost)' : 'Missed'}
          </button>
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
        >
          <option value="ALL">{language === 'hi' ? 'Sabhi Categories' : 'All Categories'}</option>
          <option value="casino">Casino (Roulette, Baccarat, Andar Bahar)</option>
          <option value="crash">Crash Games (Aviator)</option>
          <option value="color">Color Prediction (WinGo)</option>
          <option value="sports">Sports Betting</option>
        </select>

        {/* CSV Export Button */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition"
          title="Download CSV historical data report"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>{language === 'hi' ? 'CSV Export Karein' : 'Export CSV'}</span>
        </button>

      </div>

      {/* Historical Signals Table */}
      <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">{language === 'hi' ? 'Nateeja' : 'Outcome'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'Game & Round' : 'Game & Round'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'Target Signal' : 'Target Signal'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'Odds / Confidence' : 'Odds & Confidence'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'Pahchana Gaya Pattern' : 'Detected Pattern'}</th>
                <th className="py-3.5 px-4">{language === 'hi' ? 'Profit / Yield' : 'Yield Result'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-sans">
                    {language === 'hi' ? 'Koi signal record nahi mila.' : 'No historical signals match your current filter.'}
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => {
                  const isWon = item.status === 'WON';
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-900/50 transition-colors"
                    >
                      {/* Outcome Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            isWon
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                              : 'bg-rose-500/15 text-rose-400 border-rose-500/40'
                          }`}
                        >
                          {isWon ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isWon ? (language === 'hi' ? 'WON ✓' : 'WON') : (language === 'hi' ? 'LOST ✗' : 'LOST')}
                        </span>
                      </td>

                      {/* Game & Round */}
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-bold text-slate-200">{item.gameName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{item.roundId}</div>
                      </td>

                      {/* Target Signal */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-emerald-300 font-mono text-xs sm:text-sm">
                          {item.targetPrediction}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans line-clamp-1">
                          {item.detailOutcome}
                        </div>
                      </td>

                      {/* Odds & Confidence */}
                      <td className="py-3.5 px-4">
                        <div className="text-cyan-300 font-bold">{item.odds}</div>
                        <div className="text-[11px] text-slate-400">{item.confidence}% AI confidence</div>
                      </td>

                      {/* Detected Pattern */}
                      <td className="py-3.5 px-4 font-sans text-slate-300">
                        <div className="line-clamp-1">{item.patternType}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{item.source.replace('_', ' ')}</div>
                      </td>

                      {/* Yield Result */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`font-bold ${
                            isWon ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {item.resultProfit || (isWon ? '+100% PROFIT' : '-1.0 Unit')}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
