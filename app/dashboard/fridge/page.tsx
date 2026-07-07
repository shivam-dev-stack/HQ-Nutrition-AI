"use client";
import { useState, useRef } from "react";
import {
  Search,
  Sparkles,
  CheckCircle2,
  Camera,
  X,
  Loader2,
} from "lucide-react";

const INGREDIENTS_DATA = {
  "Veggies & Fruits": [
    { id: "tomato", name: "Tomato", emoji: "🍅" },
    { id: "potato", name: "Potato", emoji: "🥔" },
    { id: "spinach", name: "Spinach", emoji: "🥬" },
    { id: "mango", name: "Mango", emoji: "🥭" },
  ],
  "Dairy & Protein": [
    { id: "paneer", name: "Paneer", emoji: "🧀" },
    { id: "milk", name: "Milk", emoji: "🥛" },
    { id: "eggs", name: "Eggs", emoji: "🥚" },
  ],
  "Grains & Staples": [
    { id: "oats", name: "Oats", emoji: "🥣" },
    { id: "wheat", name: "Wheat", emoji: "🌾" },
    { id: "rice", name: "Rice", emoji: "🍚" },
  ],
};

export default function Fridge() {
  const [selected, setSelected] = useState([]);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  const toggleIngredient = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file); // FIXED: Added missing state update so handleAnalyze can work
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      setIsAnalyzing(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("OCR Response:", data);

      // Auto-select detected ingredients if returned in an array format
      if (data.ingredients) {
        setSelected((prev) => [...new Set([...prev, ...data.ingredients])]);
      }

      setPreview(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Analysis Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
          <header className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm lg:sticky lg:top-6 lg:h-fit space-y-4">
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                <span>🥕</span> My Smart Fridge
              </h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Select items to instantly calculate health macros
              </p>
            </div>

            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients..."
                className="w-full bg-slate-50 pl-9 pr-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              onClick={handleCameraClick}
              className="hidden lg:flex w-full bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-600 rounded-xl p-3 text-xs font-bold items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Camera size={16} />
              Scan Fridge Image
            </button>

            {selected.length > 0 && (
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>{selected.length} items staged to cook</span>
              </div>
            )}
          </header>

          <main className="space-y-6">
            {Object.entries(INGREDIENTS_DATA).map(([category, items]) => {
              const filteredItems = items.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()),
              );

              if (filteredItems.length === 0) return null;

              return (
                <div
                  key={category}
                  className="bg-white p-5 rounded-3xl border border-slate-100/80 shadow-sm space-y-4"
                >
                  <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    {category}
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filteredItems.map((item) => {
                      const isSelected = selected.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleIngredient(item.id)}
                          className={`group p-4 rounded-2xl flex flex-col items-center justify-center border transition-all duration-200 relative ${
                            isSelected
                              ? "bg-emerald-50/60 border-emerald-500 shadow-sm scale-[0.98]"
                              : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 text-emerald-600 bg-white rounded-full shadow-sm">
                              <CheckCircle2
                                size={14}
                                fill="currentColor"
                                className="text-white fill-emerald-600"
                              />
                            </div>
                          )}
                          <span className="text-3xl mb-2 select-none group-hover:scale-110 transition-transform">
                            {item.emoji}
                          </span>
                          <span
                            className={`text-xs font-bold ${isSelected ? "text-emerald-700" : "text-slate-600"}`}
                          >
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </main>
        </div>
      </div>

      <button
        onClick={handleCameraClick}
        className="fixed bottom-24 right-4 md:right-6 lg:hidden z-40 h-14 w-14 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-slate-700"
      >
        <Camera size={22} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleImageSelect}
      />

      {preview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-sm w-full border border-slate-100 shadow-2xl animate-scale-in">
            <div className="relative w-full h-64 bg-slate-900 flex items-center justify-center">
              <img
                src={preview}
                alt="Fridge Capture"
                className="w-full h-full object-cover"
              />
              <button
                disabled={isAnalyzing}
                onClick={() => {
                  setPreview(null);
                  setSelectedFile(null);
                }}
                className="absolute top-3 right-3 p-1.5 bg-slate-900/60 hover:bg-slate-900 text-white rounded-xl backdrop-blur-sm transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  Analyze Fridge Image?
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Gemini Vision will automatically parse your available stock
                  items.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                  }}
                  disabled={isAnalyzing}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Retake
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-100 disabled:opacity-80 transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Analyze
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="fixed bottom-16 md:bottom-4 left-0 right-0 p-4 md:pb-20 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent pt-8 z-40 flex justify-center pointer-events-none">
          <button
            onClick={() => console.log("Finding recipes for:", selected)}
            className="w-full max-w-md bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] pointer-events-auto cursor-pointer"
          >
            Find Healthy Recipes ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}