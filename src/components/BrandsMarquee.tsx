"use client";

import { useState, useEffect } from 'react';

const brandImages = [
  { src: "/assets/images/hero/AMARON UPS.jpeg", alt: "Amaron UPS" },
  { src: "/assets/images/hero/EXIDE UPS.jpeg", alt: "Exide UPS" },
  { src: "/assets/images/hero/MICROTEK UPS.webp", alt: "Microtek UPS" },
  { src: "/assets/images/hero/LUMINOUS UPS.jpeg", alt: "Luminous UPS" },
  { src: "/assets/images/hero/EXIDE BATTERY.jpeg", alt: "Exide Battery" },
  { src: "/assets/images/hero/MICROTEK BATTERY.jpeg", alt: "Microtek Battery" },
  { src: "/assets/images/hero/POLYCAB SOLAR INVERTER.webp", alt: "Polycab Solar Inverter" },
  { src: "/assets/images/hero/VSOLE SOLAR INVERTER 1.webp", alt: "V-Sole Solar Inverter" },
  { src: "/assets/images/hero/EVVO SOLAR INVERTER.jpg", alt: "EVVO Solar Inverter" },
  { src: "/assets/images/hero/stabilizer-krykard-1.jpg", alt: "Krykard Stabilizer" },
];

export default function BrandsMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div 
      className="brands-marquee-container"
      role="region" 
      aria-label="Our Trusted Brands"
    >
      <h3 className="text-2xl font-bold text-center mb-6 text-black">Our Trusted Brands</h3>
      
      <div 
        className="marquee-wrapper overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="marquee-content flex gap-8"
          style={{
            animation: prefersReducedMotion || isHovered ? 'none' : 'marquee 30s linear infinite',
            transform: prefersReducedMotion ? 'none' : 'translateX(0)',
          }}
        >
          {/* First set of brands */}
          {brandImages.map((brand, index) => (
            <div key={`brand-1-${index}`} className="flex-shrink-0">
              <img 
                src={brand.src} 
                alt={brand.alt}
                className="h-12 md:h-16 object-contain"
                aria-hidden="true"
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless looping */}
          {brandImages.map((brand, index) => (
            <div key={`brand-2-${index}`} className="flex-shrink-0">
              <img 
                src={brand.src} 
                alt={brand.alt}
                className="h-12 md:h-16 object-contain"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee-wrapper {
          mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%
          );
        }
      `}</style>
    </div>
  );
}