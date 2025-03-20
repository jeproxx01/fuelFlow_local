"use client";
import { useState } from "react";

export default function Reports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Delivery Report",
      date: "2024-03-17",
      status: "Generated",
      size: "256KB",
    },
    {
      id: 2,
      type: "Stock Level Report",
      date: "2024-03-16",
      status: "Generated",
      size: "128KB",
    },
    {
      id: 3,
      type: "Maintenance Report",
      date: "2024-03-15",
      status: "Processing",
      size: "192KB",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Generate New Report
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Export All
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">
            Delivery Reports
          </h3>
          <p className="text-2xl font-bold text-gray-900">15</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Stock Reports</h3>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">
            Maintenance Reports
          </h3>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Generated
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                        report.status === "Generated"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Download
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      View
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
