"use client";
import { useEffect, useState } from "react";
import { ChevronRight, Flame, Clock3, Search, Refrigerator, Sparkles } from "lucide-react";
import Image from "next/image";
import chilla from "@/src/assets/chilla.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function callProfile() {
      const isBrowser = typeof window !== 'undefined';
      const token = isBrowser ? localStorage.getItem("access") : null;

      if (!token) {
        console.warn("No access token found or executing on the server.");
        return; 
      }

      try {
        const profile = await axios.get("http://localhost:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = profile.data;
        setProfileData(data);
        
        // Dynamic Setup Configuration Redirect Gate
        if (!data.name || !data.age || !data.weight || !data.height || !data.activity_level) {
          router.push("/dashboard/profile");
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    }

    callProfile();
  }, [router]); 

  return (
    <main className="min-h-screen bg-slate-50/70 text-slate-800 antialiased pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-6 space-y-6">
        
        
        <section className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 shadow-sm bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-center relative z-10">
            {/* Left Block: Greetings and Stats */}
            <div className="space-y-4 text-center lg:text-left">
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  👋 Hi {profileData?.name || "Shivam"}!
                </h1>
                <p className="text-xs text-emerald-400 font-medium tracking-wide mt-1 uppercase">
                  Fuel Budget Overview Dashboard
                </p>
              </div>

              {/* Incremental Grid Metrics (Macros) */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <MacroBar label="Protein" filled={3} activeColor="bg-red-400" total="120g" current="45g" />
                <MacroBar label="Carbs" filled={5} activeColor="bg-amber-400" total="200g" current="110g" />
                <MacroBar label="Fats" filled={2} activeColor="bg-blue-400" total="60g" current="35g" />
              </div>
            </div>

            {/* Right Block: Donut Chart Frame */}
            <div className="flex justify-center flex-shrink-0">
              <div className="relative w-52 h-52 flex items-center justify-center">
                <svg viewBox="0 0 288 288" className="block h-full w-full -rotate-90">
                  <circle cx="144" cy="144" r="110" stroke="rgba(255,255,255,0.06)" strokeWidth="16" fill="none" />
                  <circle 
                    cx="144" cy="144" r="110" 
                    stroke="#10b981" strokeWidth="16" fill="none" 
                    strokeLinecap="round" strokeDasharray="691" strokeDashoffset="230" 
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <h2 className="text-3xl font-black text-white leading-none">
                      1,200
                      <span className="text-sm font-bold text-slate-400 block mt-1 tracking-wide uppercase">
                        / 1,800 kcal left
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start ">
          
          <section className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🎯 Quick System Operations
            </h2>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Refrigerator size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">What's in my Fridge?</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Auto detect and index raw stock ingredients</p>
                </div>
              </div>
              <Link
                href="/dashboard/fridge"
                className="w-full bg-slate-950 text-white font-bold text-xs py-3 rounded-xl shadow-sm text-center block hover:bg-slate-800 transition-all active:scale-95"
              >
                Launch Scanner Grid
              </Link>
            </div>

            {/* Micro Tags Horizontal Filter Layer */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <Tag text="#Breakfast" />
              <Tag text="#Low-Calorie" />
              <Tag text="#High-Protein" />
              <button className="h-8 w-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0 hover:border-slate-400 transition-colors">
                <ChevronRight size={14} className="text-slate-500" />
              </button>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🍱 Today's Featured AI Recommendation
            </h2>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col md:flex-row group cursor-pointer">
              <div className="w-full md:w-1/2 h-52 sm:h-56 md:h-64 relative bg-slate-100 overflow-hidden flex-shrink-0">
                <Image
                  src={chilla}
                  alt="Oats Chilla"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col justify-center space-y-4 flex-1">
                <div>
                  <span className="text-[10px] font-extrabold bg-amber-50 text-amber-700 px-2 py-0.5 rounded uppercase">
                    Balanced Target Pick
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight leading-tight">
                    High-Protein<br />Oats Chilla
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-50 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Flame size={16} className="text-orange-500 fill-orange-500" />
                    <span>250 kcal</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <div className="flex items-center gap-1.5">
                    <Clock3 size={16} className="text-slate-400" />
                    <span>12 Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

interface MacroBarProps {
  label: string;
  filled: number;
  activeColor: string;
  total: string;
  current: string;
}

function MacroBar({ label, filled, activeColor, total, current }: MacroBarProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex-1 min-w-[140px] flex flex-col justify-between gap-2 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs font-black tracking-wider uppercase opacity-60 text-slate-400">{label}</span>
        <span className="text-xs font-bold text-slate-200">{current} <span className="text-[10px] text-slate-400 font-medium">/ {total}</span></span>
      </div>
      
      {/* Modern Horizontal Segment Blocks */}
      <div className="flex gap-0.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-sm transition-all ${
              index < filled ? activeColor : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface TagProps {
  text: string;
}

function Tag({ text }: TagProps) {
  return (
    <button className="rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors px-3 py-1.5 text-slate-600 font-bold text-xs whitespace-nowrap">
      {text}
    </button>
  );
}