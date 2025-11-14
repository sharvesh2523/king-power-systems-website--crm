"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Download, FileText, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubsidyPage() {
  const subsidyTable = [
    { capacity: "1 kW", subsidy: "₹30,000", rate: "₹30,000/kW", total: "~₹60,000", afterSubsidy: "~₹30,000" },
    { capacity: "2 kW", subsidy: "₹60,000", rate: "₹30,000/kW", total: "~₹1,20,000", afterSubsidy: "~₹60,000" },
    { capacity: "3 kW", subsidy: "₹78,000", rate: "₹26,000/kW", total: "~₹1,80,000", afterSubsidy: "~₹1,02,000" },
    { capacity: "4 kW", subsidy: "₹78,000", rate: "₹19,500/kW", total: "~₹2,40,000", afterSubsidy: "~₹1,62,000" },
    { capacity: "5 kW", subsidy: "₹78,000", rate: "₹15,600/kW", total: "~₹3,00,000", afterSubsidy: "~₹2,22,000" },
    { capacity: "10 kW", subsidy: "₹78,000", rate: "₹7,800/kW", total: "~₹6,00,000", afterSubsidy: "~₹5,22,000" }
  ];

  const eligibility = [
    "Individual house owners (residential)",
    "Group housing societies/apartments",
    "Freehold property owners",
    "Leasehold property with landlord consent",
    "Properties with electricity connection",
    "Roof rights available for installation"
  ];

  const documents = [
    "Aadhaar Card",
    "Electricity Bill (latest)",
    "Property Documents",
    "Bank Account Details",
    "Passport Size Photos",
    "Identity & Address Proof"
  ];

  const process = [
    { step: "1", title: "Register Online", description: "Register on PM Surya Ghar portal with Aadhaar" },
    { step: "2", title: "Apply for Subsidy", description: "Submit online application with required documents" },
    { step: "3", title: "Technical Feasibility", description: "DISCOM approval and site verification" },
    { step: "4", title: "Install System", description: "Install solar system with empaneled vendor" },
    { step: "5", title: "Net Meter Installation", description: "Net meter installation by DISCOM" },
    { step: "6", title: "Receive Subsidy", description: "Subsidy credited to bank account within 30 days" }
  ];

  const benefits = [
    "Up to ₹78,000 direct subsidy from government",
    "Reduce electricity bills by 90%",
    "30% Accelerated Depreciation benefit",
    "Net metering facility",
    "Earn from excess power generation",
    "25+ years of clean energy",
    "Increase property value",
    "Zero fuel cost for lifetime"
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
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white rounded-full text-sm font-medium">
              🏛️ Government of India Scheme
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">PM Surya Ghar</span> Subsidy Scheme
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get up to ₹78,000 subsidy on rooftop solar installation under PM Surya Ghar: Muft Bijli Yojana
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                Apply for Subsidy
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Subsidy Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Subsidy <span className="gradient-text">Amount Details</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Direct subsidy from central government based on system capacity
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">System Capacity</th>
                  <th className="px-6 py-4 text-left font-semibold">Subsidy Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">Per kW Rate</th>
                  <th className="px-6 py-4 text-left font-semibold">Approx. Total Cost</th>
                  <th className="px-6 py-4 text-left font-semibold">After Subsidy</th>
                </tr>
              </thead>
              <tbody>
                {subsidyTable.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.capacity}</td>
                    <td className="px-6 py-4 text-green-600 font-bold">{row.subsidy}</td>
                    <td className="px-6 py-4 text-gray-700">{row.rate}</td>
                    <td className="px-6 py-4 text-gray-700">{row.total}</td>
                    <td className="px-6 py-4 text-[#0047BA] font-bold">{row.afterSubsidy}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              * Subsidy: ₹30,000/kW for first 2 kW, ₹18,000/kW for additional capacity up to 3 kW
            </p>
            <Link href="/roi-calculator">
              <Button variant="outline" className="border-[#0047BA] text-[#0047BA]">
                <IndianRupee className="mr-2" size={18} />
                Calculate Your Savings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Eligibility Criteria</h2>
              <div className="space-y-3">
                {eligibility.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg"
                  >
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Required Documents</h2>
              <div className="space-y-3">
                {documents.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg"
                  >
                    <FileText className="text-[#0047BA] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Application <span className="gradient-text">Process</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple 6-step process to avail PM Surya Ghar subsidy
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
                className="relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#1A5FE8] hover:shadow-lg transition-all"
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

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Scheme <span className="gradient-text">Benefits</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Why you should install solar under PM Surya Ghar Yojana
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <CheckCircle2 className="text-green-600 mb-3" size={24} />
                <p className="text-gray-700">{benefit}</p>
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
              Ready to Apply for Subsidy?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8 text-white/90"
            >
              We'll help you with complete documentation and application process
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
                  Get Free Consultation
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2" size={18} />
                Download Brochure
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
