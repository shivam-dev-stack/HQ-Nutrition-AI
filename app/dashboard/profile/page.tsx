"use client";
import React, { useState } from "react";
import {
  User,
  Target,
  Activity,
  ShieldAlert,
  Bell,
  ChevronRight,
  LogOut,
  Award,
} from "lucide-react";

export default function Profile() {
  const [diet, setDiet] = useState("veg");
  const [allergies, setAllergies] = useState(["Gluten", "Peanuts"]);
  const [isopen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 text-slate-800">
      <div className="max-w-6xl mx-auto lg:px-8 pb-36">
        {/* ZONE 1: USER HERO & QUICK STATS */}
        <header className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white p-6 md:p-8 lg:p-10 rounded-b-3xl shadow-sm border-b border-slate-100 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-inner shadow-xl">
              S
            </div>
            <div className="absolute bottom-0 right-0 bg-amber-400 text-slate-900 p-1.5 rounded-full border-2 border-white shadow">
              <Award size={16} />
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Shivam
          </h1>
          <p className="text-xs text-slate-400 font-medium">ML & AI Builder</p>
          <button
            className="text-white text-sm font-semibold px-4 py-2 mt-3 rounded-xl bg-emerald-200 hover:bg-emerald-700 transition-colors shadow-sm"
            onClick={() => setIsOpen(!isopen)}
          >
            Edit
          </button>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Target size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Current Goal
                </span>
                <span className="text-sm font-bold text-slate-700">
                  Muscle Gain
                </span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Activity size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Daily Limit
                </span>
                <span className="text-sm font-bold text-slate-700">
                  1,800 kcal
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-5 mt-5">
          {/* ZONE 2: PREFERENCES & SMART FILTERS */}
          <main className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dietary Prefs */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  🥗 Dietary Preference
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "veg",
                      label: "Pure Veg",
                      color:
                        "border-emerald-500 text-emerald-700 bg-emerald-50/50 hover:shadow-md transition-all duration-200",
                    },
                    {
                      id: "egg",
                      label: "Eggitarian",
                      color:
                        "border-amber-500 text-amber-700 bg-amber-50/50 hover:shadow-md transition-all duration-200",
                    },
                    {
                      id: "nonveg",
                      label: "Non-Veg",
                      color:
                        "border-red-500 text-red-700 bg-red-50/50 hover:shadow-md transition-all duration-200",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setDiet(item.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        diet === item.id
                          ? item.color
                          : "border-slate-100 text-slate-600 bg-white hover:border-slate-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies Section */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-1.5 mb-3 text-slate-400">
                  <ShieldAlert size={16} className="text-slate-400" />
                  <h2 className="text-xs font-bold uppercase tracking-wider">
                    ⚠️ Allergies / Avoid Ingredients
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1"
                    >
                      {allergy}
                      <button
                        onClick={() =>
                          setAllergies(allergies.filter((a) => a !== allergy))
                        }
                        className="text-slate-400 hover:text-slate-600 font-bold ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button className="border border-dashed border-slate-300 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-xl hover:border-slate-400 hover:text-slate-600 transition-colors">
                    + Add
                  </button>
                </div>
              </div>

              {/* App Settings Menu */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider p-4 pb-1">
                  ⚙️ Preferences & Settings
                </h2>

                <div className="divide-y divide-slate-100">
                  <div className="flex justify-between items-center p-4 hover:bg-slate-50/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">
                        Daily Meal Reminders
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-emerald-500 h-4 w-4 rounded"
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 hover:bg-slate-50/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">
                        Edit Macro Targets
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-slate-400" />
                  </div>

                  <button className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50/50 transition-colors font-semibold text-sm text-left">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-700">📏 Body Metrics</h2>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400">Age</p>
                    <p className="font-bold">28</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400">Height</p>
                    <p className="font-bold">170 cm</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-400">Weight</p>
                    <p className="font-bold">82 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {isopen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden p-6">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>

              <p className="text-sm text-slate-500 mt-1">
                Update your nutrition preferences
              </p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue="Shivam"
                  className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Dietary Preference
                </label>
                <select
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="veg">Pure Veg</option>
                  <option value="egg">Eggitarian</option>
                  <option value="nonveg">Non-Veg</option>
                </select>
              </div>
              {/* Additional form fields for allergies, body metrics, etc. can be added here */}
              <input
                type="text"
                placeholder="Add Allergy"
                className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

              <div className="grid grid-cols-3 gap-3">
                {/* age */}

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Age
                  </label>
                  <input
                    type="number"
                    defaultValue={28}
                    className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                {/* height in cm */}

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    defaultValue={170}
                    className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                {/* weight in kg */}

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    defaultValue={82}
                    className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* activity level */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Activity Level
                  </label>
                  <select
                    defaultValue="moderate"
                    className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="high">Highly Active</option>
                  </select>
                </div>

                {/* current goal */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Current Goal
                  </label>
                  <select
                    defaultValue="muscle_gain"
                    className="mt-1 block w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
