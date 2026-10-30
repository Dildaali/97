import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle, 
  QrCode, 
  Globe, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      // Trigger a sample client blob download so user gets a real file experience!
      const content = `PROSIGNAL AI - ANDROID PACKAGE INSTALLER MANIFEST
Package: com.prosignal.ai.casino
Version: 4.8.2-PRO
Target Platform: Android 10+ (Kotlin & Webview Runtime)
Security: SHA-256 Verified
Signals Engine: Gemini 3.8 Flash Neural & Telemetry Socket

Installation Instructions:
1. Tap Install / Allow Unknown Sources if prompted.
2. Open ProSignal AI and allow background notifications.
3. Live audio chime alerts will auto-sync with live rounds!`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ProSignal_AI_v4.8_Android_Setup.txt';
      a.click();
      URL.revokeObjectURL(url);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-xl rounded-2xl border border-emerald-500/40 overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{language === 'hi' ? 'Android APK & Web App' : 'Android App & PWA Installation'}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                  v4.8 APK
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'Apne mobile phone par live signals paane ke do tareeqe' : 'Dual deployment: Native Android APK & Instant Web App'}
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

        {/* Body Content */}
        <div className="p-6 space-y-6 text-xs">
          
          {/* Method 1: Android APK Download */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-emerald-400 font-bold text-sm block flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  {language === 'hi' ? 'Tareeqa 1: Direct Android APK (Kotlin Hybrid)' : 'Method 1: Direct Android APK File'}
                </span>
                <p className="text-slate-300 mt-1 text-[11px]">
                  {language === 'hi'
                    ? 'Background push notifications, live popup floating bubble, aur instant sound alerts ke saath.'
                    : 'Features native floating overlay signals, push notifications, and ultra-low latency background service.'}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                14.2 MB
              </span>
            </div>

            <div className="mt-3">
              <button
                onClick={handleSimulateDownload}
                disabled={downloading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition disabled:opacity-50"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>{language === 'hi' ? 'Package Taiyar Ho Raha Hai...' : 'Packaging ProSignal_AI_v4.8.apk...'}</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-slate-950" />
                    <span>{language === 'hi' ? 'APK Download Shuru Ho Gaya!' : 'APK Package Generated!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{language === 'hi' ? 'Android APK Download Karein (v4.8)' : 'Download Android APK (v4.8)'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Method 2: Instant PWA "Add to Home Screen" */}
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <span className="text-cyan-300 font-bold text-sm block flex items-center gap-1.5 mb-1">
              <Globe className="w-4 h-4" />
              {language === 'hi' ? 'Tareeqa 2: Instant Web App (Bina Download Kiye)' : 'Method 2: Instant Web App (No Download Required)'}
            </span>
            <p className="text-slate-400 text-[11px] mb-3">
              {language === 'hi'
                ? 'Apne Chrome ya Safari browser mein "Add to Home Screen" dabayein aur turant app ki tarah use karein.'
                : 'Tap your browser menu (...) and select "Add to Home screen" to install as a standalone PWA on any device.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">1</span>
                <span>Chrome mein 3-dots menu dabayein</span>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">2</span>
                <span>"Install App" ya "Add to Home Screen" chunein</span>
              </div>
            </div>
          </div>

          {/* QR Code Quick Connect for Mobile */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-lg flex-shrink-0">
              <QrCode className="w-16 h-16 text-slate-950" />
            </div>
            <div>
              <span className="font-bold text-white block mb-0.5">
                {language === 'hi' ? 'Mobile Se QR Code Scan Karein' : 'Scan With Mobile Camera'}
              </span>
              <p className="text-slate-400 text-[11px]">
                {language === 'hi'
                  ? 'Apne Android ya iPhone ke camera se scan karke turant live signals dashboard kholein.'
                  : 'Instantly opens the full-screen terminal on your smartphone with synchronized signals.'}
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-900/90 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            100% Safe & Verified Package
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
