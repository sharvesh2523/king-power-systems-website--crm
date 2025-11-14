"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Phone, Mail, MapPin, Calendar, Filter, Download } from "lucide-react";

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const leads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43210",
      location: "New Delhi",
      capacity: "5 kW",
      source: "Website",
      status: "New",
      createdAt: "2024-01-15",
      estimatedValue: "₹3,00,000",
      notes: "Interested in residential solar with subsidy"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43211",
      location: "Mumbai",
      capacity: "3 kW",
      source: "ROI Calculator",
      status: "Contacted",
      createdAt: "2024-01-14",
      estimatedValue: "₹1,80,000",
      notes: "Requested quote via ROI calculator"
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@example.com",
      phone: "+91 98765 43212",
      location: "Ahmedabad",
      capacity: "100 kW",
      source: "Referral",
      status: "Quote Sent",
      createdAt: "2024-01-13",
      estimatedValue: "₹60,00,000",
      notes: "Commercial project - manufacturing unit"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha@example.com",
      phone: "+91 98765 43213",
      location: "Hyderabad",
      capacity: "7 kW",
      source: "Contact Form",
      status: "Follow-up",
      createdAt: "2024-01-12",
      estimatedValue: "₹4,20,000",
      notes: "Needs site survey scheduled"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@example.com",
      phone: "+91 98765 43214",
      location: "Jaipur",
      capacity: "4 kW",
      source: "Phone Call",
      status: "New",
      createdAt: "2024-01-11",
      estimatedValue: "₹2,40,000",
      notes: "Farmhouse installation inquiry"
    }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    "New": "bg-blue-100 text-blue-700",
    "Contacted": "bg-green-100 text-green-700",
    "Quote Sent": "bg-purple-100 text-purple-700",
    "Follow-up": "bg-yellow-100 text-yellow-700",
    "Won": "bg-emerald-100 text-emerald-700",
    "Lost": "bg-red-100 text-red-700"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all your sales leads</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
              <Plus className="mr-2" size={18} />
              Add New Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="Enter name" className="mt-1" />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" placeholder="email@example.com" className="mt-1" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Phone *</Label>
                  <Input type="tel" placeholder="+91 98765 43210" className="mt-1" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="City, State" className="mt-1" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Desired Capacity</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3kw">1-3 kW</SelectItem>
                      <SelectItem value="3-5kw">3-5 kW</SelectItem>
                      <SelectItem value="5-10kw">5-10 kW</SelectItem>
                      <SelectItem value="10-50kw">10-50 kW</SelectItem>
                      <SelectItem value="50kw-plus">50 kW+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Lead Source</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="roi-calculator">ROI Calculator</SelectItem>
                      <SelectItem value="contact-form">Contact Form</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Estimated Value</Label>
                <Input placeholder="₹3,00,000" className="mt-1" />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional information..." rows={3} className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                Add Lead
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search leads by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <Filter size={18} className="mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Quote Sent">Quote Sent</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download size={18} className="mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{leads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">New</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {leads.filter(l => l.status === "New").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Quote Sent</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {leads.filter(l => l.status === "Quote Sent").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Follow-up</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {leads.filter(l => l.status === "Follow-up").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{lead.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-[#0047BA]">{lead.estimatedValue}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Mail size={14} className="mr-2" />
                        {lead.email}
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-2" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {lead.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        {lead.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-gray-700">Capacity: {lead.capacity}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">Source: {lead.source}</span>
                    </div>

                    {lead.notes && (
                      <p className="text-sm text-gray-600 mt-2 italic">{lead.notes}</p>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-[#0047BA] text-white flex-1">
                      Contact
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
