import React, { useState, useMemo } from "react";
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calculator, 
  MessageCircle, 
  Search, 
  SlidersHorizontal, 
  X, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Filter
} from "lucide-react";
import { PropertyListing, LanguageType, RegionType } from "../types";

interface PropertySectionProps {
  properties: PropertyListing[];
  currentLang: LanguageType;
  activeRegion: RegionType;
}

export const PropertySection: React.FC<PropertySectionProps> = ({
  properties,
  currentLang,
  activeRegion,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>("Semua");
  const [selectedType, setSelectedType] = useState<string>("Semua");
  const [transactionType, setTransactionType] = useState<string>("Semua");
  const [maxPrice, setMaxPrice] = useState<number>(10000000000);
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showKprModal, setShowKprModal] = useState<boolean>(false);
  const [selectedPropertyForKpr, setSelectedPropertyForKpr] = useState<PropertyListing | null>(null);

  // KPR Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(1500000000);
  const [dpPercentage, setDpPercentage] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenorYears, setTenorYears] = useState<number>(15);

  const zones = [
    "Semua",
    "BSD City",
    "Alam Sutera",
    "Gading Serpong",
    "Bintaro Jaya",
    "Cikupa Citra Raya",
    "Cipondoh Kota",
  ];

  const types = ["Semua", "Rumah Tapak", "Apartemen Modern", "Ruko Komersial"];

  const filteredProperties = properties.filter((prop) => {
    const matchRegion = activeRegion === "Semua" || prop.region === activeRegion;
    const matchZone = selectedZone === "Semua" || prop.zone === selectedZone;
    const matchType = selectedType === "Semua" || prop.propertyType === selectedType;
    const matchTrans = transactionType === "Semua" || prop.priceType.includes(transactionType);
    const matchPrice = prop.price <= maxPrice;
    const matchBed = minBedrooms === 0 || prop.bedrooms >= minBedrooms;
    const matchSearch = searchQuery === "" || 
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prop.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.developer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchZone && matchType && matchTrans && matchPrice && matchBed && matchSearch;
  });

  const kprCalculation = useMemo(() => {
    const dpAmount = (propertyPrice * dpPercentage) / 100;
    const loanAmount = propertyPrice - dpAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfMonths = tenorYears * 12;

    if (monthlyRate === 0 || numberOfMonths === 0) {
      return { monthlyInstallment: 0, loanAmount, dpAmount };
    }

    const monthlyInstallment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths))) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    return {
      monthlyInstallment: Math.round(monthlyInstallment),
      loanAmount: Math.round(loanAmount),
      dpAmount: Math.round(dpAmount),
    };
  }, [propertyPrice, dpPercentage, interestRate, tenorYears]);

  const SYARIAH_PROPERTY_WA_URL = "https://wa.me/+6285211440698?text=Assalamualaikum%2C+saya+ingin+konsultasi+properti+syariah";

  const handleContactAgent = (prop: PropertyListing) => {
    const customMessage = `Assalamualaikum, saya ingin konsultasi properti syariah untuk listing "${prop.title}" (${prop.priceFormatted}, Kawasan ${prop.zone}) yang saya lihat di Portal Tangerang Raya. Mohon info detail ketersediaan unit dan jadwal survey lokasi. Terima kasih.`;
    const targetUrl = `https://wa.me/+6285211440698?text=${encodeURIComponent(customMessage)}`;
    window.open(targetUrl, "_blank");
  };

  const handleConsultSyariahKpr = (calculated?: { installment?: number; price?: number }) => {
    if (calculated && calculated.installment) {
      const msg = `Assalamualaikum, saya ingin konsultasi properti syariah dan simulasi KPR untuk properti seharga Rp ${calculated.price?.toLocaleString()} dengan estimasi cicilan Rp ${calculated.installment?.toLocaleString()}/bulan melalui Portal Tangerang Raya.`;
      window.open(`https://wa.me/+6285211440698?text=${encodeURIComponent(msg)}`, "_blank");
    } else {
      window.open(SYARIAH_PROPERTY_WA_URL, "_blank");
    }
  };

  const openKprForProperty = (prop: PropertyListing) => {
    setPropertyPrice(prop.price);
    setSelectedPropertyForKpr(prop);
    setShowKprModal(true);
  };

  return (
    <section className="space-y-6">
      {/* Bento Hero Header - Fresh, Inspiring & High Contrast */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-6 border border-emerald-700/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600/60 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Partner Resmi: Kawanhijrah.co.id & Propertymuslim.com</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Listing Properti Syariah Pilihan Tangerang Raya
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Hunian berkah tanpa riba, tanpa bank, tanpa denda, dan tanpa sita. Dikelola langsung dengan developer amanah untuk kenyamanan keluarga di BSD, Bintaro, Ciputat, Serpong, dan Cikupa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setSelectedPropertyForKpr(null);
                setShowKprModal(true);
              }}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 border border-white/60"
            >
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>{currentLang === "id" ? "Simulasi Cicil Syariah" : "Syariah Calculator"}</span>
            </button>

            <button
              onClick={() => handleConsultSyariahKpr()}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
              title="Konsultasi Properti Syariah via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>{currentLang === "id" ? "Konsultasi Syariah (WA)" : "Consult on WhatsApp"}</span>
            </button>
          </div>
        </div>

        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/80 text-xs">
          <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-700/50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-black text-sm shrink-0">✓</div>
            <div>
              <strong className="block text-white font-bold">100% Bebas Riba</strong>
              <span className="text-[11px] text-emerald-200">Akad Murni Jual-Beli</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-700/50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-black text-sm shrink-0">✓</div>
            <div>
              <strong className="block text-white font-bold">Tanpa Sita & Denda</strong>
              <span className="text-[11px] text-emerald-200">Solusi Berkah Musyawarah</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-700/50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-black text-sm shrink-0">✓</div>
            <div>
              <strong className="block text-white font-bold">Lingkungan Islami</strong>
              <span className="text-[11px] text-emerald-200">Masjid & Rumah Tahfidz</span>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-700/50 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-black text-sm shrink-0">✓</div>
            <div>
              <strong className="block text-white font-bold">Legalitas Aman</strong>
              <span className="text-[11px] text-emerald-200">SHM & IMB Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Location Zone Filter Bento Pill Row */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mr-1 shrink-0">
              Kawasan Pilihan:
            </span>
            {zones.map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedZone === zone
                    ? "bg-emerald-400 text-slate-950 shadow-xs font-black"
                    : "bg-emerald-950/80 text-emerald-200 hover:bg-emerald-800 border border-emerald-700/40"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filter Ribbon */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-xs sm:text-sm">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Filter Properti Terintegrasi</span>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Ditemukan {filteredProperties.length} listing aktif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Property Type */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Tipe Properti</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
            >
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Status Transaksi</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
            >
              <option value="Semua">Semua (Jual & Sewa)</option>
              <option value="Jual">Dijual</option>
              <option value="Sewa">Disewa</option>
            </select>
          </div>

          {/* Min Bedrooms */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Min. Kamar Tidur</label>
            <select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
            >
              <option value={0}>Semua Kamar</option>
              <option value={1}>1+ Kamar</option>
              <option value={2}>2+ Kamar</option>
              <option value={3}>3+ Kamar</option>
              <option value={4}>4+ Kamar</option>
            </select>
          </div>

          {/* Search Query */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Cari Keyword / Developer</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Misal: BSD, Summarecon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Property Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={prop.imageUrl}
                  alt={prop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-emerald-700 text-white shadow-xs">
                  {prop.propertyType}
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-white/95 text-emerald-800 shadow-sm border border-emerald-100">
                  {prop.priceType}
                </span>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/95 text-white px-3.5 py-2 rounded-xl backdrop-blur-xs border border-white/10 shadow-md">
                  <div>
                    <span className="text-[10px] text-emerald-300 block font-bold uppercase tracking-wider">Harga Akad</span>
                    <span className="font-black text-sm text-amber-300">
                      {prop.priceFormatted}
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-md font-bold">
                    {prop.zone}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{prop.address}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1 leading-snug">
                    {currentLang === "id" ? prop.title : (prop.titleEn || prop.title)}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    Developer: <strong className="text-slate-700">{prop.developer}</strong>
                  </span>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 text-xs text-slate-700 text-center">
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Bed className="w-3.5 h-3.5 text-emerald-600" />
                      {prop.bedrooms} KT
                    </span>
                    <span className="text-[10px] text-slate-500">Kamar Tidur</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-emerald-200/60">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Bath className="w-3.5 h-3.5 text-emerald-600" />
                      {prop.bathrooms} KM
                    </span>
                    <span className="text-[10px] text-slate-500">Kamar Mandi</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                      {prop.buildingAreaM2} m²
                    </span>
                    <span className="text-[10px] text-slate-500">Luas Bangunan</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1 pt-1">
                  {prop.features.slice(0, 3).map((feat, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-slate-700 flex items-start gap-1.5 font-medium"
                    >
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="p-5 pt-0 space-y-3 border-t border-slate-100 mt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {prop.agent.name}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  {prop.agent.agency.replace("Desk ", "")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => openKprForProperty(prop)}
                  className="py-2.5 px-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Simulasi Cicil</span>
                </button>

                <button
                  onClick={() => handleContactAgent(prop)}
                  className="py-2.5 px-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Survey & WA</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Syariah Installment / KPR Modal */}
      {showKprModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowKprModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Skema Murni Syariah • Tanpa Riba & Bank
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Simulasi Cicilan Syariah & Developer</span>
              </h3>
              {selectedPropertyForKpr ? (
                <p className="text-xs text-slate-600 mt-1">
                  Unit: <strong className="text-slate-800">{selectedPropertyForKpr.title}</strong> ({selectedPropertyForKpr.zone})
                </p>
              ) : (
                <p className="text-xs text-slate-600 mt-1">
                  Simulasi perhitungan cicilan langsung ke developer syariah atau cash bertahap.
                </p>
              )}
            </div>

            {/* Inputs */}
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Harga Unit Properti (IDR)</span>
                  <span className="text-emerald-700 font-black text-sm">
                    Rp {propertyPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={300000000}
                  max={5000000000}
                  step={25000000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>Uang Muka (DP)</span>
                    <span className="text-emerald-700 font-bold">{dpPercentage}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={5}
                    value={dpPercentage}
                    onChange={(e) => setDpPercentage(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                    DP: Rp {kprCalculation.dpAmount.toLocaleString()}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>Margin Flat Syariah</span>
                    <span className="text-emerald-700 font-bold">Transparan</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                    0% Bunga Riba • Tanpa Denda & Tanpa Sita
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tenor Cicilan Developer</label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 7, 10].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setTenorYears(yr)}
                      className={`py-2 rounded-xl font-bold border transition-colors text-xs ${
                        tenorYears === yr
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {yr} Tahun
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Calculation Result */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white space-y-3 border border-emerald-700/50">
              <span className="text-xs text-emerald-300 font-semibold block uppercase tracking-wider">
                Estimasi Cicilan Flat Syariah:
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                Rp {Math.round((propertyPrice - kprCalculation.dpAmount) / (tenorYears * 12)).toLocaleString()} <span className="text-xs font-normal text-white">/ bulan (Flat)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-emerald-800 text-[11px] text-emerald-100">
                <div>
                  <span className="text-slate-400">Sisa Pokok Akad:</span>
                  <strong className="block text-white font-bold">
                    Rp {(propertyPrice - kprCalculation.dpAmount).toLocaleString()}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400">Skema Kepemilikan:</span>
                  <strong className="block text-emerald-300 font-bold">
                    Akad Istishna' / Murabahah
                  </strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowKprModal(false);
                  if (selectedPropertyForKpr) {
                    handleContactAgent(selectedPropertyForKpr);
                  } else {
                    handleConsultSyariahKpr({
                      installment: Math.round((propertyPrice - kprCalculation.dpAmount) / (tenorYears * 12)),
                      price: propertyPrice,
                    });
                  }
                }}
                className="w-full sm:flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {selectedPropertyForKpr
                    ? "Konsultasi Syariah untuk Unit Ini"
                    : "Konsultasi Syariah via WhatsApp (Kawan Hijrah)"}
                </span>
              </button>

              <button
                onClick={() => setShowKprModal(false)}
                className="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
