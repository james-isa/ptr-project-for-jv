import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { BreakingNewsTicker } from "./components/BreakingNewsTicker";
import { NewsSection } from "./components/NewsSection";
import { PublicServicesSection } from "./components/PublicServicesSection";
import { EventsSection } from "./components/EventsSection";
import { UmkmSection } from "./components/UmkmSection";
import { TourismSection } from "./components/TourismSection";
import { PropertySection } from "./components/PropertySection";
import { OffersSection } from "./components/OffersSection";
import { ArticleModal } from "./components/ArticleModal";
import { BookmarksDrawer } from "./components/BookmarksDrawer";
import { PushNotificationModal } from "./components/PushNotificationModal";
import { AiNavigatorModal } from "./components/AiNavigatorModal";
import { EditorialInfoModal } from "./components/EditorialInfoModal";
import { Footer } from "./components/Footer";

import { 
  newsArticles as fallbackNewsArticles, 
  publicServices, 
  communityEvents, 
  umkmBusinesses, 
  tourismSpots, 
  propertyListings, 
  exclusiveOffers 
} from "./data/mockData";
import { fetchArticlesFromGoogleSheet } from "./services/googleSheetService";

import { TabType, RegionType, LanguageType, NewsArticle } from "./types";
import { Sparkles } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("berita");
  const [activeRegion, setActiveRegion] = useState<RegionType>("Semua");
  const [currentLang, setCurrentLang] = useState<LanguageType>("id");

  // Dynamic Google Sheets State
  const [articles, setArticles] = useState<NewsArticle[]>(fallbackNewsArticles);

  // Modals & Drawers
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState<boolean>(false);
  const [pushModalOpen, setPushModalOpen] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [editorialModalOpen, setEditorialModalOpen] = useState<boolean>(false);

  // Saved bookmark IDs persisted in localStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("ptr_saved_articles");
      return saved ? JSON.parse(saved) : ["news-1", "news-3"];
    } catch {
      return ["news-1", "news-3"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ptr_saved_articles", JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedArticleIds]);

  // Load Google Sheet Articles on Mount in Background
  useEffect(() => {
    async function loadSheetArticles() {
      try {
        const result = await fetchArticlesFromGoogleSheet("1n5kNGPAfAu8ov0gINi2fCPL79s3MANe-AAMIlRWvLsM", "Berita");
        if (result.articles && result.articles.length > 0) {
          setArticles(result.articles);
        }
      } catch (err) {
        console.warn("Sheet sync error:", err);
      }
    }
    loadSheetArticles();
  }, []);

  const handleToggleBookmark = (article: NewsArticle) => {
    setSavedArticleIds((prev) =>
      prev.includes(article.id)
        ? prev.filter((id) => id !== article.id)
        : [...prev, article.id]
    );
  };

  const handleRemoveBookmark = (articleId: string) => {
    setSavedArticleIds((prev) => prev.filter((id) => id !== articleId));
  };

  const savedArticlesList = articles.filter((art) => savedArticleIds.includes(art.id));

  // Quick Switch Tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case "berita":
        return (
          <NewsSection
            articles={articles}
            currentLang={currentLang}
            activeRegion={activeRegion}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onToggleBookmark={handleToggleBookmark}
            savedArticleIds={savedArticleIds}
          />
        );
      case "layanan":
        return (
          <PublicServicesSection
            services={publicServices}
            currentLang={currentLang}
            activeRegion={activeRegion}
          />
        );
      case "agenda":
        return (
          <EventsSection
            events={communityEvents}
            currentLang={currentLang}
            activeRegion={activeRegion}
          />
        );
      case "umkm":
        return (
          <UmkmSection
            umkmItems={umkmBusinesses}
            currentLang={currentLang}
            activeRegion={activeRegion}
            onToggleBookmark={handleToggleBookmark}
            savedIds={savedArticleIds}
          />
        );
      case "pariwisata":
        return (
          <TourismSection
            spots={tourismSpots}
            currentLang={currentLang}
            activeRegion={activeRegion}
          />
        );
      case "properti":
        return (
          <PropertySection
            properties={propertyListings}
            currentLang={currentLang}
            activeRegion={activeRegion}
          />
        );
      case "penawaran":
        return (
          <OffersSection
            offers={exclusiveOffers}
            currentLang={currentLang}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Real-Time Urgent Breaking News Ticker */}
      <BreakingNewsTicker
        articles={articles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        currentLang={currentLang}
        onOpenPushModal={() => setPushModalOpen(true)}
      />

      {/* 2. Main Portal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        savedCount={savedArticleIds.length}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        onOpenPushModal={() => setPushModalOpen(true)}
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenPublisherInfo={() => setEditorialModalOpen(true)}
      />

      {/* 3. Main Content Bento Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderTabContent()}
      </main>

      {/* 4. Footer with Google Publisher & Dewan Pers info */}
      <Footer
        currentLang={currentLang}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenPushModal={() => setPushModalOpen(true)}
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenEditorialModal={() => setEditorialModalOpen(true)}
      />

      {/* 5. Floating AI Navigator Button */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl hover:shadow-blue-500/30 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all group border-2 border-white/20"
        title="Buka AI Navigator Asisten Tangerang"
      >
        <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-black text-xs tracking-wide">
          Tanya AI Navigator
        </span>
      </button>

      {/* 6. Modals & Drawers */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        currentLang={currentLang}
        isBookmarked={selectedArticle ? savedArticleIds.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSelectRelated={(art) => setSelectedArticle(art)}
        allArticles={articles}
      />

      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={handleRemoveBookmark}
        currentLang={currentLang}
      />

      <PushNotificationModal
        isOpen={pushModalOpen}
        onClose={() => setPushModalOpen(false)}
        currentLang={currentLang}
      />

      <AiNavigatorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        currentLang={currentLang}
      />

      <EditorialInfoModal
        isOpen={editorialModalOpen}
        onClose={() => setEditorialModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
