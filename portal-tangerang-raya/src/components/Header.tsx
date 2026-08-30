import React, { useState } from "react";
import { 
  Bell, 
  Bookmark, 
  Bot, 
  Search, 
  Globe, 
  Menu, 
  X, 
  Sun, 
  ShieldCheck, 
  PhoneCall, 
  Building2, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  Compass, 
  Sparkles,
  Newspaper,
  Flame
} from "lucide-react";
import { LanguageType, RegionType, TabType } from "../types";
import { AppLogo } from "./AppLogo";

interface HeaderProps {
  currentLang: LanguageType;
  onToggleLang?: (lang: LanguageType) => void;
  setCurrentLang?: (lang: LanguageType) => void;
  activeRegion: RegionType;
  onSelectRegion?: (region: RegionType) => void;
  setActiveRegion?: (region: RegionType) => void;
  activeTab: TabType | string;
  onSelectTab?: (tab: TabType | string) => void;
  setActiveTab?: (tab: TabType) => void;
  unreadNotifsCount?: number;
  favoritesCount?: number;
  savedCount?: number;
  onOpenNotifs?: () => void;
  onOpenPushModal?: () => void;
  onOpenFavorites?: () => void;
  onOpenBookmarks?: () => void;
  onOpenAI?: () => void;
  onOpenAiModal?: () => void;
  onOpenPublisherInfo?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  setCurrentLang,
  activeRegion,
  onSelectRegion,
  setActiveRegion,
  activeTab,
  onSelectTab,
  setActiveTab,
  unreadNotifsCount = 2,
  favoritesCount = 0,
  savedCount = 0,
  onOpenNotifs,
  onOpenPushModal,
  onOpenFavorites,
  onOpenBookmarks,
  onOpenAI,
  onOpenAiModal,
  onOpenPublisherInfo,
  searchQuery = "",
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState(searchQuery);

  const handleLanguageChange = (lang: LanguageType) => {
    if (onToggleLang) onToggleLang(lang);
    if (setCurrentLang) setCurrentLang(lang);
  };

  const handleRegionChange = (reg: RegionType) => {
    if (onSelectRegion) onSelectRegion(reg);
    if (setActiveRegion) setActiveRegion(reg);
  };

