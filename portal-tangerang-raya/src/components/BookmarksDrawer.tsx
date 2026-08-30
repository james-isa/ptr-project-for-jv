import React from "react";
import { Bookmark, X, Trash2, ArrowRight, Eye, Clock } from "lucide-react";
import { NewsArticle, LanguageType } from "../types";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
  currentLang: LanguageType;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  currentLang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base">
              {currentLang === "id" ? "Konten Tersimpan & Favorit" : "Saved Articles & Bookmarks"}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
              {savedArticles.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-slate-50">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">Belum Ada Konten Tersimpan</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Klik ikon bookmark pada artikel berita, destinasi wisata, atau listing properti untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="group bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:border-red-300 transition-all flex gap-3 items-center justify-between"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />

                <div 
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer space-y-1"
                >
                  <span className="text-[10px] font-bold text-red-600 uppercase">
                    {art.category} • {art.region}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {currentLang === "id" ? art.title : (art.titleEn || art.title)}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">{art.publishedAt}</span>
                </div>

                <button
                  onClick={() => onRemoveBookmark(art.id)}
                  className="p-2 text-slate-300 hover:text-red-600 transition-colors shrink-0"
                  title="Hapus dari tersimpan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <p className="text-[11px] text-slate-400 text-center">
              Data tersimpan di perangkat lokal Anda secara offline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
