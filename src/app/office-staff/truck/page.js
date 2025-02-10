"use client";
import { useState } from "react";
import { Sidebar } from "@/components/office-staff/Sidebar";
import { Topbar } from "@/components/office-staff/Topbar";

export default function ManageTruck() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [imageSrc, setImageSrc] = useState("/truck.jpg"); // Editable image source

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

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
          <h1 className="text-2xl font-bold mb-4">Manage Trucks</h1>

          {/* Truck List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Truck 1", "Truck 2", "Truck 3"].map((truck, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h2 className="text-lg font-semibold mb-2">{truck}</h2>
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Edit Truck Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
