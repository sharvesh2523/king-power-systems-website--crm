"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sun, Zap, Shield, Users, TrendingUp, Award, Clock, HeadphonesIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: Sun,
      title: "Premium Solar Panels",
      description: "Tier-1 panels with 25+ years warranty from leading brands like Longi, Jinko, and Canadian Solar."
    },
    {
      icon: Zap,
      title: "Maximum Efficiency",
      description: "High-efficiency modules with up to 22% conversion rate for optimal power generation."
    },
    {
      icon: Shield,
      title: "Complete Protection",
      description: "Comprehensive warranty coverage and insurance for complete peace of mind."
    },
    {
      icon: Users,
      title: "Expert Installation",
      description: "Certified engineers with 10+ years experience ensuring perfect setup."
    },
    {
      icon: TrendingUp,
      title: "90% Bill Savings",
      description: "Reduce your electricity costs by up to 90% with our efficient solar systems."
    },
    {
      icon: Award,
      title: "Government Subsidies",
      description: "Avail PM Surya Ghar subsidies up to ₹78,000 on residential installations."
    },
    {
      icon: Clock,
      title: "Quick Installation",
      description: "Get your system up and running within 15-30 days of order confirmation."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Dedicated customer support and maintenance services throughout the year."
    }
  ];

  const brands = [
    { name: "Longi Solar", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop" },
    { name: "Jinko Solar", logo: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=200&h=100&fit=crop" },
    { name: "Canadian Solar", logo: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=200&h=100&fit=crop" },
    { name: "Trina Solar", logo: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=200&h=100&fit=crop" },
    { name: "Luminous", logo: "https://images.unsplash.com/photo-1565034946487-077786996e27?w=200&h=100&fit=crop" },
    { name: "Havells", logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=200&h=100&fit=crop" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">King Power Systems</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver world-class solar solutions with unmatched quality, service, and value
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#1A5FE8] transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted <span className="gradient-text">Global Brands</span>
            </h2>
            <p className="text-gray-600">
              We partner with world's leading solar equipment manufacturers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow grayscale hover:grayscale-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-16 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Ready to Go Solar?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8 text-white/90"
            >
              Get a free consultation and customized quote for your property. Our experts will help you maximize savings with government subsidies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <Button size="lg" className="bg-white text-[#0047BA] hover:bg-gray-100">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/roi-calculator">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Calculate Your Savings
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}