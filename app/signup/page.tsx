"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Mail, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Logo from "@/src/components/logo";
import api from "@/src/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (authError) setAuthError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAuthError("Passwords do not match!");
      return;
    }
    
    try {
      setIsLoading(true);
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const response = await api.post("/api/register/", payload);
      console.log("Signup successful:", response.data);
      router.push("/login");
    } catch (error: any) {
      setAuthError(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 flex flex-col lg:flex-row">
      
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex items-center gap-2">
          <Logo />
        </div>

        <div className="space-y-6 relative z-10 my-auto">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-white/5 uppercase tracking-wider">
            <Sparkles size={12} className="fill-emerald-400" /> Start Your Health Journey
          </span>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
            Create your personalized <span className="text-emerald-400">wellness account</span>
          </h1>
          <p className="text-xs xl:text-sm text-slate-400 font-medium leading-relaxed max-w-md">
            Clear out inventory bottlenecks. Drop images of your kitchen fridge, instantly map macro profiles, and receive Gemini-driven culinary blueprints.
          </p>

          <div className="space-y-3 pt-4 border-t border-white/5 max-w-sm">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/5 rounded-xl text-emerald-400 mt-0.5"><Zap size={16} /></div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                <span className="font-bold text-white block">Vision Scanner Ready</span> Auto-segment protein, carb, and fats metrics via snapshots.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/5 rounded-xl text-amber-400 mt-0.5"><ShieldCheck size={16} /></div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                <span className="font-bold text-white block">Allergen Safety Filters</span> Dynamic macro controls block ingredients matching active risk flags.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[10px] font-bold text-slate-500 relative z-10">
          © 2026 QuickChefAI Core Monolith Engine. All system modules running safe.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 relative">
        
        <div className="lg:hidden mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 shadow-xl p-6 sm:p-8 transition-all">
          
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 lg:hidden">
              Start your health journey
            </h2>
            <h2 className="text-xl font-black tracking-tight text-slate-950 hidden lg:block">
              Get Started Now
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Setup account configurations to sync custom biometrics.
            </p>
          </div>

          {authError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center">
              {authError}
            </div>
          )}


          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
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
                  placeholder="Create username" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="name@domain.com" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
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
                  placeholder="Create password" 
                  className="w-full bg-slate-50 pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block font-medium">Minimum character target length is 8 string characters</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  required 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Confirm password" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-1.5 disabled:opacity-80"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              {isLoading ? "Provisioning..." : "Create Account Config"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs font-medium text-slate-400">
            Already a member?
            <Link href="/login" className="ml-1 font-bold text-emerald-600 hover:text-emerald-700 underline transition-colors">
              Login Session
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}