"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Residential Villa - Delhi",
      category: "residential",
      capacity: "5 kW",
      location: "New Delhi",
      date: "March 2024",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      description: "Complete rooftop solar installation with net metering"
    },
    {
      id: 2,
      title: "Apartment Complex - Mumbai",
      category: "residential",
      capacity: "50 kW",
      location: "Mumbai, Maharashtra",
      date: "February 2024",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      description: "Multi-unit residential solar system with shared benefits"
    },
    {
      id: 3,
      title: "Office Building - Bangalore",
      category: "commercial",
      capacity: "100 kW",
      location: "Bangalore, Karnataka",
      date: "January 2024",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      description: "Commercial rooftop with battery backup system"
    },
    {
      id: 4,
      title: "Shopping Mall - Pune",
      category: "commercial",
      capacity: "200 kW",
      location: "Pune, Maharashtra",
      date: "December 2023",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop",
      description: "Large-scale commercial installation with monitoring"
    },
    {
      id: 5,
      title: "Manufacturing Plant - Gujarat",
      category: "industrial",
      capacity: "500 kW",
      location: "Ahmedabad, Gujarat",
      date: "November 2023",
      image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=400&fit=crop",
      description: "Industrial solar plant with grid integration"
    },
    {
      id: 6,
      title: "Warehouse - Hyderabad",
      category: "industrial",
      capacity: "250 kW",
      location: "Hyderabad, Telangana",
      date: "October 2023",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      description: "Industrial rooftop with remote monitoring"
    },
    {
      id: 7,
      title: "Farmhouse - Jaipur",
      category: "residential",
      capacity: "7 kW",
      location: "Jaipur, Rajasthan",
      date: "September 2023",
      image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=400&fit=crop",
      description: "Off-grid solar system with battery storage"
    },
    {
      id: 8,
      title: "Hotel - Goa",
      category: "commercial",
      capacity: "150 kW",
      location: "Goa",
      date: "August 2023",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      description: "Hospitality sector solar installation"
    },
    {
      id: 9,
      title: "Textile Factory - Surat",
      category: "industrial",
      capacity: "750 kW",
      location: "Surat, Gujarat",
      date: "July 2023",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
      description: "Mega solar plant for industrial operations"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

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
              Our <span className="gradient-text">Solar Projects</span>
            </h1>
            <p className="text-xl text-gray-600">
              Explore our portfolio of successful solar installations across India
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" ? "bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white" : ""}
            >
              All Projects
            </Button>
            <Button
              onClick={() => setFilter("residential")}
              variant={filter === "residential" ? "default" : "outline"}
              className={filter === "residential" ? "bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white" : ""}
            >
              Residential
            </Button>
            <Button
              onClick={() => setFilter("commercial")}
              variant={filter === "commercial" ? "default" : "outline"}
              className={filter === "commercial" ? "bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white" : ""}
            >
              Commercial
            </Button>
            <Button
              onClick={() => setFilter("industrial")}
              variant={filter === "industrial" ? "default" : "outline"}
              className={filter === "industrial" ? "bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white" : ""}
            >
              Industrial
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-[#1A5FE8] group"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-[#0047BA]">
                    {project.capacity}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#0047BA]/10 to-[#1A5FE8]/10 rounded-full text-xs font-medium text-[#0047BA] mb-3 capitalize">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-[#1A5FE8]" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Zap size={16} className="mr-2 text-[#1A5FE8]" />
                      {project.capacity} Capacity
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-[#1A5FE8]" />
                      {project.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">Projects Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">5MW+</div>
              <div className="text-white/80">Capacity Installed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-white/80">Cities Covered</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">₹2Cr+</div>
              <div className="text-white/80">Savings Generated</div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
