"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Home, Building2, Factory, Droplets, Battery, Wrench, LineChart, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Residential Solar Systems",
      description: "Complete rooftop solar solutions for homes with 1kW to 10kW capacity. Reduce your electricity bills by up to 90% with government subsidies up to ₹78,000.",
      features: ["Net Metering Setup", "25 Years Warranty", "Government Subsidy Assistance", "EMI Options Available"],
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
    },
    {
      icon: Building2,
      title: "Commercial Solar Solutions",
      description: "Customized solar installations for offices, shops, and commercial buildings. Maximize your ROI with tax benefits and accelerated depreciation.",
      features: ["Large Scale Systems", "Power Purchase Agreements", "Tax Benefits", "Quick Payback Period"],
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop"
    },
    {
      icon: Factory,
      title: "Industrial Solar Plants",
      description: "High-capacity solar power plants for industries and manufacturing units. Reduce operational costs significantly with clean energy.",
      features: ["Mega-Watt Scale", "Grid-Tied Systems", "OPEX/CAPEX Models", "Remote Monitoring"],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop"
    },
    {
      icon: Droplets,
      title: "Solar Water Pumps",
      description: "Efficient solar-powered water pumping solutions for agriculture and irrigation. Eliminate diesel costs and ensure reliable water supply.",
      features: ["5 HP to 20 HP", "Drip Irrigation Compatible", "Subsidy Available", "Low Maintenance"],
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop"
    },
    {
      icon: Battery,
      title: "Battery Storage Systems",
      description: "Advanced lithium-ion battery storage solutions for 24/7 power backup. Store excess solar energy for nighttime use.",
      features: ["Lithium-Ion Technology", "10+ Years Life", "Smart Monitoring", "Hybrid Inverters"],
      image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=600&h=400&fit=crop"
    },
    {
      icon: Wrench,
      title: "Installation & Commissioning",
      description: "Professional installation services by certified engineers. Complete turnkey solutions from design to grid connection.",
      features: ["Site Survey", "Structural Design", "Safety Compliance", "Grid Integration"],
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop"
    },
    {
      icon: LineChart,
      title: "Performance Monitoring",
      description: "Real-time monitoring and analytics of your solar system. Track energy generation, savings, and system health remotely.",
      features: ["Mobile App Access", "Alert Notifications", "Performance Reports", "Predictive Maintenance"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      icon: HeadphonesIcon,
      title: "O&M Services",
      description: "Comprehensive operation and maintenance services. Keep your solar system running at peak efficiency with regular servicing.",
      features: ["Annual Maintenance", "Panel Cleaning", "Component Replacement", "Performance Optimization"],
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop"
    }
  ];

  const brands = [
    { name: "Longi Solar", type: "Solar Panels" },
    { name: "Jinko Solar", type: "Solar Panels" },
    { name: "Canadian Solar", type: "Solar Panels" },
    { name: "Trina Solar", type: "Solar Panels" },
    { name: "Luminous", type: "Inverters & Batteries" },
    { name: "Havells", type: "Inverters" },
    { name: "Growatt", type: "Inverters" },
    { name: "Sungrow", type: "Inverters" },
    { name: "Tesla", type: "Battery Storage" },
    { name: "LG Chem", type: "Battery Storage" }
  ];

  const process = [
    { step: "1", title: "Consultation", description: "Free site visit and requirement analysis" },
    { step: "2", title: "Design", description: "Custom system design and proposal" },
    { step: "3", title: "Approval", description: "Government permits and approvals" },
    { step: "4", title: "Installation", description: "Professional installation in 7-15 days" },
    { step: "5", title: "Commissioning", description: "Grid connection and net metering" },
    { step: "6", title: "Support", description: "Ongoing monitoring and maintenance" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Solar Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive solar energy solutions for every need - from residential to industrial installations
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                Get Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#1A5FE8] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <service.icon className="text-[#0047BA]" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-[#1A5FE8] rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <Button className="w-full mt-6 bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Installation Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and hassle-free process from start to finish
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Premium <span className="gradient-text">Equipment Brands</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We use only Tier-1 certified equipment from world's leading manufacturers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 text-center border-2 border-gray-200 hover:border-[#1A5FE8] transition-colors"
              >
                <div className="text-lg font-semibold text-gray-900 mb-1">{brand.name}</div>
                <div className="text-xs text-gray-600">{brand.type}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
