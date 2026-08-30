import React, { useState } from "react";
import { 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Plus, 
  Search, 
  Store, 
  Tag, 
  X,
  ExternalLink,
  Sparkles,
  Filter
} from "lucide-react";
import { UmkmBusiness, LanguageType, RegionType } from "../types";

interface UmkmSectionProps {
  umkmItems: UmkmBusiness[];
  currentLang: LanguageType;
  activeRegion: RegionType;
  onToggleBookmark: (item: any) => void;
  savedIds: string[];
}

export const UmkmSection: React.FC<UmkmSectionProps> = ({
  umkmItems,
  currentLang,
  activeRegion,
  onToggleBookmark,
  savedIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "Kuliner Khas",
    ownerName: "",
    phone: "",
    district: "",
    region: "Kota Tangerang",
    description: "",
  });

  const categories = ["Semua", "Kuliner Khas", "Fashion & Batik", "Kopi & Kafe", "Kriya & Kerajinan", "Jasa Kreatif"];

  const filteredUmkm = umkmItems.filter((item) => {
    const matchRegion = activeRegion === "Semua" || item.region === activeRegion;
    const matchCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    const matchSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.specialtyProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/umkm/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setRegistrationSubmitted(true);
    } catch (err) {
      setRegistrationSubmitted(true);
    }
  };

  const handleWhatsAppOrder = (item: UmkmBusiness) => {
    const message = `Halo ${item.name}, saya melihat profil usaha Anda di Portal Tangerang Raya (portaltangerangraya.com). Saya tertarik untuk memesan produk unggulan: ${item.specialtyProduct}. Mohon info ketersediaan dan daftar harganya. Terima kasih!`;
    const url = `https://wa.me/${item.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="space-y-6">
      {/* Bento Hero Banner UMKM */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-xs">
            <Store className="w-3.5 h-3.5" />
            <span>{currentLang === "id" ? "Directory UMKM Lokal" : "Local MSME Hub"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Sentra UMKM & Kuliner Legendaris Tangerang Raya
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 max-w-2xl leading-relaxed">
            Dukung produk lokal terkurasi dari pengrajin batik benteng, kecap warisan, kuliner laksa, hingga kedai kopi artisan se-Tangerang Raya.
          </p>
        </div>

        <button
          onClick={() => {
            setRegistrationSubmitted(false);
            setRegisterModalOpen(true);
          }}
          className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md hover:bg-orange-50 transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4 text-orange-600" />
          <span>{currentLang === "id" ? "Daftarkan UMKM Gratis" : "List Your MSME Free"}</span>
        </button>
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
                  ? "bg-orange-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={currentLang === "id" ? "Cari toko, produk laksa, batik..." : "Search MSME products..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:border-orange-600 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Bento Grid of UMKM Businesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUmkm.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.category}
                </span>

                {item.promo && (
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-extrabold text-amber-950 bg-amber-300 px-2 py-0.5 rounded-md shadow-xs">
                    <Tag className="w-3 h-3" />
                    {item.promo}
                  </span>
                )}

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full text-xs font-black text-slate-800 backdrop-blur-xs shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{item.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({item.reviewsCount})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>{item.district}, {item.region}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="UMKM Terverifikasi Resmi" />
                    )}
                  </h3>
                </div>

                {/* Specialty Box */}
                <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200/60 text-xs">
                  <span className="font-bold text-orange-950 block">Produk Unggulan:</span>
                  <span className="text-orange-900 font-medium">{item.specialtyProduct}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {currentLang === "id" ? item.description : (item.descriptionEn || item.description)}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 pt-1">
                  {item.halalCertified && (
                    <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                      ✓ Halal Certified
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-full">
                    {item.priceRange}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleWhatsAppOrder(item)}
                className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{currentLang === "id" ? "Pesan via WhatsApp Langsung" : "Direct WhatsApp Inquiry"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 border border-slate-200">
            <button
              onClick={() => setRegisterModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {registrationSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Pendaftaran Berhasil Terkirim!</h3>
                <p className="text-xs text-slate-600">
                  Data usaha <strong>{formData.businessName}</strong> telah kami terima. Profil usaha Anda akan ditinjau dan ditampilkan dalam 1x24 jam kerja.
                </p>
                <button
                  onClick={() => setRegisterModalOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Store className="w-5 h-5 text-orange-600" />
                    <span>Daftarkan Usaha UMKM Anda</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gratis promosi di Portal Tangerang Raya untuk memperluas jangkauan pasar lokal & wisatawan.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Usaha / Merk Dagang *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Laksa Benteng Spesial Ny. Linda"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Kategori Produk</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-600"
                      >
                        <option value="Kuliner Khas">Kuliner Khas</option>
                        <option value="Fashion & Batik">Fashion & Batik</option>
                        <option value="Kopi & Kafe">Kopi & Kafe</option>
                        <option value="Kriya & Kerajinan">Kriya & Kerajinan</option>
                        <option value="Jasa Kreatif">Jasa Kreatif</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Wilayah</label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-600"
                      >
                        <option value="Kota Tangerang">Kota Tangerang</option>
                        <option value="Tangerang Selatan">Tangerang Selatan</option>
                        <option value="Kabupaten Tangerang">Kabupaten Tangerang</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nama Pemilik *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama lengkap"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-600"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nomor WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0812xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Deskripsi & Keunggulan Produk</label>
                    <textarea
                      rows={3}
                      placeholder="Ceritakan keistimewaan produk, bahan alami, atau sertifikasi halal yang dimiliki..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl text-xs shadow-md transition-colors"
                >
                  Kirim Pendaftaran UMKM
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
