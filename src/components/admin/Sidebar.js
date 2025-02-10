"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Import Next.js hook for detecting active page

export function Sidebar({ isOpen, toggleSidebar }) {
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);
  const pathname = usePathname(); // Get current page path

  // Expand Accounts menu if inside the Accounts section
  useEffect(() => {
    if (
      pathname.includes("/admin/office-staff-account") ||
      pathname.includes("/admin/depot-staff-account")
    ) {
      setIsAccountsOpen(true);
    }
  }, [pathname]);

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
              pathname === "/admin/dashboard"
                ? "bg-gray-500"
                : "hover:bg-blue-800"
            }`}
          >
            <a
              href="/admin/dashboard"
              className="flex items-center p-3 space-x-2"
            >
              <span>🏠</span>
              {isOpen && <span>Dashboard</span>}
            </a>
          </li>

          {/* Accounts Dropdown */}
          <li className="mx-2">
            <div
              className="flex items-center p-3 space-x-2 cursor-pointer hover:bg-blue-800 rounded-md"
              onClick={() => setIsAccountsOpen(!isAccountsOpen)}
            >
              <span>👥</span>
              {isOpen && <span>Accounts</span>}
            </div>
            {isAccountsOpen && isOpen && (
              <ul className="pl-8 mt-2 space-y-2">
                {/* office */}
                <li>
                  <a
                    href="/admin/office-staff-account"
                    className={`flex items-center p-2 space-x-2 rounded-md ${
                      pathname === "/admin/office-staff-account"
                        ? "bg-blue-700"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    <span>👤</span>
                    <span>Office Staff</span>
                  </a>
                </li>
                {/* depot */}
                <li>
                  <a
                    href="/admin/depot-staff-account"
                    className={`flex items-center p-2 space-x-2 rounded-md ${
                      pathname === "/admin/depot-staff-account"
                        ? "bg-blue-700"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    <span>👤</span>
                    <span>Depot Staff</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Other Menu Items */}
          <li
            className={`mx-2 rounded-md ${
              pathname === "/admin/fuel" ? "bg-gray-500" : "hover:bg-blue-800"
            }`}
          >
            <a href="/admin/fuel" className="flex items-center p-3 space-x-2">
              <span>⛽</span>
              {isOpen && <span>Fuel</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/admin/truck" ? "bg-gray-500" : "hover:bg-blue-800"
            }`}
          >
            <a href="/admin/truck" className="flex items-center p-3 space-x-2">
              <span>🚚</span>
              {isOpen && <span>Truck</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/admin/order" ? "bg-gray-500" : "hover:bg-blue-800"
            }`}
          >
            <a href="/admin/order" className="flex items-center p-3 space-x-2">
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
              href="/admin/inventory"
              className="flex items-center p-3 space-x-2"
            >
              <span>🛢️</span>
              {isOpen && <span>Inventory</span>}
            </a>
          </li>

          <li
            className={`mx-2 rounded-md ${
              pathname === "/admin/report" ? "bg-gray-500" : "hover:bg-blue-800"
            }`}
          >
            <a href="/admin/report" className="flex items-center p-3 space-x-2">
              <span>📊</span>
              {isOpen && <span>Reports</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
