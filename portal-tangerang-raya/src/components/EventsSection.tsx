import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Tag, 
  Plus, 
  Search, 
  CheckCircle, 
  Sparkles,
  X
} from "lucide-react";
import { CommunityEvent, LanguageType, RegionType } from "../types";

interface EventsSectionProps {
  events: CommunityEvent[];
  currentLang: LanguageType;
  activeRegion: RegionType;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  currentLang,
  activeRegion,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [registerEventModalOpen, setRegisterEventModalOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    region: "Kota Tangerang",
    category: "Festival & Budaya",
    description: "",
  });

  const categories = ["Semua", "Festival & Budaya", "Olahraga", "Bisnis & UMKM", "Pameran / Expo", "Edukasi & Workshop"];

  const filteredEvents = events.filter((ev) => {
    const matchRegion = activeRegion === "Semua" || ev.region === activeRegion;
    const matchCategory = selectedCategory === "Semua" || ev.category === selectedCategory;
    const matchSearch = searchQuery === "" || 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ev.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchCategory && matchSearch;
  });

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/events/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  const handleAddToCalendar = (ev: CommunityEvent) => {
    const title = encodeURIComponent(ev.title);
    const details = encodeURIComponent(`${ev.description}\n\nPenyelenggara: ${ev.organizer}\nInfo Portal Tangerang Raya (portaltangerangraya.com)`);
    const location = encodeURIComponent(ev.location);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, "_blank");
  };

  return (
    <section className="space-y-6">
      {/* Bento Featured Header & Dark Highlights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Event Banner Hero (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentLang === "id" ? "Agenda & Kalender Komunitas" : "Community Events & Festivals"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Kalender Kegiatan & Festival Tangerang Raya 2026
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Jelajahi festival budaya Cisadane, expo teknologi ICE BSD, marathon lari komunitas, dan workshop kewirausahaan UMKM.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setSubmitted(false);
                setRegisterEventModalOpen(true);
              }}
              className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              <span>{currentLang === "id" ? "Publikasikan Event Komunitas" : "Submit Community Event"}</span>
            </button>
          </div>
        </div>

        {/* Right: Timeline Bento Box (4 cols) - Bright, High Contrast & Inspiring */}
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 text-slate-900 shadow-xs border border-indigo-200/80 flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-200/60 relative z-10">
            <h3 className="font-black text-sm sm:text-base flex items-center gap-2 text-indigo-950">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Agenda Pekan Ini</span>
            </h3>
            <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full shadow-2xs">
              Tangerang Raya
            </span>
          </div>

          <div className="space-y-3.5 relative z-10 flex-1">
            {events.slice(0, 3).map((ev) => (
              <div key={ev.id} className="border-l-3 border-indigo-600 pl-3.5 space-y-1 bg-white/70 p-2 rounded-r-xl border-y border-r border-indigo-100/60">
                <span className="text-[10px] font-black text-indigo-700 uppercase block tracking-wider">
                  {ev.date} • {ev.region}
                </span>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {ev.title}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-1 font-medium">
                  {ev.location}
                </p>
              </div>
            ))}
          </div>

          <span className="text-[11px] text-indigo-950 font-medium block relative z-10 pt-2 border-t border-indigo-200/60">
            Sinergi komunitas kreatif, dinas pariwisata & pelaku UMKM.
          </span>
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
            placeholder={currentLang === "id" ? "Cari festival, expo, lari..." : "Search events..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Event Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={ev.imageUrl}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-900/80 text-white backdrop-blur-xs">
                  {ev.category}
                </span>

                <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-bold text-white bg-blue-600/90 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  <MapPin className="w-3 h-3" />
                  {ev.region}
                </span>

                <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-extrabold rounded-md bg-white/90 text-slate-900 backdrop-blur-xs shadow-xs">
                  {ev.ticketType === "Gratis" ? "GRATIS" : (ev.price || "Berbayar")}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{ev.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {currentLang === "id" ? ev.title : (ev.titleEn || ev.title)}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {ev.description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Oleh: {ev.organizer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0">
              <button
                onClick={() => handleAddToCalendar(ev)}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentLang === "id" ? "Simpan ke Google Calendar" : "Add to Google Calendar"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {registerEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 border border-slate-200">
            <button
              onClick={() => setRegisterEventModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Agenda Berhasil Diajukan!</h3>
                <p className="text-xs text-slate-600">
                  Event <strong>{formData.title}</strong> akan ditinjau oleh tim redaksi sebelum ditampilkan di kalender publik portal.
                </p>
                <button
                  onClick={() => setRegisterEventModalOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>Publikasikan Agenda Komunitas</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Beri tahu warga se-Tangerang Raya mengenai kegiatan, konser, workshop, atau kompetisi Anda.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nama Kegiatan / Event *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tangerang Digital Fest 2026"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                      >
                        <option value="Festival & Budaya">Festival & Budaya</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Bisnis & UMKM">Bisnis & UMKM</option>
                        <option value="Pameran / Expo">Pameran / Expo</option>
                        <option value="Edukasi & Workshop">Edukasi & Workshop</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Wilayah</label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                      >
                        <option value="Kota Tangerang">Kota Tangerang</option>
                        <option value="Tangerang Selatan">Tangerang Selatan</option>
                        <option value="Kabupaten Tangerang">Kabupaten Tangerang</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tanggal *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Waktu Pelaksanaan *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 08:00 - 17:00 WIB"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Lokasi Tempat Acara *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Taman Elektrik Kota Tangerang / ICE BSD"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan daya tarik acara, artis penampil, atau cara pendaftaran peserta..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition-colors"
                >
                  Kirim Agenda Komunitas
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
