"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Hero images
  const heroImages = [
    "/assets/images/hero/heropage1.jpg",
    "/assets/images/hero/heropage3.png"
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-advance images every 3 seconds
  useEffect(() => {
    if (prefersReducedMotion || isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      }, 3000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [heroImages.length, isHovered, prefersReducedMotion]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <header 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero section with rotating background images"
    >
      {/* Full-width Image Slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-800 ease-in-out ${
              index === currentImageIndex 
                ? "opacity-100 translate-x-0" 
                : index === (currentImageIndex - 1 + heroImages.length) % heroImages.length
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div 
              className={`w-full h-full bg-cover bg-center transition-transform duration-[3000ms] ease-in-out ${
                !prefersReducedMotion ? 'hover:scale-105' : ''
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
            {/* Soft gradient overlay at bottom for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Floating Solar Icons */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Solar rays */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-yellow-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Floating solar panels */}
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white/20 backdrop-blur-sm rounded transform rotate-12 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/4 right-1/5 w-6 h-6 bg-white/20 backdrop-blur-sm rounded transform -rotate-6 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content - Centered vertically at 45-50% height */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center justify-start min-h-screen">
          <div className="mt-32 md:mt-40 text-center animate-fade-in-up">
            {/* Heading */}
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Clean Energy for a Better Tomorrow
            </motion.h1>
            
            {/* Microline */}
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Premium solar systems for homes & businesses.
            </motion.p>
            
            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white hover:opacity-90 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="Get free consultation"
                >
                  Get Free Consultation
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-[#0047BA] border-white hover:bg-white/90 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="Explore our services"
                >
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
        <span className="sr-only">Scroll down</span>
      </motion.div>
    </header>
  );
}