"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoginSection = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Admin",
              desc: "Manage system settings, user accounts, and view reports.",
            },
            {
              title: "Staff",
              desc: "Manage deliveries, inventory, and gas station owner orders.",
            },
            {
              title: "Gas station owner",
              desc: "Place orders, track deliveries, and manage your account.",
            },
            { title: "Delivery Guy", desc: "Deliveries" },
            { title: "Depo", desc: "Depo management." },
          ].map((role, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-3">{role.title}</h2>
              <p className="text-gray-600 mb-4">{role.desc}</p>
              <a
                href="#"
                className="block bg-red-500 text-white px-4 py-2 rounded-lg text-center hover:bg-red-600"
              >
                Login
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginSection;
