"use client";
import { useState } from "react";
import { Sidebar } from "@/components/gas-station-owner/Sidebar";
import { Topbar } from "@/components/gas-station-owner/Topbar";

export default function Reports() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          <h1 className="text-2xl font-bold mb-4">Reports</h1>

          {/* Report Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Sales Report",
                description: "View monthly sales data.",
              },
              {
                title: "Inventory Report",
                description: "Track stock levels and usage.",
              },
              {
                title: "Customer Feedback",
                description: "Analyze customer reviews.",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
