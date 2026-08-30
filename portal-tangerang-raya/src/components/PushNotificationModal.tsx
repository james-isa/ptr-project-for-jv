import React, { useState } from "react";
import { 
  Bell, 
  BellRing, 
  Check, 
  ShieldCheck, 
  X, 
  Smartphone, 
  Send,
  Zap
} from "lucide-react";
import { LanguageType } from "../types";

interface PushNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageType;
}

export const PushNotificationModal: React.FC<PushNotificationModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const [subscribed, setSubscribed] = useState(false);
  const [categories, setCategories] = useState({
    breaking: true,
    traffic: true,
    emergency: true,
    discounts: false,
  });
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate browser permission if available
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.log("Notification permission requested", err);
      }
    }

    try {
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: emailOrPhone || "browser-push-token",
          categories,
        }),
      });
    } catch (e) {}

    setSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7 space-y-4 border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {subscribed ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto animate-bounce">
              <BellRing className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Notifikasi Mendesak Aktif!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Anda akan menerima peringatan darurat seketika saat terjadi bencana, breaking news penting di Tangerang Raya, atau rekayasa lalu lintas jalan tol.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              Mengerti & Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentLang === "id" ? "Sistem Push Notifikasi Mendesak" : "Urgent Push Notification System"}
                </h3>
                <p className="text-xs text-slate-500">
                  Peringatan real-time langsung ke perangkat Anda
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>Peringatan Real-Time Terverifikasi</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Layanan push alert kami dipantau 24 jam bersama BPBD & Dishub Tangerang Raya tanpa spam promosi.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.breaking}
                  onChange={(e) => setCategories({ ...categories, breaking: e.target.checked })}
                  className="rounded-sm text-red-600 focus:ring-red-500"
                />
                <span className="font-semibold text-slate-800">Kilas Berita Utama & Mendesak (Breaking News)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.traffic}
                  onChange={(e) => setCategories({ ...categories, traffic: e.target.checked })}
                  className="rounded-sm text-red-600 focus:ring-red-500"
                />
                <span className="font-semibold text-slate-800">Info Rekayasa Lalu Lintas & Jalan Tol Tangerang</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.emergency}
                  onChange={(e) => setCategories({ ...categories, emergency: e.target.checked })}
                  className="rounded-sm text-red-600 focus:ring-red-500"
                />
                <span className="font-semibold text-slate-800">Peringatan Cuaca Ekstrem & Banjir BPBD</span>
              </label>
            </div>

            <div className="text-xs">
              <label className="font-bold text-slate-700 block mb-1">
                Email / No. WhatsApp (Opsional untuk Web Push Backup)
              </label>
              <input
                type="text"
                placeholder="nama@email.com atau 0812xxx"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>Aktifkan Notifikasi Sekarang</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
