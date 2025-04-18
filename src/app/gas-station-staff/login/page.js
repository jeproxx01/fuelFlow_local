"use client";
import React from "react";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";

const LoginAcc = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center mt-32 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
          <form
            action="/gas-station-staff/dashboard"
            method="POST"
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              /*required*/
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              /*required*/
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <div className="text-right">
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Login
            </button>

            <a
              className="flex justify-center items-center hover:underline"
              href="/"
            >
              Back
            </a>

            <div className="mt-4">
              {/* ReCAPTCHA (visible in production only) */}
              <div
                className="g-recaptcha"
                data-sitekey="6LfUHMwqAAAAAL1vOakBRtEutSwH3Ncw0h1hpQSh"
              ></div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginAcc;
