import React, { useState, useEffect } from "react";
import { Zap, Volume2, VolumeX, BellRing, ArrowRight, X } from "lucide-react";
import { NewsArticle, LanguageType } from "../types";

interface BreakingNewsTickerProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  currentLang: LanguageType;
  onOpenPushModal: () => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  articles,
  onSelectArticle,
  currentLang,
  onOpenPushModal,
}) => {
  const breakingNews = articles.filter((a) => a.isBreaking || a.isUrgent);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showUrgentBanner, setShowUrgentBanner] = useState(true);

  // Auto rotate ticker every 5 seconds
  useEffect(() => {
    if (breakingNews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  if (breakingNews.length === 0 || !showUrgentBanner) return null;

  const currentArticle = breakingNews[currentIndex] || articles[0];

  const handlePlayTone = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled && typeof window !== "undefined" && window.AudioContext) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 tone
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
        console.log("Audio feedback", e);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-700 text-white shadow-xs border-b border-red-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 bg-white text-red-700 font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider text-[10px] shadow-xs animate-pulse">
            <Zap className="w-3 h-3 fill-red-700" />
            {currentLang === "id" ? "KILAS MENDESAK" : "BREAKING NEWS"}
          </span>
          <span className="hidden md:inline-block text-red-200 font-bold text-xs">
            [{currentArticle.region}]
          </span>
        </div>

        {/* Center Marquee text */}
        <div 
          onClick={() => onSelectArticle(currentArticle)}
          className="flex-1 truncate cursor-pointer hover:underline font-semibold flex items-center gap-2 group"
        >
          <span className="truncate">
            {currentLang === "id" ? currentArticle.title : (currentArticle.titleEn || currentArticle.title)}
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Audio Alert Toggle */}
          <button
            onClick={handlePlayTone}
            className="p-1 rounded-full text-red-100 hover:text-white hover:bg-red-800/60 transition-colors"
            title={soundEnabled ? "Nonaktifkan Nada Notifikasi" : "Uji Nada Peringatan Mendesak"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>

          {/* Push Alert Setup */}
          <button
            onClick={onOpenPushModal}
            className="hidden sm:flex items-center gap-1 bg-black/20 hover:bg-black/30 text-white px-3 py-0.5 rounded-full text-xs font-semibold border border-white/20 transition-colors"
          >
            <BellRing className="w-3 h-3 text-amber-300" />
            <span>{currentLang === "id" ? "Push Alert" : "Push Alerts"}</span>
          </button>

          {/* Close banner */}
          <button
            onClick={() => setShowUrgentBanner(false)}
            className="p-1 text-red-200 hover:text-white rounded-full"
            title="Tutup banner kilas berita"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
