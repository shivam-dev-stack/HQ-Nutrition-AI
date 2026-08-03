"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Loader2, 
  Mail, 
  Scale, 
  Ruler, 
  Calendar, 
  Utensils, 
  AlertTriangle, 
  Target 
} from "lucide-react";
import Logo from "@/src/components/logo";
import api from "@/src/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    diet_preference: "veg",
    allergies: "",
    goal: "weight_loss",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (authError) setAuthError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // API request body formatted with demographic & dietary profile fields
      const response = await api.post("/api/register/", {
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
      });

      console.log("Registration successful:", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      setAuthError(
        error.response?.data?.detail || "Registration failed. Please check your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 flex flex-col lg:flex-row">
      
      {/* Left Branding Side - Full Desktop View */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex items-center gap-2">
          <Logo />
        </div>

        <div className="space-y-6 relative z-10 my-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/5 uppercase tracking-wider">
            <Sparkles size={12} className="fill-emerald-400" /> Start Your Onboarding
          </span>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
            Personalize your <span className="text-emerald-400">AI Nutrition</span>
          </h1>
          <p className="text-xs xl:text-sm text-slate-400 font-medium leading-relaxed max-w-md">
            Create an account to automatically calculate precise calorie target bounds, filter out personal food allergens, and calibrate smart recipes.
          </p>

          <div className="space-y-3 pt-4 border-t border-white/5 max-w-sm">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/5 rounded-xl text-emerald-400 mt-0.5"><Zap size={16} /></div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                <span className="font-bold text-white block">Calibrated Diet Engines</span> Dynamic recalculation based on explicit metrics and active goals.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/5 rounded-xl text-amber-400 mt-0.5"><ShieldCheck size={16} /></div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                <span className="font-bold text-white block">Allergy Protection Filter</span> Automated checking against target recipe ingredients.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[10px] font-bold text-slate-500 relative z-10">
          © 2026 QuickChefAI Engine. All user health profile parameters encrypted.
        </p>
      </div>

      {/* Right Registration Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 relative overflow-y-auto">
        
        <div className="lg:hidden mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200/60 shadow-xl p-6 sm:p-8 transition-all">
          
          <div className="text-center sm:text-left space-y-1 mb-6">
            <h2 className="text-2xl font-black tracking-tight text-slate-950">
              Create Your Profile
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Enter your authentication and personal fitness details to set up your profile.
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center animate-fade-in">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Account Credentials Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    name="username" 
                    required 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="shivam_dev" 
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="name@example.com" 
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Create strong password" 
                  className="w-full bg-slate-50 pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            {/* Health & Metrics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Age (Years)</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    name="age" 
                    required 
                    min="10"
                    max="120"
                    value={formData.age} 
                    onChange={handleChange} 
                    placeholder="26" 
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Weight (kg)</label>
                <div className="relative">
                  <Scale className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    name="weight" 
                    required 
                    step="0.1"
                    value={formData.weight} 
                    onChange={handleChange} 
                    placeholder="70" 
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Height (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input 
                    type="number" 
                    name="height" 
                    required 
                    value={formData.height} 
                    onChange={handleChange} 
                    placeholder="175" 
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                  />
                </div>
              </div>
            </div>

            {/* Diet Preferences & Goals Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Dietary Preference</label>
                <div className="relative">
                  <Utensils className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <select
                    name="diet_preference"
                    value={formData.diet_preference}
                    onChange={handleChange}
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100 appearance-none"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="non_veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Fitness Goal</label>
                <div className="relative">
                  <Target className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100 appearance-none"
                  >
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="endurance">Endurance & Health</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Allergies Text Field */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Allergies or Intolerances (Optional)
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input 
                  type="text" 
                  name="allergies" 
                  value={formData.allergies} 
                  onChange={handleChange} 
                  placeholder="e.g. Peanuts, Dairy, Gluten, Soy" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-1.5 disabled:opacity-80"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              {isLoading ? "Creating Profile..." : "Register Profile"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-medium text-slate-400">
            Already have an account?
            <Link href="/login" className="ml-1 font-bold text-emerald-600 hover:text-emerald-700 underline transition-colors">
              Sign In
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}