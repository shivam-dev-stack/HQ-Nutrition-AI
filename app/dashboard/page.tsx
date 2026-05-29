'use client';
import {
  ChevronRight,
  Flame,
  Clock3,
} from "lucide-react";
import Image from "next/image";
import chilla from "@/src/assets/chilla.png";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">

      <div className="mx-10 ">

      <section className="bg-white rounded-3xl border p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-8">👋 Hi Shivam!</h1>

        <div className="flex justify-center">
          <div className="relative h-72 w-72">
            <svg className="h-full w-full -rotate-90">
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

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-green-600">
                1200
                <span className="text-xl text-gray-600"> / 1800</span>
              </h2>

              <p className="mt-2 text text-gray-500">
                kcal left
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
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

      {/* Quick Actions */}
      <section className="bg-white rounded-3xl border p-6 shadow-sm mt-6">
        <h2 className="text-2xl font-bold mb-5">
          🎯 QUICK ACTIONS
        </h2>

        <div className="flex items-center justify-between rounded-3xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-4">
            <span className="text-3xl">⚡</span>

            <span className="text-xl font-semibold">
              What's in my Fridge?
            </span>
          </div>

          <button className="rounded-full bg-green-600 px-6 py-3 hover:cursor-pointer text-white font-semibold">
            Go
          </button>
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

      <section className="bg-white rounded-3xl border p-6 shadow-sm mt-6">
        <h2 className="text-2xl font-bold mb-5">
          🍱 TODAY'S SUGGESTION
        </h2>

        <div className="overflow-hidden rounded-2xl border">
          <div className="md:flex">
            <Image
              src={chilla}
              alt="Oats Chilla"
              className="h-64 w-full object-cover md:w-1/2"
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

function MacroBar({
  label,
  filled,
  activeColor,
  textColor,
}: MacroBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold ${textColor}`}>
        {label}:
      </span>

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




