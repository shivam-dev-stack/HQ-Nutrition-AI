'use client';
import React, { useState } from 'react';
import { User, Target, Activity, ShieldAlert, Bell, ChevronRight, LogOut, Award } from 'lucide-react';

export default function Profile() {
  const [diet, setDiet] = useState('veg');
  const [allergies, setAllergies] = useState(['Gluten', 'Peanuts']);

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
        
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Shivam</h1>
        <p className="text-xs text-slate-400 font-medium">ML & AI Builder</p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Target size={20} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Goal</span>
              <span className="text-sm font-bold text-slate-700">Muscle Gain</span>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Activity size={20} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Daily Limit</span>
              <span className="text-sm font-bold text-slate-700">1,800 kcal</span>
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
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">🥗 Dietary Preference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'veg', label: 'Pure Veg', color: 'border-emerald-500 text-emerald-700 bg-emerald-50/50 hover:shadow-md transition-all duration-200' },
              { id: 'egg', label: 'Eggitarian', color: 'border-amber-500 text-amber-700 bg-amber-50/50 hover:shadow-md transition-all duration-200' },
              { id: 'nonveg', label: 'Non-Veg', color: 'border-red-500 text-red-700 bg-red-50/50 hover:shadow-md transition-all duration-200' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setDiet(item.id)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                  diet === item.id ? item.color : 'border-slate-100 text-slate-600 bg-white hover:border-slate-300'
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
            <h2 className="text-xs font-bold uppercase tracking-wider">⚠️ Allergies / Avoid Ingredients</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy) => (
              <span key={allergy} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1">
                {allergy}
                <button 
                  onClick={() => setAllergies(allergies.filter(a => a !== allergy))}
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
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider p-4 pb-1">⚙️ Preferences & Settings</h2>
          
          <div className="divide-y divide-slate-100">
            <div className="flex justify-between items-center p-4 hover:bg-slate-50/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Daily Meal Reminders</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 h-4 w-4 rounded" />
            </div>

            <div className="flex justify-between items-center p-4 hover:bg-slate-50/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <User size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Edit Macro Targets</span>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </div>

            <button className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50/50 transition-colors font-semibold text-sm text-left">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      </main>
      </div>
    </div>
    </div>
  );
}