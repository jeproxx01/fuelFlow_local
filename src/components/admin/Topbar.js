"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [username, setUsername] = useState("Loading...");
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        console.log("Starting to fetch user data..."); // Debug log

        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        console.log("Response status:", response.status); // Debug log

        const data = await response.json();
        console.log("Received data:", data); // Debug log

        if (!response.ok) {
          if (response.status === 401) {
            console.log("Not authenticated, redirecting to login..."); // Debug log
            router.push("/admin/login");
            return;
          }
          throw new Error(data.message || "Failed to fetch user data");
        }

        if (!data.user || !data.user.username) {
          console.error("Invalid data format:", data); // Debug log
          throw new Error("Invalid data format received");
        }

        if (isMounted) {
          console.log("Setting username:", data.user.username); // Debug log
          setUsername(data.user.username);
          setError(null);
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error); // Debug log
        if (isMounted) {
          setError(error.message || "Failed to load username");
          setUsername("Error");
        }
      }
    };

    // Initial fetch with a longer delay to ensure cookie is set
    const timer = setTimeout(() => {
      fetchUserData();
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 bg-white shadow-md z-40 transition-all duration-300"
      style={{ left: isSidebarOpen ? "16rem" : "5rem" }}
    >
      <div className="flex items-center justify-end h-16 px-4">
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              1
            </span>
          </div>

          {/* Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium">
                  {error ? `${username} (${error})` : username}
                </span>
                <span className="text-gray-500 text-sm">admin</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="w-4 h-4 mr-2" />
                  View Account
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Update Account
                </Link>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
