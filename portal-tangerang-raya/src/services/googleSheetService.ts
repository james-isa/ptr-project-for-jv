import { NewsArticle, RegionType } from "../types";
import { newsArticles as fallbackNewsArticles } from "../data/mockData";

const DEFAULT_SHEET_ID = "1n5kNGPAfAu8ov0gINi2fCPL79s3MANe-AAMIlRWvLsM";

/**
 * Fetch dynamic articles from Google Sheets using public Google Visualization API (GViz / TQ)
 * Sheet URL Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet={SHEET_NAME}
 */
export async function fetchArticlesFromGoogleSheet(
  sheetId: string = DEFAULT_SHEET_ID,
  sheetName: string = "Berita"
): Promise<{ articles: NewsArticle[]; source: "google_sheet" | "mock_fallback"; sheetFound: boolean }> {
  try {
    const targetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
    
    // Set a fast timeout to prevent UI hang
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: HTTP ${response.status}`);
    }

    const text = await response.text();
    // Parse Google's /*O_o*/google.visualization.Query.setResponse({...}); wrapper
    const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!match || !match[1]) {
      throw new Error("Invalid GViz JSON response format");
    }

    const json = JSON.parse(match[1]);
    const table = json.table;
    if (!table || !table.rows || table.rows.length === 0) {
      return { articles: fallbackNewsArticles, source: "mock_fallback", sheetFound: false };
    }

    // Map headers from row 0 if labels aren't defined in cols
    const firstRowValues = table.rows[0].c.map((cell: any) => (cell?.v ? String(cell.v).toLowerCase().trim() : ""));
    const startIndex = (firstRowValues.includes("title") || firstRowValues.includes("judul") || firstRowValues.includes("timestamp") || firstRowValues.includes("source")) ? 1 : 0;

    // Detect column indexes
    let colIndexMap: Record<string, number> = {};
    if (startIndex === 1) {
      firstRowValues.forEach((header: string, idx: number) => {
        if (header) colIndexMap[header] = idx;
      });
    }

    const getVal = (row: any, keys: string[], defaultColIdx: number): string => {
      for (const key of keys) {
        if (colIndexMap[key] !== undefined && row.c[colIndexMap[key]]?.v !== undefined) {
          return String(row.c[colIndexMap[key]].v);
        }
      }
      if (row.c[defaultColIdx]?.v !== undefined) {
        return String(row.c[defaultColIdx].v);
      }
      return "";
    };

    const parsedArticles: NewsArticle[] = [];

    for (let i = startIndex; i < table.rows.length; i++) {
      const row = table.rows[i];
      if (!row || !row.c) continue;

      const title = getVal(row, ["title", "judul", "berita", "page", "source"], 1);
      if (!title || title.trim().length === 0) continue;

      const id = getVal(row, ["id", "slug", "no"], 0) || `sheet-article-${i}`;
      const rawCategory = getVal(row, ["category", "kategori", "topik"], 2);
      const rawRegion = getVal(row, ["region", "wilayah", "kota"], 3);
      const authorName = getVal(row, ["author", "penulis", "wartawan", "ref"], 4) || "Redaksi Portal Tangerang Raya";
      const summary = getVal(row, ["summary", "ringkasan", "deskripsi"], 5) || title;
      const content = getVal(row, ["content", "isi", "konten", "artikel"], 6) || summary;
      const imageUrl = getVal(row, ["image", "imageurl", "gambar", "foto"], 7) || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80";
      const publishedAt = getVal(row, ["publishedat", "tanggal", "waktu", "timestamp"], 0) || "Baru Saja";

      // Map category strictly
      let validCategory: NewsArticle["category"] = "Pemerintahan";
      if (rawCategory.includes("Bisnis") || rawCategory.includes("UMKM") || rawCategory.includes("Ekonomi")) {
        validCategory = "Bisnis & UMKM";
      } else if (rawCategory.includes("Lalu Lintas") || rawCategory.includes("Macet") || rawCategory.includes("Jalan")) {
        validCategory = "Lalu Lintas";
      } else if (rawCategory.includes("Pariwisata") || rawCategory.includes("Budaya") || rawCategory.includes("Wisata")) {
        validCategory = "Pariwisata & Budaya";
      } else if (rawCategory.includes("Pendidikan") || rawCategory.includes("Kesehatan") || rawCategory.includes("Sekolah") || rawCategory.includes("RS")) {
        validCategory = "Pendidikan & Kesehatan";
      } else if (rawCategory.includes("Olahraga") || rawCategory.includes("Sport")) {
        validCategory = "Olahraga";
      }

      // Map region strictly
      let validRegion: RegionType = "Semua";
      if (rawRegion.toLowerCase().includes("selatan") || rawRegion.toLowerCase().includes("tangsel")) {
        validRegion = "Tangerang Selatan";
      } else if (rawRegion.toLowerCase().includes("kabupaten")) {
        validRegion = "Kabupaten Tangerang";
      } else if (rawRegion.toLowerCase().includes("kota")) {
        validRegion = "Kota Tangerang";
      }

      parsedArticles.push({
        id,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: validCategory,
        region: validRegion,
        imageUrl,
        author: {
          name: authorName,
          role: "Wartawan Liputan Tangerang Raya",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        },
        publishedAt,
        readTimeMinutes: Math.max(2, Math.round(content.length / 500)),
        views: 120 + (i * 35),
        summary,
        content: content.includes("<p>") ? content : `<p>${content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`,
        tags: ["Tangerang Raya", validCategory, "Update Redaksi"],
        isEditorialOnly: true,
        isEditorialChoice: i === 0 || i % 3 === 0,
        isUrgent: i === 0,
        sourceType: "redaksi",
        editorialDesk: "Liputan Khusus"
      });
    }

    if (parsedArticles.length > 0) {
      return { articles: parsedArticles, source: "google_sheet", sheetFound: true };
    }

    return { articles: fallbackNewsArticles, source: "mock_fallback", sheetFound: false };
  } catch (error) {
    console.warn("Could not load from Google Sheets, using offline mock fallback:", error);
    return { articles: fallbackNewsArticles, source: "mock_fallback", sheetFound: false };
  }
}
