"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/gas-station-staff/Sidebar";
import { Topbar } from "@/components/gas-station-staff/Topbar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Automatically collapse the sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div
        className={`transition-all duration-300 flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Topbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="p-6 mt-16">
          <header className="flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Gas Stations</h2>
            <button className=" bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 ml-5">
              Add Station
            </button>
          </header>

          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
              <label htmlFor="entries" className="font-medium">
                Show
              </label>
              <select id="entries" className="border rounded p-1">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>

            <table className="w-full mt-4 border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">NAME</th>
                  <th className="border border-gray-200 p-2">ADDRESS</th>
                  <th className="border border-gray-200 p-2">STATION ID</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, index) => (
                  <tr
                    key={index}
                    className="text-center border border-gray-200"
                  >
                    <td className="p-2">TOTAL-Fuel</td>
                    <td className="p-2">Dampas, Tagbilaran Ciy</td>
                    <td className="p-2">06915599</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <span>Showing 1 to 10 of 10 entries</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded bg-gray-200">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded bg-blue-500 text-white">
                  1
                </button>
                <button className="px-3 py-1 border rounded bg-gray-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
