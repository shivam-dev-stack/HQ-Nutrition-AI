"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import Logo from "@/src/components/logo";
import api from "@/src/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    try {
      setIsLoading(true);
      const response = await api.post("/api/login/", formData);
      const { access } = response.data;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("access", access);
      }

      console.log("Login successful:", response.data);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      setAuthError(error.response?.data?.detail || "Invalid username or password credentials.");
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
            <Sparkles size={12} className="fill-emerald-400" /> Welcome Back Partner
          </span>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight">
            Continue your <span className="text-emerald-400">health journey</span>
          </h1>
          <p className="text-xs xl:text-sm text-slate-400 font-medium leading-relaxed max-w-md">
            Log back in to fetch macro analytics, scan incoming fridge ingredients, and instantly resume your personalized AI calorie targets.
          </p>


          <div className="space-y-3 pt-4 border-t border-white/5 max-w-sm">
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/5 rounded-xl text-emerald-400 mt-0.5"><Zap size={16} /></div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                <span className="font-bold text-white block">Smart Monolith Engine</span> Instant loading states map dynamic macro graphs securely.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="p-2 bg-white/5 rounded-xl text-amber-400 mt-0.5"><ShieldCheck size={16} /></div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                <span className="font-bold text-white block">Verified Data Protocols</span> Strict encryption gates prevent leak loops across network boundaries.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[10px] font-bold text-slate-500 relative z-10">
          © 2026 QuickChefAI Core Ecosystem Engine. Security context verified.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 relative">
        

        <div className="lg:hidden mb-6 flex justify-center">
          <Logo />
        </div>


        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/60 shadow-xl p-6 sm:p-8 transition-all">
          
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 lg:hidden">
              Sign in to your account
            </h2>
            <h2 className="text-xl font-black tracking-tight text-slate-950 hidden lg:block">
              Welcome Back
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Access secure tokens to sync dynamic database updates.
            </p>
          </div>

          
          {authError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center animate-fade-in">
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
                  placeholder="Enter username" 
                  className="w-full bg-slate-50 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  required 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Enter session token key" 
                  className="w-full bg-slate-50 pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium border border-transparent focus:outline-none focus:border-emerald-500 focus:bg-white transition-all focus:ring-4 focus:ring-emerald-100" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-100 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-1.5 disabled:opacity-80"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              {isLoading ? "Verifying..." : "Access Session"}
            </button>
          </form>

          
          <p className="mt-6 text-center text-xs font-medium text-slate-400">
            Not a member yet?
            <Link href="/signup" className="ml-1 font-bold text-emerald-600 hover:text-emerald-700 underline transition-colors">
              Sign Up Now
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}