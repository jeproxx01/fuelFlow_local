"use client";
import React from "react";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer"; // Import Footer

const CreateAcc = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      {/* Create Account Form */}
      <div className="flex-grow flex items-center justify-center  mt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Create Account
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Create new account
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Already got an account?{" "}
            <a href="/admin/login" className="text-indigo-600 hover:underline">
              Login Here
            </a>
          </p>
        </div>
      </div>
      <Footer /> {/* Footer added here */}
    </div>
  );
};

export default CreateAcc;
