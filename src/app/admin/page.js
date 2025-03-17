"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { Eye } from "lucide-react";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(""); // Clear any previous errors
    setIsLoading(true);

    try {
      // Default to admin login
      let loginEndpoint = "/api/admin/login";

      // If using test credentials, set them here
      if (formData.username === "login" && formData.password === "login") {
        formData.username = "admin";
        formData.password = "admin123";
      }

      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setLoginError("Invalid username or password");
        } else {
          setLoginError(data.message || "Login failed");
        }
        return;
      }

      // Redirect based on user role
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "office_staff") {
        router.push("/office-staff/dashboard");
      } else if (data.user.role === "depot_staff") {
        router.push("/depot-staff/dashboard");
      }

      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster />
      {/* Left Section - Dark Blue Background with Logo */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 flex-col items-center justify-center p-12">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-white text-3xl font-bold text-center mb-16">
            FuelFlow: Fuel Delivery Management System
          </h1>
          <div className="w-[500px] h-[400px] relative">
            <Image
              src="/logo/logo.gif"
              alt="FuelFlow Logo"
              width={500}
              height={400}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#1E1B4B] mb-8 text-center">
            Admin Portal
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginError && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-red-600 hover:text-red-800">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
