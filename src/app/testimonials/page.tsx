"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "5 kW System",
      date: "March 2024",
      testimonial: "Outstanding service from King Power Systems! They helped me with complete subsidy application and installed a 5kW system at my home. My electricity bill has reduced from ₹8,000 to just ₹800 per month. The team was professional, punctual, and very knowledgeable. Highly recommended!"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "3 kW System",
      date: "February 2024",
      testimonial: "Best decision to go solar with King Power Systems. They took care of everything - from paperwork to installation to net metering. The quality of panels and inverter is top-notch. I'm saving ₹5,000 every month and contributing to a cleaner environment. Thank you team!"
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Ahmedabad, Gujarat",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "100 kW Commercial",
      date: "January 2024",
      testimonial: "We installed a 100kW system for our manufacturing unit. The ROI is amazing - we're recovering our investment in just 3 years! King Power Systems provided excellent after-sales support and monitoring system. Our monthly savings are over ₹1 lakh."
    },
    {
      id: 4,
      name: "Sneha Reddy",
      location: "Hyderabad, Telangana",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "7 kW System",
      date: "December 2023",
      testimonial: "Excellent experience! The team did a thorough site survey and designed a perfect system for my villa. Installation was completed in just 10 days. The monitoring app is very user-friendly. My electricity bill is now almost zero. 5 stars!"
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "4 kW System",
      date: "November 2023",
      testimonial: "King Power Systems made the entire solar journey hassle-free. From subsidy application to final commissioning, everything was smooth. The quality of work is exceptional. I'm generating 500-600 units per month and my payback period is just 4 years with subsidy."
    },
    {
      id: 6,
      name: "Meera Iyer",
      location: "Bangalore, Karnataka",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "2 kW System",
      date: "October 2023",
      testimonial: "Very professional team! They explained everything clearly and helped me choose the right system size. Installation was neat and clean. I received PM Surya Ghar subsidy of ₹60,000 within a month. My monthly bill reduced from ₹4,000 to ₹500. Super happy!"
    },
    {
      id: 7,
      name: "Arjun Mehta",
      location: "Pune, Maharashtra",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "150 kW Hotel",
      date: "September 2023",
      testimonial: "We installed solar for our hotel in Pune. The system is performing excellently even during monsoon. King Power's O&M service is prompt and reliable. We're saving over ₹1.5 lakhs monthly. Best investment for our business!"
    },
    {
      id: 8,
      name: "Kavita Desai",
      location: "Surat, Gujarat",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "6 kW System",
      date: "August 2023",
      testimonial: "Amazing service quality! The team was very patient in answering all my questions. They used premium Longi panels and Luminous inverter. System has been running flawlessly for 8 months now. I'm earning from excess generation through net metering."
    },
    {
      id: 9,
      name: "Rohit Kapoor",
      location: "Chandigarh",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 5,
      capacity: "10 kW System",
      date: "July 2023",
      testimonial: "King Power Systems exceeded my expectations! They completed installation of 10kW system in record time. The workmanship is excellent and all safety standards were followed. My 3BHK house is now powered by 100% solar energy. Zero electricity bill!"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "₹2Cr+", label: "Savings Generated" },
    { number: "100%", label: "Satisfaction Rate" }
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
              Customer <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-600">
              Hear from our satisfied customers across India who are saving thousands with solar energy
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
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

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-2 hover:border-[#1A5FE8]">
                  <CardContent className="p-6">
                    {/* Quote Icon */}
                    <Quote className="text-[#1A5FE8] opacity-20 mb-4" size={40} />
                    
                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-[#0047BA] font-medium">{testimonial.capacity}</span>
                          <span className="text-xs text-gray-500">{testimonial.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Video <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Watch our customers share their solar journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative bg-gray-200 h-56 flex items-center justify-center">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? '1509391366360-2e959784a276' :
                      item === 2 ? '1508514177221-188b1cf16e9d' :
                      '1473341304170-971dccb5ac1e'
                    }?w=600&h=400&fit=crop`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-[#0047BA] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Customer Success Story</h4>
                  <p className="text-sm text-gray-600">See how solar transformed their life</p>
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
