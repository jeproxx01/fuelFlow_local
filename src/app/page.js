"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";

export default function Home() {
  const roles = [
    {
      title: "Admin",
      desc: "Manages system settings, user accounts, and reports.",
      href: "/admin/login",
    },
    {
      title: "Office Staff",
      desc: "Processes orders, manages customer accounts, and coordinates deliveries.",
      href: "/admin/office-staff-account/login",
    },
    {
      title: "Depot Staff",
      desc: "Handles fuel inventory, dispatches deliveries, and ensures compliance.",
      href: "/admin/depot-staff-account/login",
    },
    {
      title: "Gas Station Owner",
      desc: "Places orders, tracks deliveries, and manages station inventory.",
      href: "/admin/station-owner/login",
    },
    {
      title: "Gas Station Staff",
      desc: "Receives deliveries, updates inventory, and manages station operations.",
      href: "/admin/station-staff/login",
    },
  ];

  // First three roles
  const topRoles = roles.slice(0, 3);
  // Last two roles
  const bottomRoles = roles.slice(3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 mt-16">
        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {topRoles.map((role, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            >
              <h2 className="text-xl font-semibold mb-3">{role.title}</h2>
              <p className="text-gray-600 mb-6">{role.desc}</p>
              <Link
                href={role.href}
                className="w-full bg-[#f44336] text-white py-2 rounded-lg hover:bg-[#d32f2f] transition-colors no-underline hover:text-white"
              >
                Login
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Row - 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bottomRoles.map((role, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            >
              <h2 className="text-xl font-semibold mb-3">{role.title}</h2>
              <p className="text-gray-600 mb-6">{role.desc}</p>
              <Link
                href={role.href}
                className="w-full bg-[#f44336] text-white py-2 rounded-lg hover:bg-[#d32f2f] transition-colors no-underline hover:text-white"
              >
                Login
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
