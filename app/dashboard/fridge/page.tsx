"use client";
import React, { useState, useRef } from "react";
import { Search, Sparkles, CheckCircle2, Camera } from "lucide-react";
import Image from "next/image";

// Mock Data for Ingredients
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
 const [preview, setPreview] = useState<string | null>(null);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleIngredient = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  

  const handleCameraClick = () => {
  console.log("Camera clicked");
  fileInputRef.current?.click();
};

  

const handleImageSelect = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  console.log("FILE:", file);

  if (!file) return;

  const url = URL.createObjectURL(file);

  console.log("URL:", url);

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

    console.log(data);

    setPreview(null);
  } catch (error) {
    console.error(error);
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50/30 text-slate-800">
      <div className="max-w-7xl  mx-auto lg:p-6">
        <div className="lg:grid lg:grid-cols-[320px_1fr] lg:gap-6">
          {/* HEADER SECTION */}
          <header
            className="
                bg-white
                p-5
                border-b
                border-slate-100
                lg:rounded-3xl
                lg:sticky
                lg:top-6
                lg:h-fit
                lg:border
                lg:shadow-sm">

            <h1 className="text-xl font-bold tracking-tight mb-3">
              🥕 My Smart Fridge
            </h1>

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search ingredients (e.g., Paneer, Oats)..."
                className="w-full bg-slate-100 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all border border-transparent focus:border-emerald-500"
              />
            </div>

            {/* Selection Counter */}
            {selected.length > 0 && (
              <div className="mt-3 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 size={14} />
                <span>{selected.length} items selected to cook with</span>
              </div>
            )}
          </header>

          {/* INGREDIENTS GRID */}
          <main className="p-4 lg:p-0 space-y-8">
            {Object.entries(INGREDIENTS_DATA).map(([category, items]) => (
              <div key={category}>
                <h2 className="mx-5 mb-4 text-sm font-bold text-slate-600">
                  {category}
                </h2>

                <div
                  className="mx-5 grid
                              grid-cols-2
                              sm:grid-cols-3
                              md:grid-cols-4
                              xl:grid-cols-5
                              2xl:grid-cols-6
                              gap-4">
                  {items.map((item) => {
                    const isSelected = selected.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleIngredient(item.id)}
                        className={`group
                                      p-4
                                      rounded-2xl
                                      flex
                                      flex-col
                                      items-center
                                      justify-center
                                      border
                                      relative
                                      transition-all
                                      duration-200
                                      ${
                                        isSelected
                                          ? "bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-500 shadow-md scale-[0.98]"
                                          : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md"
                                      }
                                    `}
                      >
                        {/* Checkmark badge for selected items */}
                        {isSelected && (
                          <div className="absolute top-1 right-1 text-emerald-600 bg-white rounded-full">
                            <CheckCircle2
                              size={14}
                              fill="currentColor"
                              className="text-white fill-emerald-600"
                            />
                          </div>
                        )}
                        <span className="text-4xl mb-2 select-none transition-transform group-hover:scale-110">
                          {item.emoji}
                        </span>
                        <span
                          className={`text-xs font-semibold ${isSelected ? "text-emerald-700" : "text-slate-700"}`}
                        >
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </main>

          <button
            onClick={handleCameraClick}
            className="
                    fixed
                    bottom-36
                    right-4
                    md:right-6
                    lg:hidden
                    z-50

                    h-16
                    w-16

                    rounded-full
                    bg-gradient-to-r
                    from-emerald-500
                    to-green-600

                    text-white
                    shadow-xl

                    flex
                    items-center
                    justify-center

                    hover:scale-105
                    active:scale-95
                    transition-all">
            <Camera size={28} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageSelect} />

{preview && (
  <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    
    <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full">
      
      <img
        src={preview}
        alt="Fridge Preview"
        className="w-full h-80 object-cover"
      />

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg">
          Analyze Fridge Photo?
        </h3>

        <p className="text-sm text-slate-500">
          We'll detect ingredients automatically.
        </p>
        <div className="flex gap-3">
          
          <button
            onClick={() => {
              setPreview(null);
              setSelectedFile(null);
            }}
            className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold"
          >
            Retake
          </button>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-semibold"
          >
            {isAnalyzing
              ? "Analyzing..."
              : "Analyze"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


          {selected.length > 0 && (
            <div className="fixed bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-8">
              <button className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98] animate-bounce-subtle">
                <Sparkles size={18} className="text-amber-400 fill-amber-400" />
                Find Healthy Recipes ({selected.length})
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
