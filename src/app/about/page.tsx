"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, TrendingUp, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "We never compromise on quality. Every component is rigorously tested to ensure maximum performance and longevity."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do. We're committed to exceeding expectations at every touchpoint."
    },
    {
      icon: Heart,
      title: "Sustainability",
      description: "We're passionate about creating a cleaner, greener future through renewable energy solutions."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every project, from design to installation to after-sales service."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously adopt the latest technologies to provide cutting-edge solar solutions."
    },
    {
      icon: Zap,
      title: "Reliability",
      description: "We deliver on our promises with consistent, dependable service you can count on."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "5MW+", label: "Power Installed" },
    { number: "₹2Cr+", label: "Savings Generated" },
    { number: "25+", label: "Years Warranty" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "Priya Sharma",
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      name: "Amit Patel",
      role: "Operations Head",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      name: "Sneha Reddy",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    }
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
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">King Power Systems</span>
            </h1>
            <p className="text-xl text-gray-600">
              Leading the solar revolution in India with world-class technology and unmatched customer service
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#0047BA] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] text-white rounded-2xl p-8 md:p-12"
            >
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-white/90 text-lg">
                To make clean, affordable solar energy accessible to every home and business in India, helping reduce carbon footprint while maximizing savings through innovative technology and exceptional service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 border-2 border-[#1A5FE8]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-lg flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                To become India's most trusted solar energy solutions provider, powering a sustainable future where renewable energy is the primary source of electricity for millions of households and enterprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 text-left">
                <p>
                  Founded in 2015, King Power Systems began with a simple vision: to make solar energy accessible and affordable for every Indian household and business. What started as a small team of passionate engineers has grown into one of India's leading solar installation companies.
                </p>
                <p>
                  Over the years, we've installed more than 5MW of solar capacity across residential, commercial, and industrial sectors, helping our customers save over ₹2 crores in electricity bills while contributing to a cleaner environment.
                </p>
                <p>
                  Today, we partner with the world's leading solar equipment manufacturers and maintain the highest standards of quality and service. Our commitment to excellence has earned us the trust of over 500 satisfied customers across India.
                </p>
                <p>
                  As India moves towards its ambitious renewable energy targets, we're proud to be at the forefront of this green revolution, one solar panel at a time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1A5FE8] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="gradient-text">Leadership Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your solar journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-[#1A5FE8]">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
