"use client";
import Logo from "@/src/components/logo";
import React, {useState} from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here, e.g., call API to authenticate user
    try {
      // Example API call (replace with actual endpoint and logic)
      const response = await api.post("/api/login/", formData);

      console.log("Login successful:", response.data);
      router.push("/dashboard");
      // Redirect to dashboard or home page after successful login
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
    console.log("Form submitted:", formData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center px-4 py-8">
  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
    
    {/* Logo */}
    <div className="flex justify-center">
      <div className="w-28 sm:w-36">
        <Logo />
      </div>
    </div>

    {/* Heading */}
    <div className="mt-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <p className="mt-2 text-sm sm:text-base text-gray-500">
        Continue your health journey
      </p>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="mt-8 space-y-5"
    >
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username
        </label>

        <div className="mt-2">
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            required
            autoComplete="username"
            placeholder="Enter username"
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
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>

          <a
            href="#"
            className="text-sm font-medium text-green-500 hover:text-green-400"
          >
            Forgot password?
          </a>
        </div>

        <div className="mt-2">
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            required
            autoComplete="current-password"
            placeholder="Enter password"
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

      {/* Button */}
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
        Sign in
      </button>
    </form>

    {/* Footer */}
    <p className="mt-8 text-center text-sm text-gray-500">
      Not a member?
      <Link
        href="/signup"
        className="ml-1 font-semibold text-green-500 hover:text-green-400"
      >
        Sign Up
      </Link>
    </p>
  </div>
</div>
  );
}
