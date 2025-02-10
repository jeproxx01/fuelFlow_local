"use client";
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function ManageFuel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [imageSrc, setImageSrc] = useState("/price.jpg"); // Editable image source

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
          <h1 className="text-2xl font-bold mb-4">Manage Fuel Products</h1>

          {/* Editable Image Section */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <img
              src={imageSrc}
              alt="Fuel Price Adjustment"
              className="w-50 h-80 object-cover mx-auto rounded-lg"
            />
            <div className="text-center mt-4">
              <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Change Image
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          {/* Fuel Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Diesel", price: "₱65.85/liter" },
              { name: "Unleaded", price: "₱72.50/liter" },
              { name: "Premium", price: "₱78.95/liter" },
            ].map((fuel, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h2 className="text-lg font-semibold mb-2">{fuel.name}</h2>
                <p className="text-xl font-bold">{fuel.price}</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Edit this Product
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
