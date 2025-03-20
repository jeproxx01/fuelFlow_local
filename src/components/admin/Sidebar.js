"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Truck,
  FileText,
  Fuel,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "react-hot-toast";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState({
    Accounts: true, // Initialize Accounts as expanded
  });

  const toggleExpand = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Add useEffect to persist expanded state when pathname changes
  useEffect(() => {
    setExpandedItems((prev) => ({
      ...prev,
      Accounts: true, // Keep Accounts expanded on navigation
    }));
  }, [pathname]);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      title: "Accounts",
      icon: <Users size={20} />,
      subItems: [
        {
          title: "Office Staff",
          icon: <Users size={20} />,
          path: "/admin/office-staff-account",
        },
        {
          title: "Depot Staff",
          icon: <Users size={20} />,
          path: "/admin/depot-staff-account",
        },
      ],
    },
    {
      title: "Trucks",
      icon: <Truck size={20} />,
      path: "/admin/truck",
    },
    {
      title: "Orders",
      icon: <ClipboardList size={20} />,
      path: "/admin/order",
    },
    {
      title: "Fuel",
      icon: <Fuel size={20} />,
      path: "/admin/fuel",
    },
    {
      title: "Inventory",
      icon: <Fuel size={20} />,
      path: "/admin/inventory",
    },
    {
      title: "Reports",
      icon: <FileText size={20} />,
      path: "/admin/report",
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

      // Redirect to admin login page
      window.location.href = "/admin";
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
            <div key={index}>
              {item.subItems ? (
                // Parent menu item with sub-items
                <div>
                  <button
                    onClick={() => {
                      if (!isOpen) {
                        toggleSidebar();
                      }
                      toggleExpand(item.title);
                    }}
                    className={`flex items-center w-full px-4 py-3 text-white hover:bg-indigo-100/10 ${
                      !isOpen ? "justify-center" : "justify-between"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        !isOpen ? "" : "space-x-3"
                      }`}
                    >
                      <div className="w-6 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span
                        className={!isOpen ? "hidden" : "text-base font-medium"}
                      >
                        {item.title}
                      </span>
                    </div>
                    {isOpen && (
                      <span className="text-white">
                        {expandedItems[item.title] ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </span>
                    )}
                  </button>
                  {/* Sub-items */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedItems[item.title] && isOpen
                        ? "max-h-96"
                        : "max-h-0"
                    } ${!isOpen ? "" : "pl-12"}`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.path}
                        className={`flex items-center ${
                          !isOpen ? "justify-center" : "space-x-3"
                        } px-4 py-3 transition-colors text-white ${
                          pathname === subItem.path
                            ? "bg-indigo-800"
                            : "hover:bg-indigo-100/10"
                        } ${!isOpen ? "hidden" : ""}`}
                      >
                        <div className="w-6 flex items-center justify-center">
                          {subItem.icon}
                        </div>
                        <span className={!isOpen ? "hidden" : "text-base"}>
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // Regular menu item without sub-items
                <Link
                  href={item.path}
                  className={`flex items-center ${
                    !isOpen ? "justify-center" : "space-x-3"
                  } px-4 py-3 transition-colors text-white ${
                    pathname === item.path
                      ? "bg-indigo-800"
                      : "hover:bg-indigo-100/10"
                  }`}
                >
                  <div className="w-6 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className={!isOpen ? "hidden" : "text-base"}>
                    {item.title}
                  </span>
                </Link>
              )}
            </div>
          ))}

          <button
            onClick={handleLogoutClick}
            className={`flex items-center ${
              !isOpen ? "justify-center" : "space-x-3"
            } px-4 py-3 transition-colors w-full hover:bg-indigo-100/10 text-red-400 hover:text-red-300`}
          >
            <div className="w-6 flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <span className={!isOpen ? "hidden" : "text-base"}>Logout</span>
          </button>
        </nav>
      </div>

      {/* Toggle button in gray box */}
      <button
        onClick={toggleSidebar}
        className={`fixed transition-all duration-300 z-50  p-2.5 ${
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
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
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
