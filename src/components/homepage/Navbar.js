"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <nav className="fixed top-0 w-full bg-[#483285] text-white p-4 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <div className="h-12 w-12 mr-3">
            <Image
              src="/logo.png"
              alt="FuelFlow Logo"
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-semibold">
            <Link href="/" className="text-white no-underline hover:text-white">
              FuelFlow
            </Link>
          </h1>
        </div>

        {/* Desktop Menu - Fully Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href="#"
              className="text-sm text-white no-underline hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#5a4399] transition-colors text-white"
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
              <Link
                key={index}
                href="#"
                className="text-sm text-white no-underline hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
