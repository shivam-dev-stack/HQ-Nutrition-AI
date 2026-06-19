"use client";
import { ChevronRight, Flame, Clock3 } from "lucide-react";
import Image from "next/image";
import chilla from "@/src/assets/chilla.png";
import Link from "next/link";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();

  async function callProfile() {
  // 1. Safely check if window exists before accessing localStorage
  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem("access") : null;

  // 2. Early return or throw if token is missing
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
    console.log("Profile data:", profile.data);
    if (!profile.data.name || !profile.data.age || !profile.data.weight || !profile.data.height || !profile.data.activity_level) {
      router.push("/dashboard/profile");
    }
    
  } catch (error) {
    console.error("Profile fetch failed:", error);
  }
}

  callProfile();
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 pb-32 lg:pb-8">
        <section className="bg-white rounded-3xl border p-6 shadow-sm bg-gradient-to-br from-emerald-50 via-white to-green-100">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">👋 Hi Shivam!</h1>

          <div className="flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square mx-auto">
              <svg
                viewBox="0 0 288 288"
                className="block h-full w-full -rotate-90"
              >
                <circle
                  cx="144"
                  cy="144"
                  r="110"
                  stroke="#E5E7EB"
                  strokeWidth="16"
                  fill="none"
                />

                <circle
                  cx="144"
                  cy="144"
                  r="110"
                  stroke="#22C55E"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="691"
                  strokeDashoffset="230"
                />
              </svg>

              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-green-600 leading-none">
                    1200
                    <span className="text-lg md:text-xl text-gray-600">
                      {" "}
                      / 1800
                    </span>
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">kcal left</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center md:justify-between gap-4">
            <MacroBar
              label="P"
              filled={3}
              activeColor="bg-green-500"
              textColor="text-green-600"
            />

            <MacroBar
              label="C"
              filled={5}
              activeColor="bg-blue-500"
              textColor="text-blue-600"
            />

            <MacroBar
              label="F"
              filled={2}
              activeColor="bg-orange-500"
              textColor="text-orange-500"
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div>
            {/* Quick Actions */}
            <section className="bg-white rounded-3xl border p-6 shadow-sm mt-6">
              <h2 className="text-2xl font-bold mb-5">🎯 QUICK ACTIONS</h2>

              <div className="flex items-center justify-between rounded-3xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">⚡</span>

                  <span className="text-xl font-semibold">
                    What's in my Fridge?
                  </span>
                </div>

                <Link
                  href="/dashboard/fridge"
                  className="rounded-full bg-green-600 px-6 py-3 text-white font-semibold"
                >
                  Go
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-3 overflow-x-auto">
                <Tag text="#Breakfast" />
                <Tag text="#Low-Calorie" />
                <Tag text="#High-Pro" />

                <button className="h-10 w-10 hover:cursor-pointer rounded-full border flex items-center justify-center">
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section
              className="bg-white 
            rounded-3xl border 
            p-6 shadow-sm mt-6 
            bg-gradient-to-br
          from-yellow-100 to-orange-100"
            >
              <h2 className="text-2xl font-bold mb-5">🍱 TODAY'S SUGGESTION</h2>

              <div className="overflow-hidden rounded-2xl border">
                <div className="md:flex">
                  <Image
                    src={chilla}
                    alt="Oats Chilla"
                    className=" h-56
                          sm:h-64
                          lg:h-72
                          w-full
                          lg:w-1/2
                          object-cover"
                  />

                  <div className="p-5 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold">
                      High-Protein
                      <br />
                      Oats Chilla
                    </h3>

                    <div className="mt-5 flex items-center gap-5 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Flame className="text-orange-500" />
                        <span>250 kcal</span>
                      </div>

                      <div className="h-5 w-px bg-gray-300" />

                      <div className="flex items-center gap-2">
                        <Clock3 />
                        <span>12 Mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="p-6 mt-6"> </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface MacroBarProps {
  label: string;
  filled: number;
  activeColor: string;
  textColor: string;
}

function MacroBar({ label, filled, activeColor, textColor }: MacroBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold ${textColor}`}>{label}:</span>

      <div className="flex gap-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-5 rounded ${
              index < filled ? activeColor : "bg-gray-200"
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
    <button className="rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-green-700 font-medium whitespace-nowrap">
      {text}
    </button>
  );
}
