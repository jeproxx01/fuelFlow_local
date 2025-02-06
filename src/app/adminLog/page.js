"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoginAcc = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center mt-32 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
          <form action="verify.php" method="POST" className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <div className="text-right">
              <a
                href="adminDash"
                className="text-indigo-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Login
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
            <a href="adminCreate" className="text-indigo-600 hover:underline">
              Create Account
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginAcc;