  const handleTabChange = (tab: any) => {
    if (onSelectTab) onSelectTab(tab);
    if (setActiveTab) setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleOpenPush = () => {
    if (onOpenNotifs) onOpenNotifs();
    if (onOpenPushModal) onOpenPushModal();
  };

  const handleOpenSaved = () => {
    if (onOpenFavorites) onOpenFavorites();
    if (onOpenBookmarks) onOpenBookmarks();
  };

  const handleOpenAssistant = () => {
    if (onOpenAI) onOpenAI();
    if (onOpenAiModal) onOpenAiModal();
  };

  const totalSaved = favoritesCount || savedCount || 0;

  const navItems: { id: TabType; labelId: string; labelEn: string; icon: any }[] = [
    { id: "berita", labelId: "Berita", labelEn: "News", icon: Newspaper },
    { id: "layanan", labelId: "Layanan", labelEn: "Services", icon: PhoneCall },
    { id: "agenda", labelId: "Agenda", labelEn: "Events", icon: Calendar },
    { id: "umkm", labelId: "UMKM", labelEn: "MSMEs", icon: ShoppingBag },
    { id: "pariwisata", labelId: "Wisata", labelEn: "Tourism", icon: Compass },
    { id: "properti", labelId: "Properti", labelEn: "Property", icon: Building2 },
    { id: "penawaran", labelId: "Kemitraan", labelEn: "Partners", icon: Sparkles },
  ];

  const regions: RegionType[] = ["Semua", "Kota Tangerang", "Tangerang Selatan", "Kabupaten Tangerang"];

  const currentDate = new Date().toLocaleDateString(currentLang === "id" ? "id-ID" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Bento Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Date & Live Weather Pill */}
          <div className="flex items-center gap-3 font-medium">
            <span className="hidden sm:inline-block text-slate-300">{currentDate}</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <div className="flex items-center gap-1.5 bg-slate-800/90 text-amber-400 px-2.5 py-0.5 rounded-full text-[11px] border border-slate-700/80">
              <Sun className="w-3.5 h-3.5" />
              <span>Tangerang 28°C</span>
              <span className="bg-emerald-900/90 text-emerald-300 px-1.5 py-0.2 rounded-full font-bold text-[9px] ml-1">
                AQI 65
              </span>
            </div>
          </div>

          {/* Right: Emergency 112, Google Publisher Badge & Language */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Quick 112 Hotline */}
            <a 
              href="tel:112"
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 py-0.5 rounded-full transition-colors text-[11px] shadow-xs"
              title="Call Center Darurat Bebas Pulsa"
            >
              <PhoneCall className="w-3 h-3 animate-pulse" />
              <span>112 Darurat</span>
            </a>

            {/* Google Publisher Badge */}
            <button
              onClick={() => onOpenPublisherInfo && onOpenPublisherInfo()}
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700 text-[11px]"
              title="Terverifikasi Google Publisher Center & Dewan Pers"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Google Publisher Center</span>
            </button>

            {/* Language Switcher Bento Pill */}
            <div className="flex items-center bg-slate-800 rounded-full p-0.5 border border-slate-700">
              <button
                onClick={() => handleLanguageChange("id")}
                className={`px-2 py-0.5 rounded-full font-bold text-[10px] transition-colors ${
                  currentLang === "id" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2 py-0.5 rounded-full font-bold text-[10px] transition-colors ${
                  currentLang === "en" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bento Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Bento Brand Logo */}
          <div 
            onClick={() => handleTabChange("berita")}
            className="cursor-pointer group"
          >
            <AppLogo 
              size="md" 
              tagline={currentLang === "id" ? "Pusat Informasi, Layanan Publik & UMKM Terpadu" : "Integrated Greater Tangerang Hub"} 
            />
          </div>

          {/* Center Tabs Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-white text-blue-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{currentLang === "id" ? item.labelId : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & AI Trigger */}
          <div className="flex items-center gap-2">
            {/* AI Assistant Button */}
            <button
              onClick={handleOpenAssistant}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              title="Tanya AI Asisten Tangerang"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden md:inline">AI Navigator</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={handleOpenPush}
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Notifikasi Berita Mendesak"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Bookmarks Button */}
            <button
              onClick={handleOpenSaved}
              className="relative p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Konten Favorit Tersimpan"
            >
              <Bookmark className="w-4 h-4" />
              {totalSaved > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalSaved}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors ml-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Region Filter Bar (Bento Sub-row) */}
        <div className="hidden lg:flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {currentLang === "id" ? "Wilayah:" : "Region:"}
            </span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => handleRegionChange(reg)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeRegion === reg
                    ? "bg-slate-900 text-white shadow-2xs font-bold"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {reg === "Semua" ? (currentLang === "id" ? "Semua Wilayah" : "All Regions") : reg}
              </button>
            ))}
          </div>

          {/* Quick Trending Tag */}
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <span className="flex items-center gap-1 text-blue-600 font-bold">
              <Flame className="w-3 h-3 text-red-500" />
              Kilas Topik:
            </span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">#MRTPhase3Tangerang</span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">#FestivalCisadane2026</span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">#InvestasiBSD</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* Region Chips Mobile */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {currentLang === "id" ? "Pilih Wilayah:" : "Select Region:"}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    handleRegionChange(reg);
                  }}
                  className={`text-xs p-2 rounded-xl text-left font-semibold border transition-all ${
                    activeRegion === reg
                      ? "bg-blue-50 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Categories */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {currentLang === "id" ? "Kategori Menu:" : "Categories:"}
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{currentLang === "id" ? item.labelId : item.labelEn}</span>
                  </div>
                  {isActive && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Aktif</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
