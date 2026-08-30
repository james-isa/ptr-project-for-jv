import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google GenAI initialization
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), portal: "Portal Tangerang Raya" });
});

// Google Publisher Center Compliant RSS/Atom Feed endpoint
app.get("/api/feed.xml", (req, res) => {
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Portal Tangerang Raya - Berita Terkini</title>
  <link>https://portaltangerangraya.com</link>
  <description>Pusat berita terpercaya, layanan publik, dan agenda Tangerang Raya.</description>
  <language>id-ID</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="https://portaltangerangraya.com/api/feed.xml" rel="self" type="application/rss+xml" />
  <item>
    <title>Revitalisasi Koridor Kali Cisadane &amp; Persiapan Festival Budaya 2026</title>
    <link>https://portaltangerangraya.com/#berita-1</link>
    <description>Pemerintah Kota Tangerang merampungkan penataan pedestrian dan ruang terbuka hijau di sepanjang bantaran Sungai Cisadane.</description>
    <pubDate>${new Date(Date.now() - 3600000).toUTCString()}</pubDate>
    <guid>https://portaltangerangraya.com/#berita-1</guid>
  </item>
  <item>
    <title>Tangsel Kembangkan Hub Inovasi Digital dan Akselerasi 1.000 UMKM Naik Kelas</title>
    <link>https://portaltangerangraya.com/#berita-2</link>
    <description>Inisiatif strategis Pemkot Tangsel untuk memperluas akses pasar ekspor bagi produk kriya dan kuliner khas Tangerang Selatan.</description>
    <pubDate>${new Date(Date.now() - 7200000).toUTCString()}</pubDate>
    <guid>https://portaltangerangraya.com/#berita-2</guid>
  </item>
</channel>
</rss>`;
  res.setHeader("Content-Type", "application/xml");
  res.send(rssXml);
});

// AI Tangerang Smart Assistant (Gemini 3.7 Flash)
app.post("/api/ai/ask", async (req, res) => {
  try {
    const { prompt, language = "id", contextCategory } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      // Friendly fallback if key is not attached yet
      const fallbackReplies: Record<string, string> = {
        id: `Halo! Saya Asisten Virtual Portal Tangerang Raya. Untuk pertanyaan "${prompt}":\n\nTangerang Raya mencakup Kota Tangerang, Tangerang Selatan (Tangsel), dan Kabupaten Tangerang. Wilayah ini memiliki pusat bisnis modern (BSD, Alam Sutera, Gading Serpong), pusat kuliner legendaris (Pasar Lama Cisadane, Laksa Tangerang), serta Bandara Internasional Soekarno-Hatta.\n\nLayanan darurat terpadu dapat dihubungi melalui Call Center 112 (Bebas Pulsa). Jika Anda memerlukan panduan rute KRL/Tol, rekomendasi UMKM, atau info properti, silakan gunakan fitur pencarian pada portal kami.`,
        en: `Hello! I am the Tangerang Raya Smart Portal AI Guide. Regarding "${prompt}":\n\nGreater Tangerang (Tangerang Raya) consists of Tangerang City, South Tangerang (Tangsel), and Tangerang Regency. It is home to Soekarno-Hatta International Airport (CGK), premier commercial hubs (BSD City, Alam Sutera, Gading Serpong), and rich cultural heritage such as Cisadane River and Benteng Heritage. \n\nFor 24/7 emergencies, dial 112. Feel free to explore our public services, tourism guides, MSME directories, and property listings!`,
      };
      return res.json({
        reply: fallbackReplies[language] || fallbackReplies["id"],
        source: "local-knowledge-base",
      });
    }

    const systemInstruction = `Anda adalah "Tangerang Raya AI Navigator", asisten pintar resmi Portal Tangerang Raya (https://portaltangerangraya.com).
Anda ahli dalam memberikan informasi terkini, ramah, akurat, dan komprehensif seputar 3 wilayah:
1. Kota Tangerang (Pusat Pemerintahan, Cisadane, Pasar Lama, Bandara Soetta, Laksa Benteng, Masjid Al-A'zhom, Taman Potret).
2. Kota Tangerang Selatan (BSD City, Bintaro Jaya, Alam Sutera, Pamulang, Ciputat, ICE BSD, Scientia Park, Ocean Park, Hutan Kota BSD).
3. Kabupaten Tangerang (Tigaraksa, Citra Raya Cikupa, Balaraja, Suvarna Sutera, Tebing Koja Godzilla, Danau Cisoka, Mangrove Ketapang Mauk).

Kategori fokus:
- Berita & Kebijakan publik
- Layanan Publik & Emergency (112, RSUD, Puskesmas, SIM & Samsat Keliling, KRL Commuter Line, Kereta Bandara Railink, Tol Jakarta-Tangerang / Tol Kunciran-Serpong)
- Direktori UMKM Lokal (Kecap SH Benteng, Roti Lauw, Batik Benteng, Kopi Lengkong, produk kreatif lokal)
- Pusat Pariwisata & Panduan Wisatawan Asing/Lokal (Transit dari Bandara CGK, transportasi Grab/Damri/KRL, etiket lokal, money changer)
- Listing Properti & Investasi (BSD, Gading Serpong, Bintaro, Cikupa, estimasi harga & fasilitas)
- Agenda Acara (Festival Cisadane, Tangsel Marathon, Pameran ICE BSD).

Instruksi bahasa:
- Jika pengguna bertanya dalam Bahasa Indonesia atau request language = 'id', jawab dalam Bahasa Indonesia yang profesional, ramah, informatif, dan terstruktur (gunakan bullet point yang rapi).
- Jika pengguna bertanya dalam Bahasa Inggris atau request language = 'en', jawab dalam Bahasa Inggris yang jelas, ramah turis/investor mancanegara.
- Berikan tips praktis, nama lokasi, dan nomor darurat bila relevan.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `[Context: ${contextCategory || "Umum Tangerang Raya"}] Pertanyaan: ${prompt}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Mohon maaf, tidak dapat menghasilkan jawaban saat ini.";
    return res.json({ reply, source: "gemini-3.7-flash" });
  } catch (error: any) {
    console.error("Gemini AI API Error:", error);
    return res.status(500).json({
      error: "Gagal memproses pertanyaan",
      details: error?.message || "Internal server error",
    });
  }
});

// Partner Inquiry Endpoint
app.post("/api/partner/inquiry", (req, res) => {
  const { companyName, contactPerson, email, phone, tier, message } = req.body;
  if (!companyName || !email || !phone) {
    return res.status(400).json({ error: "Mohon lengkapi data mitra" });
  }
  // Simulate successful registration and ticket generation
  const ticketId = `PTR-PARTNER-${Date.now().toString().slice(-6)}`;
  return res.json({
    success: true,
    ticketId,
    message: "Permohonan kemitraan berhasil dikirim. Tim Redaksi & Bisnis Portal Tangerang Raya akan menghubungi Anda dalam 1x24 jam kerja.",
  });
});

// UMKM Registration Endpoint
app.post("/api/umkm/register", (req, res) => {
  const { businessName, category, ownerName, phone, address, district, description } = req.body;
  if (!businessName || !ownerName || !phone) {
    return res.status(400).json({ error: "Mohon isi nama usaha, pemilik, dan nomor WhatsApp" });
  }
  const umkmId = `UMKM-TR-${Date.now().toString().slice(-5)}`;
  return res.json({
    success: true,
    umkmId,
    message: "Pendaftaran UMKM berhasil! Profil UMKM Anda akan diverifikasi oleh tim kurasi Portal Tangerang Raya.",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portal Tangerang Raya server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
