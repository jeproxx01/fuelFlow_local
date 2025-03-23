"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Truck,
  FileText,
  Fuel,
  ClipboardList,
  LogOut,
  Menu,
  Package,
} from "lucide-react";
import { toast } from "react-hot-toast";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/office-staff/dashboard",
    },
    {
      title: "Orders",
      icon: <ClipboardList size={20} />,
      path: "/office-staff/order",
    },
    {
      title: "Fuel",
      icon: <Fuel size={20} />,
      path: "/office-staff/fuel",
    },
    {
      title: "Inventory",
      icon: <Fuel size={20} />,
      path: "/office-staff/inventory",
    },
    {
      title: "Trucks",
      icon: <Truck size={20} />,
      path: "/office-staff/truck",
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      path: "/office-staff/report",
    },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full bg-indigo-900 text-white transition-all duration-300 z-50 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center px-4 py-4">
          <div
            className={`flex items-center ${
              !isOpen ? "justify-center w-full" : "space-x-3"
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo/logo.svg" alt="Logo" className="h-8 w-8" />
            </div>
            <span className={`text-lg font-semibold ${!isOpen && "hidden"}`}>
              FuelFlow
            </span>
          </div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center ${
                !isOpen ? "justify-center" : "space-x-3"
              } px-4 py-3 transition-colors text-white ${
                pathname === item.path ? "bg-blue-800" : "hover:bg-blue-100/10"
              }`}
            >
              <div className="w-6 flex items-center justify-center">
                {item.icon}
              </div>
              <span className={!isOpen ? "hidden" : "text-base"}>
                {item.title}
              </span>
            </Link>
          ))}

          <button
            onClick={handleLogoutClick}
            className={`flex items-center ${
              !isOpen ? "justify-center" : "space-x-3"
            } px-4 py-3 transition-colors w-full hover:bg-blue-100/10 text-red-400 hover:text-red-300`}
          >
            <div className="w-6 flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <span className={!isOpen ? "hidden" : "text-base"}>Logout</span>
          </button>
        </nav>
      </div>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className={`fixed transition-all duration-300 z-50 p-2.5 ${
          isOpen ? "left-64 top-[14px]" : "left-20 top-[14px]"
        }`}
      >
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Logout
              </h3>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
