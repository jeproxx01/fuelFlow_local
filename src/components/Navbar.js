"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    "Our Fuels",
    "Services",
    "News & Promos",
    "About Us",
    "Contact Us",
  ];

  return (
    <nav className="fixed top-0 w-full bg-indigo-900 text-white p-4 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src="/logo.png" alt="FuelFlow Logo" className="h-12 mr-3" />
          <h1 className="text-xl font-semibold">
            <a href="/">FuelFlow</a>
          </h1>
        </div>

        {/* Desktop Menu - Fully Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6">
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="hover:underline">
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-indigo-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Centered */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 flex justify-center">
          <div className="flex flex-col items-center space-y-4">
            {menuItems.map((item, index) => (
              <a key={index} href="#" className="hover:underline">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
