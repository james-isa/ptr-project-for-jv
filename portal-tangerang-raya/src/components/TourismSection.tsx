import React, { useState } from "react";
import { 
  Plane, 
  MapPin, 
  Compass, 
  Star, 
  Navigation, 
  Clock, 
  Search, 
  Bus, 
  Train,
  Sparkles,
  Ticket
} from "lucide-react";
import { TourismSpot, LanguageType, RegionType } from "../types";

interface TourismSectionProps {
  spots: TourismSpot[];
  currentLang: LanguageType;
  activeRegion: RegionType;
}

export const TourismSection: React.FC<TourismSectionProps> = ({
  spots,
  currentLang,
  activeRegion,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["Semua", "Wisata Budaya & Sejarah", "Wisata Alam & Edukasi", "Wisata Hiburan & Modern", "Wisata Belanja & Kuliner"];

  const filteredSpots = spots.filter((spot) => {
    const matchRegion = activeRegion === "Semua" || spot.region === activeRegion;
    const matchCategory = selectedCategory === "Semua" || spot.category === selectedCategory;
    const matchSearch = searchQuery === "" || 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  const handleOpenGoogleMaps = (spot: TourismSpot) => {
    if (spot.mapsUrl) {
      window.open(spot.mapsUrl, "_blank");
      return;
    }
    const query = encodeURIComponent(`${spot.name}, ${spot.location}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, "_blank");
  };

  return (
    <section className="space-y-6">
      {/* Bento Airport & Tourism Gateway Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tourism Gateway (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/20 text-teal-200 text-xs font-bold border border-teal-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>{currentLang === "id" ? "Pusat Pariwisata & Heritage" : "Tourism & Cultural Gateway"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Destinasi Wisata & Panduan Wisatawan Tangerang Raya
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
              Panduan terpercaya bagi turis domestik & mancanegara. Jelajahi kawasan pecinan Pasar Lama, sungai Cisadane, Tebing Koja, hingga pusat hiburan modern BSD City.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-teal-700/60 text-xs">
            <div className="p-3 rounded-2xl bg-teal-950/60 border border-teal-700/50">
              <span className="text-teal-300 font-bold block text-[10px] uppercase">Akses Bandara:</span>
              <span className="font-semibold text-white">10 - 25 Menit via Tol</span>
            </div>
            <div className="p-3 rounded-2xl bg-teal-950/60 border border-teal-700/50">
              <span className="text-teal-300 font-bold block text-[10px] uppercase">Moda Transit:</span>
              <span className="font-semibold text-white">Kereta Bandara & Bus Tayo</span>
            </div>
            <div className="p-3 rounded-2xl bg-teal-950/60 border border-teal-700/50 col-span-2 sm:col-span-1">
              <span className="text-teal-300 font-bold block text-[10px] uppercase">Layanan Turis:</span>
              <span className="font-semibold text-white">Multi-Bahasa (ID / EN)</span>
            </div>
          </div>
        </div>

        {/* Right: Airport Transit Bento Box (4 cols) - Bright, Inviting & High Contrast */}
        <div className="lg:col-span-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 text-slate-900 shadow-xs border border-teal-200/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-teal-200/60">
            <h3 className="font-black text-sm sm:text-base flex items-center gap-2 text-teal-950">
              <Plane className="w-4 h-4 text-teal-700" />
              <span>Gerbang Bandara Soetta (CGK)</span>
            </h3>
            <span className="text-[10px] bg-teal-700 text-white font-black px-2.5 py-0.5 rounded-full shadow-2xs">
              LIVE CGK
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-white border border-teal-100 flex items-start gap-2.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                <Train className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Kereta Bandara Railink</strong>
                <span className="text-slate-600 text-[11px]">Rute St. Batu Ceper - Soekarno-Hatta (12 Menit)</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-teal-100 flex items-start gap-2.5 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Bus className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Bus Tayo Tangerang</strong>
                <span className="text-slate-600 text-[11px]">Tarif flat Rp 2.000 menghubungkan koridor utama</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-teal-200/60 text-[11px] text-teal-900 font-medium">
            Terhubung langsung ke Terminal 1, 2, dan 3 Bandara Internasional Soekarno-Hatta.
          </div>
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
                  ? "bg-teal-600 text-white shadow-xs"
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
            placeholder={currentLang === "id" ? "Cari tempat wisata, kuliner..." : "Search tourist spots..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:border-teal-600 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Tourism Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Airport distance badge */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                  {spot.category}
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold rounded-md bg-white/90 text-slate-900 backdrop-blur-xs shadow-xs">
                  {currentLang === "id" ? spot.ticketPrice : (spot.ticketPriceEn || spot.ticketPrice)}
                </span>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-bold text-white bg-teal-600/90 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <Plane className="w-3 h-3" />
                  <span>{spot.distanceFromAirport}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{spot.region}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black text-slate-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug">
                  {currentLang === "id" ? spot.name : (spot.nameEn || spot.name)}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {currentLang === "id" ? spot.description : (spot.descriptionEn || spot.description)}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{spot.openingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{spot.location}</span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {spot.highlights.map((hl, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-[10px] font-semibold bg-teal-50 text-teal-800 rounded-full border border-teal-100"
                    >
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleOpenGoogleMaps(spot)}
                className="w-full py-2.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-98"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{currentLang === "id" ? "Buka Rute Google Maps" : "Get Google Maps Route"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
