import React, { useState } from "react";
import { 
  Sparkles, 
  Tag, 
  Handshake, 
  Copy, 
  Check, 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  Send, 
  X,
  CheckCircle,
  Phone
} from "lucide-react";
import { ExclusiveOffer, LanguageType } from "../types";

interface OffersSectionProps {
  offers: ExclusiveOffer[];
  currentLang: LanguageType;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  offers,
  currentLang,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    tier: "Strategic Partner",
    message: "",
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/partner/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setTicketId(data.ticketId || `PTR-${Date.now().toString().slice(-5)}`);
      setInquirySubmitted(true);
    } catch (err) {
      setTicketId(`PTR-${Date.now().toString().slice(-5)}`);
      setInquirySubmitted(true);
    }
  };

  return (
    <section className="space-y-6">
      {/* Bento Strategic Partnership Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-teal-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === "id" ? "Peluang Bisnis & Kolaborasi" : "Strategic B2B & Business Partnership"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Penawaran Eksklusif & Kerjasama Mitra Strategis
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
            Dapatkan keuntungan eksklusif bagi mitra bisnis lokal, perhotelan, pengembang properti, dan penyedia jasa. Jangkau jutaan audiens pembaca Portal Tangerang Raya.
          </p>
        </div>

        <button
          onClick={() => {
            setInquirySubmitted(false);
            setPartnerModalOpen(true);
          }}
          className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md hover:bg-teal-50 transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <Handshake className="w-4 h-4 text-teal-700" />
          <span>{currentLang === "id" ? "Ajukan Kerjasama Mitra" : "Join Strategic Partnership"}</span>
        </button>
      </div>

      {/* Offers Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md bg-teal-600 text-white shadow-xs">
                  {offer.tier}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-900/90 text-white backdrop-blur-xs">
                  {offer.discountText}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-teal-700 block">
                    {offer.partnerName}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                    {offer.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {offer.description}
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Kode Voucher:</span>
                    <span className="font-mono font-bold text-slate-900 text-xs tracking-wider">{offer.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="p-1.5 px-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors text-xs flex items-center gap-1"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] font-bold text-emerald-600">Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 mt-2">
              <span>Berlaku s/d {offer.validUntil}</span>
              <span className="font-semibold text-teal-700">Mitra Resmi PTR</span>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 border border-slate-200">
            <button
              onClick={() => setPartnerModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Permohonan Kemitraan Terkirim!</h3>
                <p className="text-xs text-slate-600">
                  Nomor Tiket: <strong className="font-mono text-slate-900">{ticketId}</strong>. Tim Business Development Portal Tangerang Raya akan segera menghubungi <strong>{formData.email}</strong> dalam 1x24 jam kerja.
                </p>
                <button
                  onClick={() => setPartnerModalOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Handshake className="w-5 h-5 text-teal-600" />
                    <span>Formulir Kerjasama Strategis</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bermitra bersama Portal Tangerang Raya untuk periklanan, sponsorship event, dan promosi bisnis B2B/B2C.
                  </p>
                </div>

                {/* Direct WhatsApp Quick Connect */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block">Butuh Respon Cepat Iklan?</span>
                    <span className="text-[11px] text-emerald-700">Hubungi Hotline Bisnis via WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/6281324412025?text=Halo%20Admin%20Iklan%20Portal%20Tangerang%20Raya,%20saya%20tertarik%20kerjasama"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WA 1</span>
                    </a>
                    <a
                      href="https://wa.me/6281585761090?text=Halo%20Admin%20Iklan%20Portal%20Tangerang%20Raya,%20saya%20tertarik%20kerjasama"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>WA 2</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan / Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: PT Kreasi Nusantara Serpong"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nama Kontak Person *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Lengkap"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Pilihan Paket Kemitraan</label>
                      <select
                        value={formData.tier}
                        onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                      >
                        <option value="Gold Partner">Gold Partner (VIP Media & Event)</option>
                        <option value="Strategic Partner">Strategic Partner (B2B Directory)</option>
                        <option value="UMKM Partner">UMKM Booster</option>
                        <option value="Event Sponsor">Sponsor Event Komunitas</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Email Bisnis *</label>
                      <input
                        type="email"
                        required
                        placeholder="partner@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nomor Telepon / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0812xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Deskripsi Rencana Kerjasama</label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan kebutuhan publikasi, promosi voucher diskon, atau event sponsorship..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl text-xs shadow-md transition-colors"
                >
                  Kirim Pengajuan Kemitraan
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
