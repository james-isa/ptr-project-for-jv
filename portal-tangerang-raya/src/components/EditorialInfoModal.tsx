import React from "react";
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MessageSquare, 
  Building2, 
  Globe, 
  FileText, 
  CheckCircle,
  ExternalLink,
  Users,
  Send
} from "lucide-react";
import { LanguageType } from "../types";

interface EditorialInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageType;
}

export const EditorialInfoModal: React.FC<EditorialInfoModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const handleOpenWA = (number: string, context: string) => {
    const text = encodeURIComponent(
      `Halo Redaksi & Iklan Portal Tangerang Raya (portaltangerangraya.com),\nSaya ingin menghubungi terkait: ${context}`
    );
    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/30">
              PTR
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                Kontak Redaksi, Iklan & Informasi Media
              </h3>
              <p className="text-xs text-blue-200">
                Portal Tangerang Raya • Koto Digital Ecosystem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Quick WhatsApp Action Bento Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Hotline WhatsApp Resmi (Redaksi, Liputan & Iklan)</span>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                RESPON CEPAT
              </span>
            </div>
            <p className="text-xs text-emerald-800">
              Layanan komunikasi langsung untuk rilis berita, undangan peliputan, konfirmasi hak jawab, pasang iklan/banner, dan kerjasama kemitraan UMKM.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => handleOpenWA("6281324412025", "Hotline Redaksi 1 / Kerjasama Media")}
                className="p-3 bg-white hover:bg-emerald-600 hover:text-white rounded-xl border border-emerald-300 text-slate-800 font-bold text-xs flex items-center justify-between gap-2 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2 text-left">
                  <Phone className="w-4 h-4 text-emerald-600 group-hover:text-white shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 group-hover:text-emerald-100 uppercase">Hotline 1 (Redaksi / Iklan)</span>
                    <span className="font-mono text-sm">+62 813-2441-2025</span>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </button>

              <button
                onClick={() => handleOpenWA("6281585761090", "Hotline Redaksi 2 / Iklan & Bisnis")}
                className="p-3 bg-white hover:bg-emerald-600 hover:text-white rounded-xl border border-emerald-300 text-slate-800 font-bold text-xs flex items-center justify-between gap-2 transition-all shadow-xs group"
              >
                <div className="flex items-center gap-2 text-left">
                  <Phone className="w-4 h-4 text-emerald-600 group-hover:text-white shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 group-hover:text-emerald-100 uppercase">Hotline 2 (Bisnis / Kemitraan)</span>
                    <span className="font-mono text-sm">+62 815-8576-1090</span>
                  </div>
                </div>
                <Send className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </button>
            </div>
          </div>

          {/* Email & Forwarding Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Redaksi & Surat Menyurat</span>
              </div>
              <p className="text-xs text-slate-600">
                Kirim press release, artikel opini publik, dan surat klarifikasi resmi ke:
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-slate-300 flex items-center justify-between">
                <a 
                  href="mailto:redaksi@portaltangerangraya.com" 
                  className="font-mono font-bold text-blue-700 hover:underline text-xs truncate"
                >
                  redaksi@portaltangerangraya.com
                </a>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-md">
                  Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Terhubung otomatis ke sistem sentral komunikasi tim redaksi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Format Operasional Redaksi</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong>Sistem Digital Newsroom & Redaksi Terdistribusi</strong>
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Liputan jurnalisme mobile dan koordinasi digital di wilayah Kota Tangerang, Tangerang Selatan, dan Kabupaten Tangerang.
              </p>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                <strong>Korespondensi:</strong> Tangerang Raya, Banten - Indonesia
              </div>
            </div>
          </div>

          {/* Legal Compliance & Dewan Pers Box */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Kepatuhan Pedoman Pemberitaan Media Siber</span>
            </div>
            <p className="text-slate-600">
              Portal Tangerang Raya tunduk pada Undang-Undang No. 40 Tahun 1999 tentang Pers serta Pedoman Pemberitaan Media Siber (Surat Keputusan Dewan Pers No. 03/SK-DP/III/2006). Kami melayani <strong>Hak Jawab</strong> dan <strong>Hak Koreksi</strong> secara proporsional dan profesional melalui kontak redaksi di atas.
            </p>
          </div>

          {/* Editorial Structure */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Susunan Redaksi & Manajemen</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Penerbit:</span>
                <strong className="text-slate-800">Koto Digital Ecosystem</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Pemimpin Redaksi:</span>
                <strong className="text-slate-800">Tim Redaksi Tangerang Raya</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Kemitraan & Iklan:</span>
                <strong className="text-slate-800">Divisi Bisnis & Komersial</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Domain Resmi: <strong>portaltangerangraya.com</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
