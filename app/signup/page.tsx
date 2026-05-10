"use client";

import React, {useState} from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import Logo from "@/src/components/logo";


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
    <div>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
          <div className="w-40 mr-20 mx-auto">
            <Logo />
          </div>

          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Start your health journey
          </h2>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-500"
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
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-500"
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
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    "
                />
              </div>
              <p className="mt-1 text-sm text-gray-400">Minimum 8 characters</p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="
                    block w-full rounded-xl border border-gray-300
                    px-4 py-3 text-gray-900
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500
                    "
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-3 text-sm/6 font-semibold text-white hover:bg-green-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Already a member?
            <a
              href="#"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              {" "} Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
