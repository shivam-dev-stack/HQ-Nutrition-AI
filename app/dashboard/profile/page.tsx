"use client";
import { use, useEffect, useState } from "react";
import {
  User,
  Target,
  Activity,
  ShieldAlert,
  Bell,
  ChevronRight,
  LogOut,
  Award,
  X,
  Plus,
} from "lucide-react";
import { useUser } from "@/src/context/UserContext";
import { apiRequest } from "@/src/lib/api";



export default function Profile() {
  const [diet, setDiet] = useState("veg");
  const [allergies, setAllergies] = useState([]);
  const [isopen, setIsOpen] = useState(false);
  const [newAllergy, setNewAllergy] = useState("");

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

const { user, loading } = useUser();

 
useEffect(() => {
    if (user) {
      setNewAllergy(user.allergies || "");
    }
  }, [user]);



  const saveProfile = () => {
    // Implement the logic to save the profile data to the backend
    const profileData = {
      diet,
      allergies,
      height: 170, // Example height
      weight: 82,  // Example weight
      age: 28,     // Example age
      activity_level: "moderate", // Example activity level
      current_goal: "muscle_gain", // Example goal
      // Add other profile fields as needed
    };
   console.log("Saving profile data:", profileData);
    // You can use fetch or axios to send this data to your backend API
    const token = localStorage.getItem("access");
    const {data, error} = apiRequest("/api/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    if(data) {
      console.log("Profile saved successfully:", data);
      setIsOpen(false);
    } else {
      console.error("Error saving profile:", error);
    }

  };

   if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user data available.</div>;


  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 font-sans antialiased pb-24 selection:bg-emerald-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className="lg:col-span-1 space-y-4 sticky lg:top-6">
            <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-md overflow-hidden relative text-center flex flex-col items-center">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative mb-4 group z-10">
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-slate-950 text-3xl font-black shadow-xl ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-300">
                  S
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-xl shadow-md border-2 border-slate-900">
                  <Award size={14} className="fill-slate-950" />
                </div>
              </div>

              <h1 className="text-xl font-black tracking-tight text-white z-10">
                {user.username}
              </h1>
              {/* <p className="text-xs text-emerald-400/90 font-semibold tracking-wider uppercase mt-1 z-10">
                ML & AI Builder
              </p> */}
              
              <button
                onClick={() => setIsOpen(true)}
                className="mt-4 w-full sm:w-auto lg:w-full px-5 py-2.5 text-xs font-bold tracking-wide text-white bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 rounded-xl backdrop-blur-md transition-all shadow-sm z-10">
                Edit Profile Config
              </button>
            </header>

            {/* QUICK STATS - FLOATING STACK INSTEAD OF OVERLAP FOR DESKTOP SIDEBAR */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-100/80 shadow-sm flex items-center gap-3.5">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                  <Target size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    Current Goal
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {user.goal}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100/80 shadow-sm flex items-center gap-3.5">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
                  <Activity size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                    Daily Limit
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    1,800 kcal
                  </span>
                </div>
              </div>
            </div>
          </div>

          <main className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between min-h-[160px]">
                <div>
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <span>🥗</span> Dietary Preference
                  </h2>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: user.diet_preference, label: user.diet_preference, activeClass: "bg-emerald-50 text-emerald-700 border-emerald-500 font-bold" },
                      
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setDiet(item.id)}
                        className={`py-2.5 px-1 rounded-xl border text-[11px] sm:text-xs transition-all text-center ${
                          diet === item.id
                            ? item.activeClass
                            : "border-slate-100 text-slate-600 bg-white hover:border-slate-300 font-medium"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-4 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  AI engine updates system query constraints based on selection tags.
                </p>
              </section>

              <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 min-h-[160px] flex flex-col justify-between">
                <div>
                  <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-slate-400" />
                    Allergies & Avoidances
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mb-4 max-h-[75px] overflow-y-auto no-scrollbar">
                    {allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="bg-slate-50 text-slate-700 text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-xl border border-slate-100 flex items-center gap-1 shadow-sm transition-all"
                      >
                        {allergy}
                        <button
                          onClick={() => setAllergies(allergies.filter((a) => a !== allergy))}
                          className="p-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-md transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {allergies.length === 0 && (
                      <span className="text-xs text-slate-400 font-medium italic py-1">No restrictions declared.</span>
                    )}
                  </div>
                </div>
                
                <form onSubmit={handleAddAllergy} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex. Soy, Gluten..."
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="flex-1 bg-slate-50 text-xs border border-slate-200/80 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center flex-shrink-0"
                  >
                    <Plus size={16} />
                  </button>
                </form>
              </section>

              <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sm:col-span-1">
                <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider p-4 pb-1">
                  ⚙️ Preferences & Targets
                </h2>
                <div className="divide-y divide-slate-100/70">
                  <div className="flex justify-between items-center p-4 hover:bg-slate-50/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">Meal Reminders</span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-emerald-600 h-4 w-4 rounded-md cursor-pointer"
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 hover:bg-slate-50/40 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-700">Edit Macro Targets</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  <button className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50/50 transition-colors font-bold text-xs text-left">
                    <LogOut size={16} />
                    <span>Logout Session</span>
                  </button>
                </div>
              </section>

              <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm sm:col-span-1 flex flex-col justify-between">
                <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span>📏</span> Baseline Metrics
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/60 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Age</p>
                    <p className="text-sm sm:text-base font-black text-slate-800 mt-0.5">{user.age}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/60 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Hgt</p>
                    <p className="text-sm sm:text-base font-black text-slate-800 mt-0.5">{user.height}<span className="text-[10px] font-bold text-slate-400 ml-0.5">cm</span></p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100/60 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">Wgt</p>
                    <p className="text-sm sm:text-base font-black text-slate-800 mt-0.5">{user.weight}<span className="text-[10px] font-bold text-slate-400 ml-0.5">kg</span></p>
                  </div>
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>

      {isopen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-hidden border border-slate-100 animate-scale-in">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black tracking-tight">Edit Profile Configurations</h2>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Update biometric details for exact AI scaling</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={saveProfile} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Profile Name</label>
                <input type="text" defaultValue="Shivam" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white" />
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Age</label>
                  <input type="number" defaultValue={28} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-center focus:outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Height (cm)</label>
                  <input type="number" defaultValue={170} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-center focus:outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weight (kg)</label>
                  <input type="number" defaultValue={82} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-center focus:outline-none focus:border-emerald-500 focus:bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Activity Level</label>
                  <select defaultValue="moderate" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white">
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="high">Highly Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Current Goal</label>
                  <select defaultValue="muscle_gain" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:bg-white">
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 active:scale-95 shadow-md">Save Config</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}