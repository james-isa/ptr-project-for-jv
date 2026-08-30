import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Compass, 
  MapPin, 
  RefreshCw, 
  ExternalLink,
  MessageSquareQuote
} from "lucide-react";
import { LanguageType } from "../types";

interface Message {
  role: "user" | "assistant";
  text: string;
  time: string;
}

interface AiNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageType;
}

export const AiNavigatorModal: React.FC<AiNavigatorModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: currentLang === "id" 
        ? "Halo! Saya AI Navigator Portal Tangerang Raya. Ada yang bisa saya bantu seputar berita terkini, rekomendasi kuliner UMKM, panduan wisata ke Bandara Soetta, layanan publik darurat, atau properti di Tangerang Raya?"
        : "Hello! I am your Greater Tangerang AI Navigator. How can I assist you with local news, authentic MSME culinary spots, Soekarno-Hatta airport transit, public emergency contacts, or real estate listings?",
      time: "Sekarang",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Rekomendasi kuliner legendaris Pasar Lama",
    "Cara transit ke Bandara Soetta dari BSD",
    "Jadwal Samsat & SIM Keliling hari ini",
    "Pilihan properti rumah tapak dekat stasiun KRL",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputPrompt("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await response.json();
      const botMsg: Message = {
        role: "assistant",
        text: data.answer || "Maaf, terjadi kendala saat memproses jawaban. Silakan coba kembali.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: Message = {
        role: "assistant",
        text: "Maaf, saat ini layanan AI sedang dalam mode pemeliharaan. Silakan gunakan fitur pencarian langsung di homepage atau hubungi hotline 112 untuk kebutuhan darurat.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-red-700 via-rose-800 to-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-none">
                AI Navigator Tangerang Raya
              </h3>
              <p className="text-[11px] text-red-200 mt-1">
                Asisten Cerdas Wisata, Berita & Layanan Publik
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-slate-50 text-xs sm:text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] p-3.5 rounded-2xl shadow-xs leading-relaxed space-y-1 ${
                  msg.role === "user"
                    ? "bg-red-600 text-white rounded-br-xs font-medium"
                    : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs whitespace-pre-line"
                }`}
              >
                <div>{msg.text}</div>
                <span
                  className={`text-[9px] block text-right font-normal ${
                    msg.role === "user" ? "text-red-200" : "text-slate-400"
                  }`}
                >
                  {msg.time}
                </span>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 italic">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-600" />
                <span>AI Navigator sedang menganalisis data Tangerang Raya...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-400 font-bold shrink-0">Tanya Cepat:</span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-medium whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder={
              currentLang === "id"
                ? "Tanyakan apa saja tentang Tangerang Raya..."
                : "Ask anything about Greater Tangerang..."
            }
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-600"
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
