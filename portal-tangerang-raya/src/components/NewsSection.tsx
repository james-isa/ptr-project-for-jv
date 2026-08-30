import React, { useState } from "react";
import { 
  Flame, 
  TrendingUp, 
  Clock, 
  Eye, 
  Bookmark, 
  MapPin, 
  Filter, 
  Zap,
  Search,
  Share2,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Newspaper
} from "lucide-react";
import { NewsArticle, LanguageType, RegionType } from "../types";

interface NewsSectionProps {
  articles: NewsArticle[];
  currentLang: LanguageType;
  activeRegion: RegionType;
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (article: NewsArticle) => void;
  savedArticleIds: string[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  currentLang,
  activeRegion,
  onSelectArticle,
  onToggleBookmark,
  savedArticleIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [editorialOnlyMode, setEditorialOnlyMode] = useState<boolean>(false);

  const categories = [
    "Semua",
    "Pemerintahan",
    "Bisnis & UMKM",
    "Lalu Lintas",
    "Pariwisata & Budaya",
    "Pendidikan & Kesehatan",
    "Olahraga",
  ];

  // Filter articles by region, category, search text, and editorial mode
  const filteredArticles = articles.filter((article) => {
    const matchRegion = activeRegion === "Semua" || article.region === activeRegion;
    const matchCategory = selectedCategory === "Semua" || article.category === selectedCategory;
    const matchEditorial = !editorialOnlyMode || article.sourceType === "redaksi" || article.isEditorialOnly;
    const matchSearch = searchFilter === "" || 
      article.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
      article.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchRegion && matchCategory && matchEditorial && matchSearch;
  });

  // Specifically select editorial choices for Berita Utama (Lead Story)
  // Priority: 1. Editorial choice & source == 'redaksi', 2. First editorial article, 3. First filtered article
  const leadArticle = 
    filteredArticles.find(a => (a.sourceType === "redaksi" || a.isEditorialOnly) && a.isEditorialChoice) ||
    filteredArticles.find(a => a.sourceType === "redaksi" || a.isEditorialOnly) ||
    filteredArticles[0] || 
    articles[0];

  // Side articles & remaining articles exclude the chosen leadArticle
  const otherFilteredArticles = filteredArticles.filter(a => a.id !== leadArticle?.id);
  const sideArticles = otherFilteredArticles.slice(0, 3);
  const regularArticles = otherFilteredArticles.slice(3);

  const trendingTags = [
    "#MRTPhase3Tangerang",
    "#FestivalCisadane2026",
    "#InvestasiBSD",
    "#TangselSmartCity",
    "#KeretaBandaraRailink",
    "#KulinerPasarLama",
    "#UMKMGoGlobal",
  ];

  return (
    <section className="space-y-6">
      {/* Bento Trending Hashtag Ribbon & Editorial Filter Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar flex-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full shrink-0 border border-blue-100">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentLang === "id" ? "Tren Tangerang:" : "Trending Topics:"}</span>
          </div>
          {trendingTags.map((tag) => (
            <span
              key={tag}
              onClick={() => setSearchFilter(tag.replace("#", ""))}
              className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-medium hover:border-blue-400 hover:text-blue-600 cursor-pointer transition-colors shrink-0 shadow-2xs"
            >
              {tag}
            </span>
          ))}
          {searchFilter && (
            <button
              onClick={() => setSearchFilter("")}
              className="text-[11px] font-bold text-red-600 hover:underline shrink-0 px-2"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Quick Toggle: Khusus Liputan Redaksi */}
        <button
          onClick={() => setEditorialOnlyMode(!editorialOnlyMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            editorialOnlyMode
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
          }`}
          title="Filter khusus artikel yang diproduksi oleh Tim Redaksi Portal Tangerang Raya"
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${editorialOnlyMode ? "text-amber-400" : "text-slate-500"}`} />
          <span>{currentLang === "id" ? "Khusus Liputan Redaksi" : "Editorial Exclusives"}</span>
          {editorialOnlyMode && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          )}
        </button>
      </div>

      {/* Main Bento Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead Story Bento Box (8 columns) - PRIORITAS REDAKSI */}
        {leadArticle && (
          <div 
            onClick={() => onSelectArticle(leadArticle)}
            className="lg:col-span-8 group cursor-pointer relative rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-slate-900 border border-slate-200 flex flex-col justify-end min-h-[400px] sm:min-h-[480px]"
          >
            <img
              src={leadArticle.imageUrl}
              alt={leadArticle.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

            {/* Top Badges: Editorial Verification & Category */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
              {/* Verified Editorial Badge */}
              {(leadArticle.sourceType === "redaksi" || leadArticle.isEditorialOnly) && (
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg tracking-wider shadow-sm border border-amber-300/30">
                  <ShieldCheck className="w-3 h-3 text-white" />
                  <span>PRODUK JURNALISTIK REDAKSI</span>
                </div>
              )}

              {leadArticle.isUrgent && (
                <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider shadow-sm">
                  URGENT
                </span>
              )}

              <span className="bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                {leadArticle.category}
              </span>

              {leadArticle.editorialDesk && (
                <span className="hidden sm:inline-block bg-slate-800/80 backdrop-blur-xs text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-700">
                  {leadArticle.editorialDesk}
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(leadArticle);
                }}
                className={`p-2.5 rounded-full backdrop-blur-xs transition-colors ${
                  savedArticleIds.includes(leadArticle.id)
                    ? "bg-amber-500 text-white"
                    : "bg-black/40 text-white hover:bg-black/60"
                }`}
                title="Simpan Berita"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Content Overlay */}
            <div className="relative p-6 sm:p-8 space-y-3 z-10 text-white">
              <div className="flex items-center gap-2">
                <p className="text-amber-400 font-bold text-xs tracking-wider uppercase flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  BERITA UTAMA PILIHAN REDAKSI • {leadArticle.region}
                </p>
              </div>

              <h1 className="text-xl sm:text-3xl font-black leading-tight group-hover:text-blue-200 transition-colors">
                {currentLang === "id" ? leadArticle.title : (leadArticle.titleEn || leadArticle.title)}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-3xl">
                {currentLang === "id" ? leadArticle.summary : (leadArticle.summaryEn || leadArticle.summary)}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={leadArticle.author.avatar} 
                      alt={leadArticle.author.name}
                      className="w-5 h-5 rounded-full object-cover border border-amber-400/50"
                    />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-white">{leadArticle.author.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" title="Jurnalis Redaksi Terverifikasi" />
                    </div>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 text-[11px]">{leadArticle.author.role}</span>
                  <span className="text-slate-500">•</span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {leadArticle.publishedAt}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{leadArticle.views.toLocaleString()} dibaca</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Side Highlights Bento Box (4 columns) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{currentLang === "id" ? "Sorotan Terpopuler" : "Top Highlights"}</span>
            </h2>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-100">
              Redaksi Update
            </span>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-between">
            {sideArticles.map((article, idx) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all flex gap-3.5 items-start"
              >
                <span className="text-xl font-black text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 w-6">
                  0{idx + 2}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase">
                    <span>{article.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{article.region}</span>
                    {article.sourceType === "redaksi" && (
                      <span className="ml-auto text-[9px] bg-slate-200 text-slate-700 font-semibold px-1.5 py-0.2 rounded">
                        Redaksi
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
                    {currentLang === "id" ? article.title : (article.titleEn || article.title)}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                    <span>{article.author.name}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Bento Ribbon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={currentLang === "id" ? "Cari berita / penulis..." : "Search news / author..."}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Bento Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(regularArticles.length > 0 ? regularArticles : otherFilteredArticles).map((article) => {
          const isSaved = savedArticleIds.includes(article.id);
          const isRedaksi = article.sourceType === "redaksi" || article.isEditorialOnly;
          return (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                  {article.category}
                </span>

                {isRedaksi && (
                  <span className="absolute top-3 right-12 px-2 py-0.5 text-[9px] font-bold rounded-md bg-amber-500 text-white shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Redaksi
                  </span>
                )}

                <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-bold text-white bg-blue-600/90 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <MapPin className="w-3 h-3" />
                  {article.region}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(article);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
                    isSaved
                      ? "bg-amber-500 text-white"
                      : "bg-black/50 text-white hover:bg-black/70"
                  }`}
                  title="Simpan"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {article.editorialDesk && (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {article.editorialDesk}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {currentLang === "id" ? article.title : (article.titleEn || article.title)}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {currentLang === "id" ? article.summary : (article.summaryEn || article.summary)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                      {article.author.name}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} mnt baca
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

