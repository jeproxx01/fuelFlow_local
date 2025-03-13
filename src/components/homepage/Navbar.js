"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "80px";
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollPaddingTop = "";
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-900/90 backdrop-blur-sm text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rotate-45 border-2 border-white"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Flame className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <span className="text-xl text-white font-bold ml-5">FuelFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            "home",
            "our-fuels",
            "services",
            "news-promos",
            "about-us",
            "contact-us",
          ].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollToSection(id)}
              className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
            >
              {id
                .replace("-", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {[
                "home",
                "our-fuels",
                "services",
                "news-promos",
                "about-us",
                "contact-us",
              ].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={scrollToSection(id)}
                  className="text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  {id
                    .replace("-", " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
