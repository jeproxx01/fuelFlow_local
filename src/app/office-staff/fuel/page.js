"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Upload, Eye } from "lucide-react";

export default function ManageFuel() {
  const [imageSrc, setImageSrc] = useState("/price.jpg");
  const [fuels, setFuels] = useState([
    { id: 1, name: "Diesel", price: 65.85, stock: 15000 },
    { id: 2, name: "Unleaded", price: 72.5, stock: 12000 },
    { id: 3, name: "Premium", price: 78.95, stock: 8000 },
  ]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">View Fuel Prices</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Price List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Current Price List</h2>
            </div>
            <img
              src={imageSrc}
              alt="Fuel Price List"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Fuel Products List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Fuel Products</h2>
            <div className="space-y-4">
              {fuels.map((fuel) => (
                <div
                  key={fuel.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{fuel.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ₱{fuel.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {fuel.stock.toLocaleString()} L
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload New Price List */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-2">Update Price List</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />
      </div>
    </div>
  );
}
