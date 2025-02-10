"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import Next.js hook for detecting active page

export function Sidebar({ isOpen, toggleSidebar }) {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const pathname = usePathname(); // Get current page path

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center p-4 space-x-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        {isOpen && (
          <h1 className="text-xl font-semibold">
            <a href="/">FuelFlow</a>
          </h1>
        )}
      </div>
      <nav className="mt-4">
        <ul className="space-y-4">
          {/* Dashboard */}
          <li
            className={`mx-2 rounded-md ${
              pathname === "/office-staff/dashboard"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/office-staff/dashboard"
              className="flex items-center p-3 space-x-2"
            >
              <span>🏠</span>
              {isOpen && <span>Dashboard</span>}
            </a>
          </li>

          {/* Other Menu Items */}
          <li
            className={`mx-2 rounded-md ${
              pathname === "/office-staff/fuel"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/office-staff/fuel"
              className="flex items-center p-3 space-x-2"
            >
              <span>⛽</span>
              {isOpen && <span>Fuel</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/office-staff/truck"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/office-staff/truck"
              className="flex items-center p-3 space-x-2"
            >
              <span>🚚</span>
              {isOpen && <span>Truck</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/office-staff/order"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/office-staff/order"
              className="flex items-center p-3 space-x-2"
            >
              <span>📦</span>
              {isOpen && <span>Orders</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/admin/inventory"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/office-staff/inventory"
              className="flex items-center p-3 space-x-2"
            >
              <span>🛢️</span>
              {isOpen && <span>Inventory</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/office-staff/report"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/office-staff/report"
              className="flex items-center p-3 space-x-2"
            >
              <span>📊</span>
              {isOpen && <span>Reports</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
