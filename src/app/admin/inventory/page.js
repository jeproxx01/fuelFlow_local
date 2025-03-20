"use client";
import { useState } from "react";

export default function AdminInventory() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      product: "Diesel",
      currentStock: "5000L",
      minLevel: "1000L",
      lastUpdated: "2024-03-17",
      status: "Good",
      depot: "Main Depot",
      updatedBy: "John Doe",
    },
    {
      id: 2,
      product: "Unleaded",
      currentStock: "3500L",
      minLevel: "800L",
      lastUpdated: "2024-03-17",
      status: "Low",
      depot: "North Depot",
      updatedBy: "Jane Smith",
    },
    {
      id: 3,
      product: "Premium",
      currentStock: "4200L",
      minLevel: "1000L",
      lastUpdated: "2024-03-17",
      status: "Good",
      depot: "South Depot",
      updatedBy: "Mike Johnson",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add Product
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Export Data
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Generate Report
          </button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500">Across all depots</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-600">1</p>
          <p className="text-sm text-gray-500">Need attention</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Active Depots</h3>
          <p className="text-2xl font-bold text-green-600">3</p>
          <p className="text-sm text-gray-500">Currently operating</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">
            Total Stock Value
          </h3>
          <p className="text-2xl font-bold text-purple-600">₱2.5M</p>
          <p className="text-sm text-gray-500">Current inventory</p>
        </div>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Level
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Depot
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated By
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.currentStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.minLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.depot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                        item.status === "Good"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.updatedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 mr-3">
                      History
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
