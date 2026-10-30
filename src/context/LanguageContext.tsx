import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  appTitle: string;
  tagline: string;
  allGamesDashboard: string;
  aiSignalSystem: string;
  liveSignals: string;
  adminPanel: string;
  historyAccuracy: string;
  categories: {
    all: string;
    casino: string;
    crash: string;
    color: string;
    sports: string;
    slots: string;
  };
  sources: {
    ai: string;
    telemetry: string;
    admin: string;
  };
  filterConfidence: string;
  activeOnly: string;
  searchGames: string;
  winRate: string;
  dailyROI: string;
  totalSignals: string;
  streak: string;
  copySignal: string;
  copied: string;
  deepScanBtn: string;
  scanDetails: string;
  downloadApp: string;
  switchAdmin: string;
  switchUser: string;
  odds: string;
  confidence: string;
  risk: string;
  stake: string;
  round: string;
  verifying: string;
  active: string;
  won: string;
  lost: string;
  soundOn: string;
  soundOff: string;
}

const translationsEn: Translations = {
  appTitle: 'PROSIGNAL AI',
  tagline: 'All Games & Casino Intelligence Terminal',
  allGamesDashboard: 'All Games Dashboard',
  aiSignalSystem: 'AI Signal System',
  liveSignals: 'Live Signals',
  adminPanel: 'Admin Panel',
  historyAccuracy: 'History & Accuracy',
  categories: {
    all: 'All Categories',
    casino: 'Casino Games',
    crash: 'Crash Games (Aviator)',
    color: 'Color Prediction',
    sports: 'Sports Betting',
    slots: 'Slots & RTP',
  },
  sources: {
    ai: 'AI Algorithm',
    telemetry: 'Live Telemetry',
    admin: 'Admin Pro Signal',
  },
  filterConfidence: 'Min Confidence',
  activeOnly: 'Live Only',
  searchGames: 'Search games, rounds...',
  winRate: 'Win Rate Accuracy',
  dailyROI: 'Daily Performance ROI',
  totalSignals: 'Total Signals',
  streak: 'Active Streak',
  copySignal: 'Copy Signal',
  copied: 'Signal Copied!',
  deepScanBtn: 'AI Pattern Scan',
  scanDetails: 'Algorithm Breakdown & Kelly Stake',
  downloadApp: 'Android APK / Install',
  switchAdmin: 'Admin Console',
  switchUser: 'User Terminal',
  odds: 'Odds / Payout',
  confidence: 'Confidence',
  risk: 'Risk Level',
  stake: 'Recommended Bet',
  round: 'Round ID',
  verifying: 'VERIFYING ROUND...',
  active: 'LIVE SIGNAL',
  won: 'WON ✓',
  lost: 'MISSED ✗',
  soundOn: 'Audio Alerts On',
  soundOff: 'Audio Muted',
};

const translationsHi: Translations = {
  appTitle: 'PROSIGNAL AI',
  tagline: 'Casino & All Games Live AI Signals Dashboard',
  allGamesDashboard: 'All Games Dashboard',
  aiSignalSystem: 'AI Signal System (Bhavishyavani)',
  liveSignals: 'Live Signals (Turant Signals)',
  adminPanel: 'Admin Panel (Control Room)',
  historyAccuracy: 'History & Accuracy (Record & Accuracy)',
  categories: {
    all: 'Sabhi Games',
    casino: 'Casino Games (Roulette, Baccarat)',
    crash: 'Crash Games (Aviator, JetX)',
    color: 'Color Prediction (WinGo)',
    sports: 'Sports Betting (Cricket, Football)',
    slots: 'Slots & Live Tables',
  },
  sources: {
    ai: 'AI Automatic Signal',
    telemetry: 'Live API Telemetry',
    admin: 'Admin Manual Signal',
  },
  filterConfidence: 'Kam se Kam Confidence',
  activeOnly: 'Sirf Live Signals',
  searchGames: 'Game ya round khojein...',
  winRate: 'Winning Accuracy %',
  dailyROI: 'Aaj Ka Profit (Daily ROI)',
  totalSignals: 'Kul Signals (Total)',
  streak: 'Lagataar Jeet (Streak)',
  copySignal: 'Signal Copy Karein',
  copied: 'Signal Copy Ho Gaya!',
  deepScanBtn: 'AI Deep Pattern Scan',
  scanDetails: 'Pattern Aur Bet Amount Analysis',
  downloadApp: 'Android APK Download',
  switchAdmin: 'Admin Panel',
  switchUser: 'User View',
  odds: 'Odds / Guna',
  confidence: 'Confidence Score',
  risk: 'Risk Level',
  stake: 'Recommended Bet (Kelly)',
  round: 'Round No.',
  verifying: 'Nateeja Check Ho Raha Hai...',
  active: 'ACTIVE SIGNAL',
  won: 'JEET GAYA (WON) ✓',
  lost: 'HAAR GAYA (LOST) ✗',
  soundOn: 'Awaaz On',
  soundOff: 'Awaaz Band',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translationsEn,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('prosignal_lang') as Language;
    if (saved === 'en' || saved === 'hi') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('prosignal_lang', lang);
  };

  const t = language === 'hi' ? translationsHi : translationsEn;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
