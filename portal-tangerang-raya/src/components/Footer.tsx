import React from "react";
import { 
  ShieldCheck, 
  Rss, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Heart,
  ChevronRight,
  Flame,
  Award
} from "lucide-react";
import { LanguageType, TabType } from "../types";
import { AppLogo } from "./AppLogo";

interface FooterProps {
  currentLang: LanguageType;
  onNavigateTab: (tab: TabType) => void;
  onOpenPushModal: () => void;
  onOpenAiModal: () => void;
  onOpenEditorialModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigateTab,
  onOpenPushModal,
  onOpenAiModal,
  onOpenEditorialModal,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-16">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 text-red-400 flex items-center justify-center shrink-0 border border-red-800/60">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-sm">Terdaftar Google Publisher Center</h4>
                <p className="text-slate-400">
                  Media siber resmi terverifikasi dengan standar integritas jurnalistik & agregasi berita Google News.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 text-amber-400 flex items-center justify-center shrink-0 border border-amber-800/60">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-sm">Pusat Informasi & UMKM Terintegrasi</h4>
                <p className="text-slate-400">
                  Menghubungkan Kota Tangerang, Tangerang Selatan, dan Kabupaten Tangerang dalam satu ekosistem digital.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
                <Globe className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-white text-sm">Gerbang Wisatawan Domestik & Mancanegara</h4>
                <p className="text-slate-400">
                  Akses langsung dari Bandara Soekarno-Hatta (CGK) dengan panduan multi-bahasa dan peta transit real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <AppLogo 
                size="md" 
                tagline="portaltangerangraya.com • Koto Digital Ecosystem" 
              />
            </div>

            <p className="text-slate-400 leading-relaxed pr-4">
              Portal informasi digital independen dan kredibel yang menyajikan berita terkini, siaga layanan publik 24 jam, direktori UMKM unggulan, kalender agenda komunitas, panduan pariwisata terpadu, dan listing properti terlengkap di Tangerang Raya.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/api/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors font-bold"
              >
                <Rss className="w-3.5 h-3.5" />
                <span>RSS Publisher Feed</span>
              </a>

              <button
                onClick={onOpenPushModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors font-bold"
              >
                <span>Push Alert Real-Time</span>
              </button>

              <button
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors font-bold"
              >
                <span>AI Navigator</span>
              </button>
            </div>
          </div>

          {/* Col 3: Navigasi Kanal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Kanal Utama
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigateTab("berita")} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Berita Terkini
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("layanan")} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Siaga Layanan Publik
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("agenda")} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Agenda Komunitas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("umkm")} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Direktori UMKM Lokal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("pariwisata")} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Pariwisata & Bandara
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("properti")} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Listing Properti & KPR
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Cakupan Wilayah */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Cakupan Wilayah
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Kota Tangerang (Benteng, Pasar Lama, Cipondoh, Karawaci)</li>
              <li>Tangerang Selatan (BSD City, Bintaro Jaya, Serpong, Pamulang)</li>
              <li>Kabupaten Tangerang (Cikupa, Tigaraksa, Mauk, Teluknaga)</li>
              <li>Gerbang Soekarno-Hatta (CGK International Airport)</li>
            </ul>
          </div>

          {/* Col 5: Redaksi & Iklan */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Kontak Redaksi & Iklan
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">Digital Newsroom & Korespondensi Tangerang Raya, Banten</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href="mailto:redaksi@portaltangerangraya.com" className="hover:text-blue-400 font-mono text-[11px]">
                  redaksi@portaltangerangraya.com
                </a>
              </div>

              {/* WhatsApp Hotlines */}
              <div className="space-y-1.5 pt-1">
                <a 
                  href="https://wa.me/6281324412025?text=Halo%20Redaksi%20Portal%20Tangerang%20Raya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-[11px] bg-emerald-950/40 border border-emerald-800/50 p-1.5 rounded-lg transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>WA Hotline 1: 0813-2441-2025</span>
                </a>

                <a 
                  href="https://wa.me/6281585761090?text=Halo%20Iklan%20Portal%20Tangerang%20Raya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-[11px] bg-emerald-950/40 border border-emerald-800/50 p-1.5 rounded-lg transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>WA Hotline 2: 0815-8576-1090</span>
                </a>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenEditorialModal}
                  className="text-[11px] text-blue-400 hover:underline font-bold block"
                >
                  Lihat Info Redaksi & Dewan Pers →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            @2026 <strong>Portal Tangerang Raya (portaltangerangraya.com)</strong>. Diterbitkan oleh Koto Digital Ecosystem.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenEditorialModal} className="hover:underline hover:text-slate-300">
              Pedoman Pemberitaan Media Siber
            </button>
            <span>•</span>
            <button onClick={onOpenEditorialModal} className="hover:underline hover:text-slate-300">
              Hak Jawab & Koreksi
            </button>
            <span>•</span>
            <button onClick={onOpenEditorialModal} className="hover:underline hover:text-slate-300">
              Struktur Redaksi & Kontak
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
