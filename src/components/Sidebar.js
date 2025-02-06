"use client";
import { useState } from "react";

export function Sidebar({ isOpen, toggleSidebar }) {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center p-4 space-x-2">
        {/* Logo with top margin to avoid being covered by the top bar */}
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        {isOpen && (
          <h1 className="text-xl font-semibold">
            <a href="/">FuelFlow</a>
          </h1>
        )}
      </div>
      <nav className="mt-4">
        <ul className="space-y-4">
          <li className="mx-2 bg-gray-500 rounded-md">
            <a
              href="#"
              className="flex items-center p-3 space-x-2 hover:bg-blue-800"
            >
              <span>🏠</span>
              {isOpen && <span>Dashboard</span>}
            </a>
          </li>
          <li className="mx-2 hover:bg-blue-800 rounded-md">
            <div
              className="flex items-center p-3 space-x-2 cursor-pointer"
              onClick={() => setIsAccountsOpen(!isAccountsOpen)} // Toggle Accounts
            >
              <span>👥</span>
              {isOpen && <span>Accounts</span>}
            </div>
            {isAccountsOpen &&
              isOpen && ( // Only show submenus when Accounts is open and sidebar is open
                <ul className="pl-8 mt-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 space-x-2 hover:bg-blue-700 rounded-md"
                    >
                      <span>👤</span>
                      <span>Customer</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 space-x-2 hover:bg-blue-700 rounded-md"
                    >
                      <span>👤</span>
                      <span>Staff</span>
                    </a>
                  </li>
                </ul>
              )}
          </li>
          <li className="mx-2 hover:bg-blue-800 rounded-md">
            <a href="#" className="flex items-center p-3 space-x-2">
              <span>⛽</span>
              {isOpen && <span>Fuels</span>}
            </a>
          </li>
          <li className="mx-2 hover:bg-blue-800 rounded-md">
            <a href="#" className="flex items-center p-3 space-x-2">
              <span>📦</span>
              {isOpen && <span>Orders</span>}
            </a>
          </li>
          <li className="mx-2 hover:bg-blue-800 rounded-md">
            <a href="#" className="flex items-center p-3 space-x-2">
              <span>🛢️</span>
              {isOpen && <span>Inventory</span>}
            </a>
          </li>
          <li className="mx-2 hover:bg-blue-800 rounded-md">
            <a href="#" className="flex items-center p-3 space-x-2">
              <span>📊</span>
              {isOpen && <span>Reports</span>}
            </a>
          </li>
          <li className="mx-2 hover:bg-blue-800 rounded-md">
            <a href="#" className="flex items-center p-3 space-x-2">
              <span>💬</span>
              {isOpen && <span>Feedback</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
