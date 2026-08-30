import React, { useState } from "react";
import { 
  X, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Clock, 
  Eye, 
  Check, 
  MapPin, 
  ShieldCheck, 
  Type, 
  ArrowUpRight,
  Printer
} from "lucide-react";
import { NewsArticle, LanguageType } from "../types";

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  currentLang: LanguageType;
  isBookmarked: boolean;
  onToggleBookmark: (article: NewsArticle) => void;
  onSelectRelated: (article: NewsArticle) => void;
  allArticles: NewsArticle[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  currentLang,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated,
  allArticles,
}) => {
  if (!article) return null;

  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [copied, setCopied] = useState(false);
  const [articleLang, setArticleLang] = useState<LanguageType>(currentLang);

  const title = articleLang === "id" ? article.title : (article.titleEn || article.title);
  const summary = articleLang === "id" ? article.summary : (article.summaryEn || article.summary);
  const content = articleLang === "id" ? article.content : (article.contentEn || article.content);

  // Text to speech simulation with Web Speech API
  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Fitur Text-to-Speech tidak didukung di browser ini.");
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${title}. ${summary}. ${content}`);
      utterance.lang = articleLang === "id" ? "id-ID" : "en-US";
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingSpeech(false);
      utterance.onerror = () => setIsPlayingSpeech(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingSpeech(true);
    }
  };

  const handleShare = (platform: "wa" | "twitter" | "copy") => {
    const url = `https://portaltangerangraya.com/#${article.slug}`;
    const text = `${title} - Portal Tangerang Raya`;

    if (platform === "wa") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const related = allArticles.filter((a) => a.id !== article.id && (a.category === article.category || a.region === article.region)).slice(0, 3);

  const fontSizeClass = {
    normal: "text-base sm:text-lg leading-relaxed",
    large: "text-lg sm:text-xl leading-relaxed font-normal",
    xlarge: "text-xl sm:text-2xl leading-loose font-normal",
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Top Controls - Clean, Bright, High Contrast */}
        <div className="p-4 bg-slate-50 text-slate-900 flex items-center justify-between gap-3 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] font-black uppercase rounded-md bg-red-600 text-white tracking-wider shadow-2xs">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              {article.region}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle for article */}
            <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-200 text-xs shadow-2xs">
              <button
                onClick={() => setArticleLang("id")}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${articleLang === "id" ? "bg-red-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                ID
              </button>
              <button
                onClick={() => setArticleLang("en")}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${articleLang === "en" ? "bg-red-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                EN
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 text-xs shadow-2xs">
              <Type className="w-3.5 h-3.5 text-slate-500" />
              <button
                onClick={() => setFontSize("normal")}
                className={`px-1.5 rounded-md font-bold ${fontSize === "normal" ? "text-red-600 bg-red-50" : "text-slate-600 hover:text-slate-900"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-1.5 rounded-md font-bold text-sm ${fontSize === "large" ? "text-red-600 bg-red-50" : "text-slate-600 hover:text-slate-900"}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize("xlarge")}
                className={`px-1.5 rounded-md font-bold text-base ${fontSize === "xlarge" ? "text-red-600 bg-red-50" : "text-slate-600 hover:text-slate-900"}`}
              >
                A++
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 flex-1">
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>

            {/* Metadata Byline */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{article.author.name}</span>
                    {article.sourceType === "redaksi" || article.isEditorialOnly ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm">
                        <ShieldCheck className="w-3 h-3 text-amber-600" />
                        Redaksi
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-slate-500 text-[10px] font-medium bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        Kontributor
                      </span>
                    )}
                  </div>
                  <div className="text-slate-500 flex items-center gap-2">
                    <span>{article.author.role}</span>
                    {article.editorialDesk && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 font-semibold">{article.editorialDesk}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {article.views.toLocaleString()} pembaca
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={article.imageUrl}
              alt={title}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="p-2.5 bg-slate-900/90 text-white text-xs flex items-center justify-between">
              <span>Foto: Dokumentasi Humas Portal Tangerang Raya</span>
              <span className="text-[10px] text-slate-300">ID: {article.id} • Hak Cipta Dilindungi</span>
            </div>
          </div>

          {/* Audio Reader & Quick Tools Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            {/* Audio Reader */}
            <button
              onClick={handleToggleSpeech}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isPlayingSpeech
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-100"
              }`}
            >
              {isPlayingSpeech ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-600" />}
              <span>{isPlayingSpeech ? "Hentikan Narasi Suara" : "Dengarkan Artikel (Audio Reader)"}</span>
            </button>

            {/* Bookmark & Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(article)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  isBookmarked
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isBookmarked ? "Tersimpan" : "Simpan"}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleShare("wa")}
                  className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  title="Bagikan ke WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-100 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                  <span>{copied ? "Tersalin!" : "Salin Link"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lead Summary */}
          <div className="p-4 rounded-xl bg-amber-50/70 border-l-4 border-amber-500 text-slate-800 text-base font-semibold leading-relaxed">
            {summary}
          </div>

          {/* Article Text Content */}
          <div className={`text-slate-800 space-y-4 whitespace-pre-line font-sans ${fontSizeClass}`}>
            {content}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Topik Terkait:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Google Publisher Center & Editorial Policy Box */}
          <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Standar Redaksi & Kredibilitas Jurnalisme</span>
            </div>
            <p>
              Berita ini diproduksi sesuai Pedoman Pemberitaan Media Siber Dewan Pers RI dan telah melalui proses verifikasi fakta. Artikel terdaftar pada Google Publisher Center ID: <strong className="text-slate-900">GPC-TANGERANG-RAYA-2026</strong>.
            </p>
            <div className="flex items-center gap-4 text-red-600 font-semibold pt-1">
              <button onClick={() => window.print()} className="hover:underline flex items-center gap-1">
                <Printer className="w-3.5 h-3.5" /> Cetak Artikel
              </button>
              <span>•</span>
              <a href="mailto:redaksi@portaltangerangraya.com" className="hover:underline">
                Koreksi / Hak Jawab Redaksi
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Berita Tangerang Terkait Lainnya
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {related.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="group cursor-pointer rounded-xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-2.5 flex flex-col flex-1 justify-between">
                      <span className="text-[10px] font-bold text-red-600 uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 mt-2 block">
                        {item.publishedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
