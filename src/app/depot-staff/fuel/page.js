"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Upload, Eye, TrendingUp } from "lucide-react";

export default function ManageFuel() {
  const [imageSrc, setImageSrc] = useState("/price.jpg");
  const [fuels, setFuels] = useState([
    { id: 1, name: "Diesel", price: 65.85, stock: 15000, trend: "+2.3%" },
    { id: 2, name: "Unleaded", price: 72.5, stock: 12000, trend: "-1.5%" },
    { id: 3, name: "Premium", price: 78.95, stock: 8000, trend: "+1.8%" },
  ]);

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fuel Monitoring</h1>
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
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">
                          Stock: {fuel.stock.toLocaleString()} L
                        </p>
                        <span
                          className={`text-sm ${
                            fuel.trend.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {fuel.trend}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                        <TrendingUp size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stock Level Charts */}
      <div className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Stock Level History</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Stock level chart will be implemented here
          </div>
        </div>
      </div>
    </div>
  );
}
