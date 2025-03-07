"use client";
import React, { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";

export const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [username, setUsername] = useState("Loading...");
  const [error, setError] = useState(null);
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

          {/* Profile Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-gray-800 font-medium">
                {error ? `${username} (${error})` : username}
              </span>
              <span className="text-gray-500 text-sm">admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
