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
              desc: "Manages system settings, user accounts, and reports.",
              href: "/admin/login",
            },
            {
              title: "Office Staff",
              desc: "Processes orders, manages customer accounts, and coordinates deliveries.",
              href: "/office-staff/login",
            },
            {
              title: "Depot Staff",
              desc: "Handles fuel inventory, dispatches deliveries, and ensures compliance.",
              href: "/depot-staff/login",
            },
            {
              title: "Gas Station Owner",
              desc: "Places orders, tracks deliveries, and manages station inventory.",
              href: "/gas-station-owner/login",
            },
            {
              title: "Gas Station Staff",
              desc: "Receives deliveries, updates inventory, and ensures proper fuel handling.",
              href: "/gas-station-staff/login",
            },
          ].map((role, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-3 flex justify-center">
                {role.title}
              </h2>
              <p className="text-gray-600 mb-4">{role.desc}</p>
              <a
                href={role.href}
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
