"use client";
import { useState } from "react";

export default function AdminTrucks() {
  const [trucks, setTrucks] = useState([
    {
      id: 1,
      plateNumber: "ABC 123",
      driver: "John Doe",
      capacity: "5000L",
      status: "Available",
      lastMaintenance: "2024-03-10",
      depot: "Main Depot",
      assignedTo: "North Route",
    },
    {
      id: 2,
      plateNumber: "XYZ 789",
      driver: "Jane Smith",
      capacity: "3000L",
      status: "On Delivery",
      lastMaintenance: "2024-03-15",
      depot: "South Depot",
      assignedTo: "South Route",
    },
    {
      id: 3,
      plateNumber: "DEF 456",
      driver: "Mike Johnson",
      capacity: "4000L",
      status: "Maintenance",
      lastMaintenance: "2024-03-17",
      depot: "East Depot",
      assignedTo: "East Route",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fleet Management</h1>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add Truck
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Export Data
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Maintenance Schedule
          </button>
        </div>
      </div>

      {/* Trucks Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Fleet</h3>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-500">All trucks</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Available</h3>
          <p className="text-2xl font-bold text-green-600">1</p>
          <p className="text-sm text-gray-500">Ready for delivery</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">In Maintenance</h3>
          <p className="text-2xl font-bold text-yellow-600">1</p>
          <p className="text-sm text-gray-500">Under service</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Total Capacity</h3>
          <p className="text-2xl font-bold text-purple-600">12,000L</p>
          <p className="text-sm text-gray-500">Combined fleet</p>
        </div>
      </div>

      {/* Trucks List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plate Number
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Depot
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Route
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trucks.map((truck) => (
                <tr
                  key={truck.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {truck.plateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {truck.driver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {truck.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {truck.depot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {truck.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                        truck.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : truck.status === "On Delivery"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {truck.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {truck.lastMaintenance}
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
