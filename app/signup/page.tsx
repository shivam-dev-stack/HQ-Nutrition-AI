"use client";

import React, {useState} from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import Logo from "@/src/components/logo";
import Link from "next/link";


export default function SignupPage() {
  const router = useRouter();
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const response = await api.post("/api/register/", payload);
      console.log("Signup successful:", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error.response ? error.response.data : error.message);
    }
    console.log("Form submitted:", formData);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center px-4 py-8">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

    {/* Logo */}
    <div className="flex justify-center">
      <div className="w-28 sm:w-36">
        <Logo />
      </div>
    </div>

    {/* Heading */}
    <div className="mt-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Start your health journey
      </h2>

      <p className="mt-2 text-sm sm:text-base text-gray-500">
        Create your personalized wellness account
      </p>
    </div>

    {/* Form */}
    <form
      action="#"
      method="POST"
      onSubmit={handleSubmit}
      className="mt-8 space-y-5"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name
        </label>

        <div className="mt-2">
          <input
            id="name"
            type="text"
            name="username"
            required
            autoComplete="name"
            onChange={handleChange}
            placeholder="Enter your name"
            className="
              block w-full rounded-xl border border-gray-300
              px-4 py-3 text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500
              transition
            "
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email address
        </label>

        <div className="mt-2">
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="
              block w-full rounded-xl border border-gray-300
              px-4 py-3 text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500
              transition
            "
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>

        <div className="mt-2">
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Create password"
            className="
              block w-full rounded-xl border border-gray-300
              px-4 py-3 text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500
              transition
            "
          />
        </div>

        <p className="mt-1 text-xs text-gray-400">
          Minimum 8 characters
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-600"
        >
          Confirm Password
        </label>

        <div className="mt-2">
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Confirm password"
            className="
              block w-full rounded-xl border border-gray-300
              px-4 py-3 text-gray-900
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500
              transition
            "
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full rounded-xl bg-green-500
          px-4 py-3
          text-sm sm:text-base font-semibold text-white
          hover:bg-green-600
          active:scale-[0.98]
          transition-all duration-200
          shadow-md
        "
      >
        Create Account
      </button>
    </form>

    {/* Footer */}
    <p className="mt-8 text-center text-sm text-gray-500">
      Already a member?
      <Link
        href="/login"
        className="ml-1 font-semibold text-green-500 hover:text-green-400"
      >
        Login
      </Link>
    </p>
  </div>
</div>
  );
}
