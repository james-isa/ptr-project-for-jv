export type RegionType = "Semua" | "Kota Tangerang" | "Tangerang Selatan" | "Kabupaten Tangerang";

export type LanguageType = "id" | "en";

export type TabType = "berita" | "layanan" | "agenda" | "umkm" | "pariwisata" | "properti" | "penawaran";

export interface NewsArticle {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  summary: string;
  summaryEn?: string;
  content: string;
  contentEn?: string;
  category: "Pemerintahan" | "Bisnis & UMKM" | "Lalu Lintas" | "Pariwisata & Budaya" | "Pendidikan & Kesehatan" | "Olahraga";
  region: RegionType;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  views: number;
  isBreaking?: boolean;
  isUrgent?: boolean;
  isEditorialOnly?: boolean; // Khusus diproduksi oleh Tim Redaksi Internal
  isEditorialChoice?: boolean; // Pilihan Redaksi untuk Berita Utama (Headlines)
  sourceType?: "redaksi" | "kontributor" | "siaran_pers";
  editorialDesk?: string; // e.g. "Liputan Khusus", "Investigasi", "Metro Redaksi"
  tags: string[];
}

export interface PublicService {
  id: string;
  name: string;
  nameEn?: string;
  category: "Darurat" | "Kependudukan" | "Kesehatan" | "Transportasi" | "Perizinan" | "Utilitas";
  region: RegionType;
  description: string;
  descriptionEn?: string;
  contactNumber: string;
  operationalHours: string;
  location: string;
  onlineServiceUrl?: string;
  iconName: string;
  status: "Buka" | "24 Jam" | "Online" | "Tutup";
  actionLabel: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleEn?: string;
  category: "Festival & Budaya" | "Olahraga" | "Bisnis & UMKM" | "Pameran / Expo" | "Edukasi & Workshop";
  region: RegionType;
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  imageUrl: string;
  ticketType: "Gratis" | "Berbayar" | "Registrasi Terbuka";
  price?: string;
  capacity?: string;
  registrationUrl?: string;
  tags: string[];
}

export interface UmkmBusiness {
  id: string;
  name: string;
  category: "Kuliner Khas" | "Kriya & Kerajinan" | "Fashion & Batik" | "Kopi & Kafe" | "Jasa Kreatif";
  region: RegionType;
  district: string;
  address: string;
  owner: string;
  description: string;
  descriptionEn?: string;
  specialtyProduct: string;
  priceRange: "Rp" | "RpRp" | "RpRpRp";
  rating: number;
  reviewsCount: number;
  whatsappNumber: string;
  instagram?: string;
  imageUrl: string;
  isVerified: boolean;
  halalCertified: boolean;
  promo?: string;
}

export interface TourismSpot {
  id: string;
  name: string;
  nameEn?: string;
  category: "Wisata Budaya & Sejarah" | "Wisata Alam & Edukasi" | "Wisata Hiburan & Modern" | "Wisata Belanja & Kuliner";
  region: RegionType;
  location: string;
  distanceFromAirport: string; // e.g. "25 menit dari Bandara Soekarno-Hatta (CGK)"
  description: string;
  descriptionEn: string;
  highlights: string[];
  ticketPrice: string;
  ticketPriceEn: string;
  openingHours: string;
  imageUrl: string;
  rating: number;
  mapsUrl: string;
  bestTimeToVisit: string;
  publicTransitGuide: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  titleEn?: string;
  propertyType: "Rumah Tapak" | "Apartemen Modern" | "Ruko Komersial" | "Kavling Tanah" | "Cluster Syariah" | "Townhouse";
  region: RegionType;
  zone: string;
  price: number; // in IDR
  priceFormatted: string;
  priceType: "Jual" | "Sewa / Bulan" | "Sewa / Tahun" | "Jual (Akad Syariah)" | "Jual / Sewa Syariah";
  bedrooms: number;
  bathrooms: number;
  landAreaM2: number;
  buildingAreaM2: number;
  developer: string;
  address: string;
  imageUrl: string;
  gallery: string[];
  features: string[];
  agent: {
    name: string;
    phone: string;
    agency: string;
    whatsapp: string;
  };
  isFeatured?: boolean;
}

export interface ExclusiveOffer {
  id: string;
  title: string;
  partnerName: string;
  tier: "Gold Partner" | "Strategic Partner" | "UMKM Partner";
  discountText: string;
  code: string;
  validUntil: string;
  category: "Hospitality & Hotel" | "Restoran & Kafe" | "Venue Pameran ICE BSD" | "Layanan Bisnis & Hukum";
  description: string;
  imageUrl: string;
  actionUrl: string;
}

export interface PushNotificationItem {
  id: string;
  title: string;
  body: string;
  category: "Urgent News" | "Cuaca & Bencana" | "Lalu Lintas" | "Agenda Baru" | "Promo Mitra";
  timestamp: string;
  isRead: boolean;
  link?: string;
  priority: "high" | "medium" | "normal";
}

export interface BookmarkItem {
  id: string;
  type: "news" | "service" | "event" | "umkm" | "tourism" | "property";
  title: string;
  subtitle: string;
  imageUrl?: string;
  savedAt: string;
}
