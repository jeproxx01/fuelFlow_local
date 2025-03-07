"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const LoginAcc = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Client-side validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          // Handle validation errors from server
          if (data.message.includes("Email")) {
            setErrors({ email: data.message });
          } else if (data.message.includes("Password")) {
            setErrors({ password: data.message });
          }
          throw new Error(data.message);
        } else if (response.status === 401) {
          // Handle invalid credentials
          setErrors({
            password: "Invalid password",
          });
          throw new Error("Invalid password");
        }
        throw new Error(data.message || "Login failed");
      }

      if (!data.user || !data.user.username) {
        throw new Error("Invalid response from server");
      }

      toast.success("Login successful!");
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      if (!errors.email && !errors.password) {
        setErrors({
          password: "Login failed. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center mt-32 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-3 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="mt-4">
              {/* ReCAPTCHA (visible in production only) */}
              <div
                className="g-recaptcha"
                data-sitekey="6LfUHMwqAAAAAL1vOakBRtEutSwH3Ncw0h1hpQSh"
              ></div>
            </div>
          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <a
              href="/admin/create-account"
              className="text-indigo-600 hover:underline"
            >
              Create Account
            </a>
          </p>
          <div>
            <a
              className="flex justify-center items-center hover:underline mt-5"
              href="/"
            >
              Back
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginAcc;
