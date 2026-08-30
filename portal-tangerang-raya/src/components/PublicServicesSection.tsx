import React, { useState } from "react";
import { 
  PhoneCall, 
  Hospital, 
  ShieldAlert, 
  Flame, 
  Train, 
  FileCheck, 
  UserCheck, 
  Droplets, 
  Zap, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Search, 
  CheckCircle2,
  AlertCircle,
  FileText,
  Car
} from "lucide-react";
import { PublicService, LanguageType, RegionType } from "../types";

interface PublicServicesSectionProps {
  services: PublicService[];
  currentLang: LanguageType;
  activeRegion: RegionType;
}

export const PublicServicesSection: React.FC<PublicServicesSectionProps> = ({
  services,
  currentLang,
  activeRegion,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const emergencyHotlines = [
    { name: "Tangerang Siaga 112", number: "112", role: "Panggilan Darurat Bebas Pulsa", icon: PhoneCall, bg: "bg-red-600 hover:bg-red-700" },
    { name: "Ambulans Gratis", number: "119 / 021-5523507", role: "Evakuasi Medis Kritis", icon: Hospital, bg: "bg-emerald-600 hover:bg-emerald-700" },
    { name: "Polres Metro Tangsel", number: "021-5374829", role: "Keamanan & Kamtibmas", icon: ShieldAlert, bg: "bg-blue-800 hover:bg-blue-900" },
    { name: "Damkar Tangerang", number: "021-5582144", role: "Pemadam Kebakaran & Rescue", icon: Flame, bg: "bg-amber-600 hover:bg-amber-700" },
    { name: "PLN Tangerang", number: "123", role: "Gangguan Listrik 24 Jam", icon: Zap, bg: "bg-cyan-700 hover:bg-cyan-800" },
    { name: "PDAM Tirta Benteng", number: "021-5587234", role: "Layanan Air Bersih", icon: Droplets, bg: "bg-indigo-700 hover:bg-indigo-800" },
  ];

  const quickServices = [
    { label: "Pajak / PBB", icon: FileText, category: "Perizinan" },
    { label: "Samsat Keliling", icon: Car, category: "Transportasi" },
    { label: "RS Rujukan", icon: Hospital, category: "Kesehatan" },
    { label: "PLN & Air", icon: Zap, category: "Utilitas" },
    { label: "Dukcapil", icon: UserCheck, category: "Kependudukan" },
    { label: "Pengaduan 112", icon: PhoneCall, category: "Darurat" },
  ];

  const categories = ["Semua", "Darurat", "Kesehatan", "Transportasi", "Kependudukan", "Perizinan", "Utilitas"];

  const filteredServices = services.filter((s) => {
    const matchRegion = activeRegion === "Semua" || s.region === activeRegion || s.region === "Semua";
    const matchCategory = selectedCategory === "Semua" || s.category === selectedCategory;
    const matchSearch = searchQuery === "" || 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "PhoneCall": return <PhoneCall className="w-5 h-5 text-blue-600" />;
      case "Hospital": return <Hospital className="w-5 h-5 text-emerald-600" />;
      case "FileCheck": return <FileCheck className="w-5 h-5 text-blue-600" />;
      case "UserCheck": return <UserCheck className="w-5 h-5 text-teal-600" />;
      case "Train": return <Train className="w-5 h-5 text-indigo-600" />;
      case "Droplets": return <Droplets className="w-5 h-5 text-cyan-600" />;
      default: return <Zap className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section className="space-y-6">
      {/* Bento Main Featured Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Blue Bento Public Services Featured Card */}
        <div className="lg:col-span-8 bg-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200/50 flex flex-col justify-between space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {currentLang === "id" ? "Terintegrasi" : "Integrated"}
                </span>
                <span className="flex items-center gap-1 text-xs text-blue-200 font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  Siaga 24 Jam
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Pusat Layanan Publik & Siaga Darurat
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1 leading-relaxed">
                Akses cepat nomor darurat bebas pulsa 112, antrean online Dukcapil, jadwal SIM & Samsat keliling se-Tangerang Raya.
              </p>
            </div>
          </div>

          {/* Bento Sub-cells for Quick Category Navigation */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickServices.map((qs, i) => {
              const Icon = qs.icon;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedCategory(qs.category)}
                  className="bg-blue-700/50 p-3 rounded-2xl flex flex-col items-center gap-2 hover:bg-blue-700/80 transition-all cursor-pointer text-center group border border-blue-500/30 active:scale-95"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    {qs.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Emergency Hotline Bento Box (4 cols) - Bright, High Contrast & Inspiring */}
        <div className="lg:col-span-4 bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 text-slate-900 shadow-xs border border-rose-200/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-200/60">
            <h3 className="font-black text-sm sm:text-base flex items-center gap-2 text-rose-950">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Panggilan Darurat Cepat</span>
            </h3>
            <span className="text-[10px] bg-rose-600 text-white font-black px-2.5 py-0.5 rounded-full shadow-2xs">
              BEBAS PULSA
            </span>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[260px] no-scrollbar">
            {emergencyHotlines.slice(0, 4).map((hl, i) => {
              const Icon = hl.icon;
              return (
                <a
                  key={i}
                  href={`tel:${hl.number.split("/")[0].trim()}`}
                  className="p-3 rounded-2xl bg-white hover:bg-rose-100/50 border border-rose-100 transition-all flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block group-hover:text-rose-700 transition-colors">
                        {hl.name}
                      </span>
                      <span className="text-[10px] text-slate-500">{hl.role}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg">
                    {hl.number.split("/")[0].trim()}
                  </span>
                </a>
              );
            })}
          </div>

          <a
            href="tel:112"
            className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            <span>Panggil Call Center 112 (Siaga 24 Jam)</span>
          </a>
        </div>
      </div>

      {/* Filter & Search Bar Bento Ribbon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar w-full sm:w-auto">
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

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder={currentLang === "id" ? "Cari nomor / instansi..." : "Search services..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Bento Grid of Public Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {getServiceIcon(service.iconName)}
                </div>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                  service.status === "24 Jam" || service.status === "Online" || service.status === "Buka"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  ● {service.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">
                  {service.category} • {service.region}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {currentLang === "id" ? service.name : (service.nameEn || service.name)}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {currentLang === "id" ? service.description : (service.descriptionEn || service.description)}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{service.operationalHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{service.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={service.contactNumber.startsWith("http") ? service.contactNumber : `tel:${service.contactNumber}`}
                className="flex-1 text-center py-2.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                {service.actionLabel}
              </a>
              {service.onlineServiceUrl && (
                <a
                  href={service.onlineServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Akses Portal Web"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
