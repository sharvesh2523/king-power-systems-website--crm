"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="King Power Systems Logo" 
              className="h-9 md:h-10 w-auto mr-3 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-[#0047BA] whitespace-nowrap transition-all duration-300 group-hover:text-[#1A5FE8]">KING POWER SYSTEMS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#0047BA] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0047BA] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="#roi-calculator">
              <Button variant="outline" className="border-[#0047BA] text-[#0047BA] hover:bg-[#0047BA] hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg">
                ROI Calculator
              </Button>
            </Link>
            <Link href="#contact">
              <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0047BA]/30">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#0047BA] transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="#roi-calculator" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#0047BA] text-[#0047BA] transition-all duration-300 hover:bg-[#0047BA] hover:text-white">
                    ROI Calculator
                  </Button>
                </Link>
                <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white transition-all duration-300 hover:opacity-90">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}