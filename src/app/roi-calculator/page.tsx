"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Zap, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function ROICalculatorPage() {
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

  // Calculations
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
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] rounded-full mb-6">
              <Calculator className="text-white" size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solar ROI <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-xl text-gray-600">
              Calculate your solar savings, payback period, and return on investment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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
              animate={{ opacity: 1, x: 0 }}
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
                      <div className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] rounded-lg p-6 text-white">
                        <p className="text-sm mb-1">Net Investment (After Subsidy)</p>
                        <p className="text-4xl font-bold">₹{netCost.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl">Savings & Returns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="text-green-600" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Monthly Savings</p>
                            <p className="text-2xl font-bold text-green-600">₹{Math.round(monthlySavings).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Zap className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Annual Generation</p>
                            <p className="text-2xl font-bold text-blue-600">{annualGeneration} units</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Calendar className="text-orange-600" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Payback Period</p>
                            <p className="text-2xl font-bold text-orange-600">{paybackPeriod} years</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="text-purple-600" size={24} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">25-Year ROI</p>
                            <p className="text-2xl font-bold text-purple-600">{roi}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 text-white">
                        <p className="text-sm mb-1">Total Savings (25 Years)</p>
                        <p className="text-4xl font-bold">₹{Math.round(totalSavings25Years).toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {!showLeadForm ? (
                    <Button
                      onClick={handleGetQuote}
                      className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                      size="lg"
                    >
                      Get Detailed Quote
                    </Button>
                  ) : (
                    <Card className="border-2 border-[#1A5FE8]">
                      <CardHeader>
                        <CardTitle>Get Your Detailed Quote</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmitLead} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                            Submit & Get Quote
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300">
                  <Calculator className="text-gray-400 mb-4" size={64} />
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">Ready to Calculate?</h3>
                  <p className="text-gray-600 text-center">
                    Enter your details on the left and click Calculate to see your potential savings
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Understanding Your Calculations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assumptions Used</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Average daily generation: 4-5 units per kW</p>
                  <p>• System cost: ₹60,000 per kW (before subsidy)</p>
                  <p>• PM Surya Ghar subsidy included</p>
                  <p>• 25 years system lifespan</p>
                  <p>• 0.7% annual degradation rate</p>
                  <p>• Net metering facility available</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <p>• Solar panels & mounting structures</p>
                  <p>• Solar inverter & accessories</p>
                  <p>• Installation & commissioning</p>
                  <p>• Net meter installation support</p>
                  <p>• Subsidy application assistance</p>
                  <p>• 25 years panel warranty</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
