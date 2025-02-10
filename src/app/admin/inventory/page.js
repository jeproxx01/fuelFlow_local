"use client";
import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default function Inventory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [items, setItems] = useState([
    { name: "Diesel", stock: 5000, unit: "liters" },
    { name: "Unleaded", stock: 3000, unit: "liters" },
    { name: "Premium", stock: 2000, unit: "liters" },
  ]);

  const handleStockUpdate = (index) => {
    const updatedStock = prompt("Enter new stock quantity:");
    if (updatedStock !== null) {
      setItems((prevItems) => {
        const newItems = [...prevItems];
        newItems[index].stock =
          parseInt(updatedStock, 10) || newItems[index].stock;
        return newItems;
      });
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
          <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

          {/* Inventory List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-xl font-bold">
                  {item.stock} {item.unit}
                </p>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  onClick={() => handleStockUpdate(index)}
                >
                  Update Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
