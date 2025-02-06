// components/Topbar.js
"use client";
import { useState } from "react";

export function Topbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-gray-200 flex items-center justify-between px-6 transition-all duration-300">
      <button onClick={toggleSidebar} className="text-2xl">
        ≡
      </button>
      <div className="flex items-center space-x-4 relative">
        <span className="cursor-pointer">💬</span>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="font-bold">lotweee01</p>
            <p className="text-sm text-gray-600">admin</p>
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer"
          >
            👤
          </button>
        </div>
        {isDropdownOpen && (
          <ul className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Change Password
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Log Out
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
