"use client";
import Logo from "@/src/components/logo";
import React, {useState} from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";

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
    <div>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
          <div className="w-40 mr-20 mx-auto">
            <Logo />
          </div>

          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Continue your health journey
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-500"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="name"
                  name="username"
                  onChange={handleChange}
                  required
                  autoComplete="username"
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-500"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-green-400 hover:text-green-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
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
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?
            <a
              href="#"
              className="font-semibold text-green-400 hover:text-green-300"
            >
              {" "}SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
