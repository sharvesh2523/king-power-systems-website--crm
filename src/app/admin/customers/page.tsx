"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Phone, Mail, MapPin, Calendar, DollarSign, Zap, FileText, Plus } from "lucide-react";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      location: "New Delhi",
      systemSize: "5 kW",
      installDate: "2024-01-15",
      totalSpent: "₹2,22,000",
      status: "Active",
      type: "Residential",
      lastService: "2024-03-10",
      projects: 1,
      invoices: 2
    },
    {
      id: 2,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 98765 43212",
      location: "Ahmedabad",
      systemSize: "100 kW",
      installDate: "2024-01-13",
      totalSpent: "₹60,00,000",
      status: "Active",
      type: "Commercial",
      lastService: "2024-03-15",
      projects: 1,
      invoices: 3
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43211",
      location: "Mumbai",
      systemSize: "3 kW",
      installDate: "2023-12-20",
      totalSpent: "₹1,20,000",
      status: "Active",
      type: "Residential",
      lastService: "2024-02-28",
      projects: 1,
      invoices: 1
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha@example.com",
      phone: "+91 98765 43213",
      location: "Hyderabad",
      systemSize: "7 kW",
      installDate: "2023-11-10",
      totalSpent: "₹4,42,000",
      status: "Active",
      type: "Residential",
      lastService: "2024-03-05",
      projects: 1,
      invoices: 2
    },
    {
      id: 5,
      name: "Arjun Mehta",
      email: "arjun@example.com",
      phone: "+91 98765 43215",
      location: "Pune",
      systemSize: "15 kW",
      installDate: "2023-10-15",
      totalSpent: "₹9,00,000",
      status: "Active",
      type: "Commercial",
      lastService: "2024-03-01",
      projects: 1,
      invoices: 4
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Database</h1>
          <p className="text-gray-600 mt-1">Manage all your customer information</p>
        </div>
        <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
          <Plus className="mr-2" size={18} />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Active Systems</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Capacity</p>
            <p className="text-2xl font-bold text-[#0047BA] mt-1">130 kW</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Lifetime Value</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">₹77L</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <div className="grid gap-4">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] text-white text-lg">
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{customer.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-100 text-green-700">{customer.status}</Badge>
                        <Badge variant="outline">{customer.type}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="flex-1 grid md:grid-cols-2 gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={14} className="mr-2 text-[#0047BA]" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-2 text-[#0047BA]" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={14} className="mr-2 text-[#0047BA]" />
                      {customer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={14} className="mr-2 text-[#0047BA]" />
                      Installed: {customer.installDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Zap size={14} className="mr-2 text-[#0047BA]" />
                      System: {customer.systemSize}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign size={14} className="mr-2 text-[#0047BA]" />
                      Total: {customer.totalSpent}
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600">Projects</p>
                      <p className="text-xl font-bold text-blue-600">{customer.projects}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-600">Invoices</p>
                      <p className="text-xl font-bold text-purple-600">{customer.invoices}</p>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-600">
                  <span>Last Service: {customer.lastService}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText size={14} className="mr-1" />
                      Documents
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone size={14} className="mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Customer Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="type">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="type">By Type</TabsTrigger>
              <TabsTrigger value="location">By Location</TabsTrigger>
              <TabsTrigger value="revenue">By Revenue</TabsTrigger>
            </TabsList>
            <TabsContent value="type" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Residential</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {customers.filter(c => c.type === "Residential").length}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Commercial</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {customers.filter(c => c.type === "Commercial").length}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location" className="mt-4">
              <p className="text-gray-600">Location distribution chart would go here</p>
            </TabsContent>
            <TabsContent value="revenue" className="mt-4">
              <p className="text-gray-600">Revenue analytics would go here</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
