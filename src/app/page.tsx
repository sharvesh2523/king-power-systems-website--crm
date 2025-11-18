"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sun, Zap, Shield, Users, TrendingUp, Award, Clock, HeadphonesIcon, Target, Eye, Heart, Building2, Factory, Droplets, Battery, Wrench, LineChart, IndianRupee, MapPin, Calculator, Star, Quote } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ImageModal from "@/components/ImageModal";
import GalleryModal from "@/components/GalleryModal";
import ServiceModal from "@/components/ServiceModal";
import CountUp from "@/components/CountUp";

export default function HomePage() {
  // ROI Calculator state
  const [formData, setFormData] = useState({
    monthlyBill: 5000,
    systemSize: 5,
    roofArea: 400,
    location: "delhi",
    electricityRate: 8,
    name: "",
    email: "",
    phone: ""
  });

  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [showResidentialModal, setShowResidentialModal] = useState(false);
  const [showCommercialGallery, setShowCommercialGallery] = useState(false);
  const [showIndustrialGallery, setShowIndustrialGallery] = useState(false);
  const [showBatteryModal, setShowBatteryModal] = useState(false);
  const [showStabilizerModal, setShowStabilizerModal] = useState(false);
  const [showSolarPanelModal, setShowSolarPanelModal] = useState(false);
  const [showOnlineUpsGallery, setShowOnlineUpsGallery] = useState(false);
  const [showUpsInverterGallery, setShowUpsInverterGallery] = useState(false);
  const [showAcDriveModal, setShowAcDriveModal] = useState(false);

  // Testimonial animation effect
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Get testimonial cards
    const card1 = document.querySelector('.testimonial-card-1');
    const card2 = document.querySelector('.testimonial-card-2');
    const card3 = document.querySelector('.testimonial-card-3');
    const card4 = document.querySelector('.testimonial-card-4');
    
    // If reduced motion is preferred, show all cards immediately without animation
    if (prefersReducedMotion) {
      if (card1) {
        card1.classList.add('animate-in');
        card1.classList.add('hover-effect');
      }
      if (card2) {
        card2.classList.add('animate-in');
        card2.classList.add('hover-effect');
      }
      if (card3) {
        card3.classList.add('animate-in');
        card3.classList.add('hover-effect');
      }
      if (card4) {
        card4.classList.add('animate-in');
        card4.classList.add('hover-effect');
      }
      return;
    }
    
    // Add hover effect class to all cards
    if (card1) card1.classList.add('hover-effect');
    if (card2) card2.classList.add('hover-effect');
    if (card3) card3.classList.add('hover-effect');
    if (card4) card4.classList.add('hover-effect');

    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate cards from left
          if (card1) {
            setTimeout(() => {
              card1.classList.add('animate-in');
            }, 0);
          }
          
          if (card2) {
            setTimeout(() => {
              card2.classList.add('animate-in');
            }, 50);
          }
          
          // Animate cards from right
          if (card3) {
            setTimeout(() => {
              card3.classList.add('animate-in');
            }, 0);
          }
          
          if (card4) {
            setTimeout(() => {
              card4.classList.add('animate-in');
            }, 50);
          }
          
          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the section is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before section is fully visible
    });

    // Start observing the testimonials section
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      observer.observe(testimonialsSection);
    }

    // Cleanup function
    return () => {
      if (testimonialsSection) {
        observer.unobserve(testimonialsSection);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // ROI Calculator calculations
  const systemCostPerKW = 60000;
  const subsidyPerKW = formData.systemSize <= 2 ? 30000 : (60000 + (formData.systemSize - 2) * 18000);
  const subsidyCapped = Math.min(subsidyPerKW, 78000);
  const totalSystemCost = formData.systemSize * systemCostPerKW;
  const netCost = totalSystemCost - subsidyCapped;
  
  const annualGeneration = formData.systemSize * 1400; // Units per year (avg 4-5 units per kW per day)
  const monthlySavings = (annualGeneration / 12) * formData.electricityRate;
  const annualSavings = monthlySavings * 12;
  const paybackPeriod = (netCost / annualSavings).toFixed(1);
  const totalSavings25Years = (annualSavings * 25) - netCost;
  const roi = ((totalSavings25Years / netCost) * 100).toFixed(0);

  // Subsidy data
  const subsidyData = [
    { capacity: "1 KWP", unitSaving: "UP TO 300", subsidy: "Rs.30,000", afterInstallation: "Rs.110" },
    { capacity: "2 KWP", unitSaving: "UP TO 600", subsidy: "Rs.60,000", afterInstallation: "Rs.220" },
    { capacity: "3 KWP", unitSaving: "UP TO 900", subsidy: "Rs.78,000", afterInstallation: "Rs.330" },
    { capacity: "4 KWP", unitSaving: "UP TO 1200", subsidy: "Rs.78,000", afterInstallation: "Rs.440" },
    { capacity: "5 KWP", unitSaving: "UP TO 1500", subsidy: "Rs.78,000", afterInstallation: "Rs.550" },
    { capacity: "6 KWP", unitSaving: "UP TO 1800", subsidy: "Rs.78,000", afterInstallation: "Rs.660" },
    { capacity: "7 KWP", unitSaving: "UP TO 2100", subsidy: "Rs.78,000", afterInstallation: "Rs.770" },
    { capacity: "8 KWP", unitSaving: "UP TO 2400", subsidy: "Rs.78,000", afterInstallation: "Rs.880" },
    { capacity: "9 KWP", unitSaving: "UP TO 2700", subsidy: "Rs.78,000", afterInstallation: "Rs.990" },
    { capacity: "10 KWP", unitSaving: "UP TO 3000", subsidy: "Rs.78,000", afterInstallation: "Rs.1100" }
  ];

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleGetQuote = () => {
    setShowLeadForm(true);
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to CRM API
    alert("Thank you! Our team will contact you within 24 hours.");
    setShowLeadForm(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">King Power Systems</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              King power systems is a electrical supply & services and keeping industries and homes powered for over two decades and lighting up innovation through reliable power solutions.
            </p>
            <div className="text-lg text-gray-700 mb-8">
              <p className="mb-4">
                For over 25 years, King Power Systems has been a trusted name in the field of electrical supply and services. Established with a commitment to quality, reliability, and customer satisfaction, we have grown into a leading provider of comprehensive electrical solutions for residential, commercial, and industrial sectors. Our expertise spans across electrical installations, maintenance, repairs, and the supply of high-quality electrical components from top brands. We take pride in building long-term relationships with our clients through dependable service, technical expertise, and a dedication to powering a brighter, more sustainable future.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision and Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#0047BA]">MISSION</h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mt-2 mr-3"></div>
                    <span>Our mission is to deliver reliable, efficient, and sustainable power solutions.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mt-2 mr-3"></div>
                    <span>We aim to empower homes, businesses, and industries with innovative electrical and solar technologies.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#0047BA]">VISION</h2>
                <p className="text-gray-700">
                  Our vision is to become a leading provider of integrated electrical and solar energy solutions, recognized for excellence, trust, and commitment to a greener and more energy-efficient future.
                </p>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#0047BA]">VALUES</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Quality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Teamwork</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Integrity</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">Customer Satisfaction</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact in Numbers Section */}
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              OUR IMPACT IN NUMBERS
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout - 4 items in one row */}
            <div className="hidden md:grid grid-cols-4 gap-8">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div 
                  className="text-5xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={200} duration={0.9} />
                </div>
                <div className="text-gray-600">Solar Panels Installed</div>
              </motion.div>
              
              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-center"
              >
                <div 
                  className="text-5xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={25} duration={0.9} />
                </div>
                <div className="text-gray-600">Years Experience</div>
              </motion.div>
              
              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div 
                  className="text-5xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={600} duration={0.9} />
                </div>
                <div className="text-gray-600">Customers Served</div>
              </motion.div>
              
              {/* Stat 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="text-center"
              >
                <div 
                  className="text-5xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={100} duration={0.9} />
                </div>
                <div className="text-gray-600">Percent Satisfaction</div>
              </motion.div>
            </div>
            
            {/* Tablet Layout - 2 per row */}
            <div className="hidden sm:grid md:hidden grid-cols-2 gap-8">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div 
                  className="text-4xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={200} duration={0.9} />
                </div>
                <div className="text-gray-600">Solar Panels Installed</div>
              </motion.div>
              
              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-center"
              >
                <div 
                  className="text-4xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={25} duration={0.9} />
                </div>
                <div className="text-gray-600">Years Experience</div>
              </motion.div>
              
              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div 
                  className="text-4xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={600} duration={0.9} />
                </div>
                <div className="text-gray-600">Customers Served</div>
              </motion.div>
              
              {/* Stat 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="text-center"
              >
                <div 
                  className="text-4xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={100} duration={0.9} />
                </div>
                <div className="text-gray-600">Percent Satisfaction</div>
              </motion.div>
            </div>
            
            {/* Mobile Layout - 1 per row (center align) */}
            <div className="sm:hidden space-y-8">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div 
                  className="text-3xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={200} duration={0.9} />
                </div>
                <div className="text-gray-600">Solar Panels Installed</div>
              </motion.div>
              
              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-center"
              >
                <div 
                  className="text-3xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={25} duration={0.9} />
                </div>
                <div className="text-gray-600">Years Experience</div>
              </motion.div>
              
              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div 
                  className="text-3xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={600} duration={0.9} />
                </div>
                <div className="text-gray-600">Customers Served</div>
              </motion.div>
              
              {/* Stat 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="text-center"
              >
                <div 
                  className="text-3xl font-bold text-black mb-2"
                  aria-live="polite"
                >
                  <CountUp end={100} duration={0.9} />
                </div>
                <div className="text-gray-600">Percent Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-full mb-6 mx-auto">
              <Wrench className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive power solutions for residential, commercial, and industrial needs
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Solar Panels */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => setShowSolarPanelModal(true)}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">SOLAR PANELS</h3>
                <p className="text-gray-700 mb-4">
                  High-efficiency solar panels for residential and commercial energy generation.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Monocrystalline Panels
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Polycrystalline Panels
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Thin-Film Technology
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    25-Year Warranty
                  </li>
                </ul>
              </motion.div>

              {/* Battery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => setShowBatteryModal(true)}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">BATTERY</h3>
                <p className="text-gray-700 mb-4">
                  High-performance batteries for reliable power backup.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Tubular Batteries
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    SMF Batteries
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Lithium-ion Batteries
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Custom Solutions
                  </li>
                </ul>
              </motion.div>

              {/* Stabilizer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => setShowStabilizerModal(true)}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">STABILIZER</h3>
                <p className="text-gray-700 mb-4">
                  Voltage stabilization for sensitive electronic equipment.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Servo Stabilizers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Relay Stabilizers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Digital Display
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Wide Voltage Range
                  </li>
                </ul>
              </motion.div>

              {/* Solar Water Pumps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => {
                  // Show image popup for solar water pump
                  const imageModal = document.createElement('div');
                  imageModal.innerHTML = `
                    <div id="solar-water-pump-modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                      <div class="relative max-w-4xl max-h-full">
                        <button id="close-modal" class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <img src="/assets/images/hero/solar_water_pump.png" alt="Solar Water Pump" class="max-w-full max-h-full rounded-lg" />
                      </div>
                    </div>
                  `;
                  document.body.appendChild(imageModal);
                  
                  // Add event listener to close modal
                  const closeModalButton = document.getElementById('close-modal');
                  if (closeModalButton) {
                    closeModalButton.addEventListener('click', () => {
                      const modal = document.getElementById('solar-water-pump-modal');
                      if (modal) {
                        modal.remove();
                      }
                    });
                  }
                  
                  // Close modal when clicking outside
                  const modal = document.getElementById('solar-water-pump-modal');
                  if (modal) {
                    modal.addEventListener('click', (e) => {
                      if (e.target instanceof HTMLElement && e.target.id === 'solar-water-pump-modal') {
                        modal.remove();
                      }
                    });
                  }
                }}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">SOLAR WATER PUMPS</h3>
                <p className="text-gray-700 mb-4">
                  Efficient solar-powered water pumping for agriculture and irrigation.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Submersible Pumps
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Surface Pumps
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    DC & AC Systems
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#0047BA] rounded-full mr-3"></div>
                    Remote Monitoring
                  </li>
                </ul>
              </motion.div>

              {/* Solar Inverters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => setShowUpsInverterGallery(true)}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">SOLAR INVERTERS</h3>
                <p className="text-gray-700 mb-4">
                  DEYE, VSOLE, EVVO, POLYCOB RATING-(1-150KWP) STRING INVERTER
                </p>
              </motion.div>

              {/* AC Drives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02]"
                onClick={() => setShowAcDriveModal(true)}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">AC DRIVES/ VFT FOR INDUSTRIAL MOTORS</h3>
                <p className="text-gray-700">
                  PLDC MOTOR IN-BUILD / EXTERNAL DRIVE
                </p>
              </motion.div>

              {/* Online UPS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] md:col-span-2 lg:col-span-1"
                onClick={() => setShowOnlineUpsGallery(true)}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0047BA] transition-colors duration-300 group-hover:text-[#1A5FE8]">ONLINE UPS</h3>
                <p className="text-gray-700">
                  BRANDED UPS= SMF, EXIDE AND AMARON
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white" style={{
        backgroundImage: 'url(/assets/images/hero/heropage2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Projects</span>
            </h2>
          </motion.div>

          {/* Projects Content in Interactive Card Format */}
          <div className="max-w-6xl mx-auto">
            {expandedProject ? (
              // Expanded Project Detail View
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg"
              >
                <button 
                  onClick={() => setExpandedProject(null)}
                  className="mb-6 text-[#0047BA] hover:text-[#1A5FE8] flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Projects
                </button>

                {expandedProject === "residential" && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-[#0047BA]">RESIDENTIAL PROJECTS</h2>
                    <p className="text-gray-700 mb-8 max-w-4xl">
                      We offer complete home energy solutions that ensure safety, comfort, and cost savings. From solar rooftop systems to home UPS, batteries, inverters, and stabilizers, our products are designed to keep your household powered at all times.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">SOLAR INSTALLATION</h3>
                          <p className="text-gray-700 mt-2">60 KWP SOLAR PANEL SYSTEM</p>
                          <p className="text-gray-600">KARUR • INDUSTRIAL SECTOR</p>
                        </div>
                        
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">UPS & BATTERIES</h3>
                          <p className="text-gray-700 mt-2">160Ah BATTERY SYSTEM</p>
                          <p className="text-gray-600">DOMESTIC USE • 60 MONTHS WARRANTY</p>
                        </div>
                        
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">COMPLETE HOME SOLUTION</h3>
                          <p className="text-gray-700 mt-2">INTEGRATED POWER SYSTEM</p>
                          <p className="text-gray-600">SOLAR + UPS + STABILIZER</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
                          <span className="text-gray-500">Residential Project Image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {expandedProject === "commercial" && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-[#0047BA]">COMMERCIAL PROJECTS</h2>
                    <p className="text-gray-700 mb-8 max-w-4xl">
                      We supply and maintain solar energy setups, UPS & backup solutions, stabilizers, and electrical systems for offices, shops, showrooms, and institutions. Our focus is on reducing downtime, improving efficiency, and helping businesses cut energy costs with sustainable power solutions.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">OFFICE BUILDING SOLUTION</h3>
                          <p className="text-gray-700 mt-2">200 KWP SOLAR SYSTEM</p>
                          <p className="text-gray-600">COIMBATORE • CORPORATE OFFICE</p>
                        </div>
                        
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">SHOPPING COMPLEX</h3>
                          <p className="text-gray-700 mt-2">150 KWP SOLAR + UPS</p>
                          <p className="text-gray-600">MADURAI • RETAIL OUTLET</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
                          <span className="text-gray-500">Commercial Project Image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {expandedProject === "industrial" && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-[#0047BA]">INDUSTRIAL PROJECTS</h2>
                    <p className="text-gray-700 mb-8 max-w-4xl">
                      Our solutions are designed to handle heavy electrical loads and continuous operations — ensuring stability, reliability, and energy efficiency across manufacturing plants, warehouses, and large facilities. We also specialize in solar water pumps and power backup systems suited for industrial applications.
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">MANUFACTURING PLANT</h3>
                          <p className="text-gray-700 mt-2">500 KWP SOLAR SYSTEM</p>
                          <p className="text-gray-600">CHENNAI • AUTO COMPONENTS</p>
                        </div>
                        
                        <div className="border-l-4 border-[#0047BA] pl-4 py-1">
                          <h3 className="font-bold text-xl">SOLAR WATER PUMPS</h3>
                          <p className="text-gray-700 mt-2">10 HP PUMP SYSTEM</p>
                          <p className="text-gray-600">TRICHY • AGRICULTURAL USE</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
                          <span className="text-gray-500">Industrial Project Image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              // Card Grid View
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Residential Card */}
                {(projectFilter === "all" || projectFilter === "residential") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setShowResidentialModal(true)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-[#0047BA]">RESIDENTIAL</h2>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0047BA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Complete home energy solutions for safety, comfort, and cost savings.
                    </p>
                    <div className="flex items-center text-[#0047BA] font-medium">
                      <span>View Projects</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* Commercial Card */}
                {(projectFilter === "all" || projectFilter === "commercial") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setShowCommercialGallery(true)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-[#0047BA]">COMMERCIAL</h2>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0047BA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Solar energy setups and backup solutions for businesses and institutions.
                    </p>
                    <div className="flex items-center text-[#0047BA] font-medium">
                      <span>View Projects</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* Industrial Card */}
                {(projectFilter === "all" || projectFilter === "industrial") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setShowIndustrialGallery(true)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-[#0047BA]">INDUSTRIAL</h2>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0047BA]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Heavy-duty solutions for manufacturing plants and large facilities.
                    </p>
                    <div className="flex items-center text-[#0047BA] font-medium">
                      <span>View Projects</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PM Surya Ghar Subsidy Section */}
      <section id="subsidy" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-full mb-6 mx-auto">
              <IndianRupee className="text-white" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">PM SURYA GHAR</span>
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-4">IMP</h3>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Solar Capacity</th>
                    <th className="px-6 py-4 text-left font-semibold">UNIT SAVING</th>
                    <th className="px-6 py-4 text-left font-semibold">SUBSIDY</th>
                    <th className="px-6 py-4 text-left font-semibold">After SOLAR INSTALLATION PAY BILL</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidyData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.capacity}</td>
                      <td className="px-6 py-4 text-gray-700">{row.unitSaving}</td>
                      <td className="px-6 py-4 text-green-600 font-bold">{row.subsidy}</td>
                      <td className="px-6 py-4 text-[#0047BA] font-bold">{row.afterInstallation}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-full mb-6 mx-auto">
              <Calculator className="text-white" size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Solar ROI <span className="gradient-text">Calculator</span>
            </h2>
            <p className="text-xl text-gray-600">
              Calculate your solar savings, payback period, and return on investment
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Enter Your Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="monthlyBill">Monthly Electricity Bill (₹)</Label>
                    <Input
                      id="monthlyBill"
                      type="number"
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: Number(e.target.value) })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>System Size: {formData.systemSize} kW</Label>
                    <Slider
                      value={[formData.systemSize]}
                      onValueChange={(value) => setFormData({ ...formData, systemSize: value[0] })}
                      min={1}
                      max={10}
                      step={0.5}
                      className="mt-4"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>1 kW</span>
                      <span>10 kW</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="roofArea">Available Roof Area (sq ft)</Label>
                    <Input
                      id="roofArea"
                      type="number"
                      value={formData.roofArea}
                      onChange={(e) => setFormData({ ...formData, roofArea: Number(e.target.value) })}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-600 mt-1">Required: ~100 sq ft per kW</p>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                        <SelectItem value="jaipur">Jaipur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Electricity Rate: ₹{formData.electricityRate}/unit</Label>
                    <Slider
                      value={[formData.electricityRate]}
                      onValueChange={(value) => setFormData({ ...formData, electricityRate: value[0] })}
                      min={5}
                      max={15}
                      step={0.5}
                      className="mt-4"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>₹5</span>
                      <span>₹15</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                    size="lg"
                  >
                    <Calculator className="mr-2" size={18} />
                    Calculate Savings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {showResults ? (
                <div className="space-y-6">
                  <Card className="border-2 border-[#1A5FE8] bg-gradient-to-br from-white to-blue-50 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl">Your Solar Investment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">System Cost</p>
                          <p className="text-2xl font-bold text-gray-900">₹{totalSystemCost.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Subsidy</p>
                          <p className="text-2xl font-bold text-green-600">₹{subsidyCapped.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Net Cost After Subsidy</p>
                        <p className="text-3xl font-bold text-[#0047BA]">₹{netCost.toLocaleString()}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Annual Savings</p>
                          <p className="text-2xl font-bold text-green-600">₹{annualSavings.toLocaleString()}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Payback Period</p>
                          <p className="text-2xl font-bold text-gray-900">{paybackPeriod} years</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                        <p className="text-sm text-gray-600 mb-1">25-Year ROI</p>
                        <p className="text-3xl font-bold text-green-600">{roi}%</p>
                        <p className="text-sm text-gray-600 mt-1">Total Savings: ₹{totalSavings25Years.toLocaleString()}</p>
                      </div>
                      
                      <Button
                        onClick={handleGetQuote}
                        className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                        size="lg"
                      >
                        Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-2 border-gray-200 bg-gradient-to-br from-white to-blue-50 shadow-lg h-full flex items-center justify-center">
                  <CardContent className="text-center">
                    <Calculator className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Calculate Your Savings</h3>
                    <p className="text-gray-600">
                      Enter your details to see how much you can save with solar power
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-gray-600">
              What Our Customers Say
            </p>
            <p className="text-lg text-gray-700 mt-4">
              At King Power Systems, we take pride in building lasting relationships with our customers by delivering dependable electrical and solar solutions backed by years of expertise.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg testimonial-card testimonial-card-1">
              <p className="text-gray-700 italic mb-4">
                "We recently installed a solar power system from King Power Systems, and it's been a game-changer for our home. The installation was quick, the team was very professional, and our electricity bills have dropped drastically. Highly recommended!"
              </p>
              <p className="font-semibold">– Suresh Kumar, Homeowner</p>
            </div>
            
            {/* Testimonial Card 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg testimonial-card testimonial-card-2">
              <p className="text-gray-700 italic mb-4">
                "I purchased an inverter and battery combo from King Power Systems. The quality is excellent, and their after-sales support is top-notch. Great service from a trustworthy company!"
              </p>
              <p className="font-semibold">– S. Periyasamy, House owner</p>
            </div>
            
            {/* Testimonial Card 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg testimonial-card testimonial-card-3">
              <p className="text-gray-700 italic mb-4">
                "King Power Systems handled the solar installation for our office. Their team guided us through every step — from design to execution — and we are now saving significantly on power costs."
              </p>
              <p className="font-semibold">– Saravanan, Business Owner</p>
            </div>
            
            {/* Testimonial Card 4 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg testimonial-card testimonial-card-4">
              <p className="text-gray-700 italic mb-4">
                "We've been purchasing UPS systems and stabilizers from King Power Systems for several years. Their reliability and quick service make them our go-to supplier."
              </p>
              <p className="font-semibold">– Palanisamy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Contact</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* GET IN TOUCH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-4">GET IN TOUCH</h3>
              <p className="text-gray-700">
                Fill out the form below with your details, and our representative will get in touch with you shortly. Your inquiry will be sent directly to our official email and WhatsApp, so we can respond quickly and efficiently.
              </p>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg mb-16"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Enter your address"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="inquiry">Orders / Inquiry</Label>
                  <Textarea
                    id="inquiry"
                    placeholder="Please provide details about your order or inquiry"
                    rows={5}
                    className="mt-1"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                  size="lg"
                >
                  Submit
                </Button>
              </form>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg mb-16"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">MAP SECTION</h3>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=King+Power+Systems+Karur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gray-200 rounded-xl overflow-hidden h-[400px] flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:brightness-105"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300 hover:opacity-100 opacity-70">
                  Click to open in Google Maps
                </div>
              </a>
            </motion.div>

            {/* Company Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">COMPANY DETAILS</h3>
              <div className="space-y-4 text-center">
                <p className="text-gray-700">
                  <strong>ADDRESS:</strong> 9/137 Baby illam, Mahatma nagar cut road, LGB nagar main road, Karur-639001.
                </p>
                <p className="text-gray-700">
                  <strong>Phone number:</strong> 9894105091, 9994442091
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> moorthykingups@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>Working hours:</strong> Weekdays 9am - 8 pm
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Residential Gallery Modal */}
      <GalleryModal
        isOpen={showResidentialModal}
        onClose={() => setShowResidentialModal(false)}
        images={[
          {
            src: "/assets/images/hero/residential-5kwp-erode.jpg",
            alt: "5 KWP Solar Panels - Erode",
            title: "5 KWP Solar Panels",
            description: "Erode (Residential)"
          },
          {
            src: "/assets/images/hero/residential-3kwp-erode.jpg",
            alt: "3 KWP Solar Panels - Erode",
            title: "3 KWP Solar Panels",
            description: "Erode (Residential)"
          }
        ]}
      />

      {/* Commercial Gallery Modal */}
      <GalleryModal
        isOpen={showCommercialGallery}
        onClose={() => setShowCommercialGallery(false)}
        images={[
          {
            src: "/assets/images/hero/commercial-90kwp-coimbatore.jpg",
            alt: "90 KWP Solar Panels - Coimbatore",
            title: "90 KWP Solar Panels",
            description: "Coimbatore (Commercial)"
          },
          {
            src: "/assets/images/hero/commercial-100kwp-namakkal.jpg",
            alt: "100 KWP Solar Panels - Namakkal",
            title: "100 KWP Solar Panels",
            description: "Namakkal (Commercial)"
          }
        ]}
      />

      {/* Battery Modal */}
      <ServiceModal
        isOpen={showBatteryModal}
        onClose={() => setShowBatteryModal(false)}
        imageUrl={encodeURI("/assets/images/hero/EXIDE BATTERY.jpeg")}
        altText="EXIDE Battery"
        title="EXIDE Battery"
        description="EXIDE Battery – Lead Acid & Lithium Battery Options"
      />

      {/* Stabilizer Modal */}
      <ServiceModal
        isOpen={showStabilizerModal}
        onClose={() => setShowStabilizerModal(false)}
        imageUrl={encodeURI("/assets/images/hero/KRYKARD STABILIZER 1.jpg")}
        altText="KryKard Stabilizer"
        title="KryKard Stabilizer"
        description="KryKard Industrial & Domestic Stabilizers (1KW – 500KVA)"
      />

      {/* Online UPS Gallery Modal */}
      <GalleryModal
        isOpen={showOnlineUpsGallery}
        onClose={() => setShowOnlineUpsGallery(false)}
        images={[
          {
            src: encodeURI("/assets/images/hero/LUMINOUS UPS.jpeg"),
            alt: "Luminous Online UPS",
            title: "Luminous Online UPS",
            description: "Luminous branded online UPS systems with reliable power backup"
          },
          {
            src: encodeURI("/assets/images/hero/EXIDE UPS.jpeg"),
            alt: "Exide Online UPS",
            title: "Exide Online UPS",
            description: "Exide branded online UPS systems for continuous power supply"
          },
          {
            src: encodeURI("/assets/images/hero/AMARON UPS.jpeg"),
            alt: "Amaron Online UPS",
            title: "Amaron Online UPS",
            description: "Amaron branded online UPS systems for uninterrupted power"
          }
        ]}
      />

      {/* Solar Inverters Gallery Modal */}
      <GalleryModal
        isOpen={showUpsInverterGallery}
        onClose={() => setShowUpsInverterGallery(false)}
        images={[
          {
            src: encodeURI("/assets/images/hero/VSOLAR SOLAR INVERTER 1.webp"),
            alt: "V-Solar Solar Inverter",
            title: "V-Solar Solar Inverter",
            description: "High-Efficiency Solar Power Conversion"
          },
          {
            src: encodeURI("/assets/images/hero/POYCAB SOLAR INVERTER.webp"),
            alt: "Poycab Solar Inverter",
            title: "Poycab Solar Inverter",
            description: "Reliable Solar Inverter for Homes & Industries"
          },
          {
            src: encodeURI("/assets/images/hero/EVVO SOLAR INVERTER.JPG"),
            alt: "EVVO Solar Inverter",
            title: "EVVO Solar Inverter",
            description: "Advanced MPPT Solar Inverter System"
          }
        ]}
      />

      {/* AC Drive Modal */}
      <ServiceModal
        isOpen={showAcDriveModal}
        onClose={() => setShowAcDriveModal(false)}
        imageUrl={encodeURI("/assets/images/hero/ac drive.jpg")}
        altText="AC Drive Service"
        title="AC Drive Service"
        description="AC Drive / VFD — Industrial Motor Variable Frequency Drive System"
      />

      {/* Solar Panel Modal */}
      <ServiceModal
        isOpen={showSolarPanelModal}
        onClose={() => setShowSolarPanelModal(false)}
        imageUrl={encodeURI("/assets/images/hero/solar panel.jpg")}
        altText="Solar Panel Service"
        title="Solar Panels"
        description="High-efficiency solar panels for residential and commercial energy generation."
      />

      {/* Industrial Gallery Modal */}
      <GalleryModal
        isOpen={showIndustrialGallery}
        onClose={() => setShowIndustrialGallery(false)}
        images={[{
            src: "/assets/images/hero/commercial-100kwp-namakkal.jpg",
            alt: "100 KWP Solar Panels - Namakkal",
            title: "100 KWP Solar Panels",
            description: "Namakkal (Industrial)"
          }
        ]}
      />
    </div>
  );
}