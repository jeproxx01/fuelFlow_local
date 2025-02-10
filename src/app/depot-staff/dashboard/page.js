"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/depot-staff/Sidebar";
import { Topbar } from "@/components/depot-staff/Topbar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Automatically collapse the sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); // Automatically shrink sidebar on mobile
      } else {
        setIsSidebarOpen(true); // Expand sidebar on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Topbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="p-6 mt-16">
          {/* Grid structure for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">Total Gas Station</h2>
              <p className="text-2xl font-bold">1500</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">New Order</h2>
              <p className="text-2xl font-bold">50</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">Total Admin</h2>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">Confirmed Order</h2>
              <p className="text-2xl font-bold">45</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Top Sellers</h2>
              <img
                src="https://openui.fly.dev/openui/300x200.svg?text=📊"
                alt="Top Sellers Chart"
                className="w-full h-auto"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Top Sellers</h2>
              <img
                src="https://openui.fly.dev/openui/300x200.svg?text=📈"
                alt="Top Sellers Chart"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
