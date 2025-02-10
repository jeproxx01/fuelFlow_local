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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="hover:underline">
              {item}
            </a>
          ))}
        </div>

        {/*Signup Button */}
        <div className="hidden md:flex space-x-4 ml-4">
          <a
            href="#"
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Signup
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-indigo-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col items-center space-y-4">
            {menuItems.map((item, index) => (
              <a key={index} href="#" className="hover:underline">
                {item}
              </a>
            ))}
            <div className="flex flex-col space-y-2 w-full px-4">
              <a
                href="adminLog"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-center"
              >
                Login
              </a>
              <a
                href="adminCreate"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-center"
              >
                Signup
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
