"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Download, Eye, Send, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const quotes = [
    {
      id: "Q-2024-001",
      customerName: "Rajesh Kumar",
      systemSize: "5 kW",
      systemType: "Residential On-Grid",
      totalAmount: "₹3,00,000",
      subsidyAmount: "₹78,000",
      netAmount: "₹2,22,000",
      status: "Sent",
      validUntil: "2024-02-15",
      createdDate: "2024-01-15",
      items: [
        { name: "Solar Panels (Longi 545W)", qty: 10, rate: 25000, amount: 250000 },
        { name: "Solar Inverter (5kW)", qty: 1, rate: 45000, amount: 45000 },
        { name: "Mounting Structure", qty: 1, rate: 15000, amount: 15000 },
        { name: "Installation & Commissioning", qty: 1, rate: 20000, amount: 20000 }
      ]
    },
    {
      id: "Q-2024-002",
      customerName: "Amit Patel",
      systemSize: "100 kW",
      systemType: "Commercial On-Grid",
      totalAmount: "₹60,00,000",
      subsidyAmount: "₹0",
      netAmount: "₹60,00,000",
      status: "Accepted",
      validUntil: "2024-02-13",
      createdDate: "2024-01-13",
      items: []
    },
    {
      id: "Q-2024-003",
      customerName: "Priya Sharma",
      systemSize: "3 kW",
      systemType: "Residential On-Grid",
      totalAmount: "₹1,80,000",
      subsidyAmount: "₹60,000",
      netAmount: "₹1,20,000",
      status: "Draft",
      validUntil: "2024-02-14",
      createdDate: "2024-01-14",
      items: []
    },
    {
      id: "Q-2024-004",
      customerName: "Sneha Reddy",
      systemSize: "7 kW",
      systemType: "Residential Hybrid",
      totalAmount: "₹5,20,000",
      subsidyAmount: "₹78,000",
      netAmount: "₹4,42,000",
      status: "Sent",
      validUntil: "2024-02-12",
      createdDate: "2024-01-12",
      items: []
    }
  ];

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || quote.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    "Draft": "bg-gray-100 text-gray-700",
    "Sent": "bg-blue-100 text-blue-700",
    "Accepted": "bg-green-100 text-green-700",
    "Rejected": "bg-red-100 text-red-700",
    "Expired": "bg-orange-100 text-orange-700"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotation Generator</h1>
          <p className="text-gray-600 mt-1">Create and manage quotes with PDF export</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
              <Plus className="mr-2" size={18} />
              Create New Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quotation</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Customer Name *</Label>
                  <Input placeholder="Enter customer name" className="mt-1" />
                </div>
                <div>
                  <Label>Quote Date *</Label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>System Size *</Label>
                  <Input placeholder="e.g., 5 kW" className="mt-1" />
                </div>
                <div>
                  <Label>System Type *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential-ongrid">Residential On-Grid</SelectItem>
                      <SelectItem value="residential-offgrid">Residential Off-Grid</SelectItem>
                      <SelectItem value="residential-hybrid">Residential Hybrid</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Valid Until *</Label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>

              {/* Line Items */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Quote Items</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
                    <div className="col-span-5">Item Description</div>
                    <div className="col-span-2">Qty</div>
                    <div className="col-span-2">Rate</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="grid grid-cols-12 gap-2">
                    <Input placeholder="Solar Panels" className="col-span-5" />
                    <Input type="number" placeholder="10" className="col-span-2" />
                    <Input type="number" placeholder="25000" className="col-span-2" />
                    <Input placeholder="₹2,50,000" disabled className="col-span-2" />
                    <Button variant="outline" size="sm" className="col-span-1">×</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus size={14} className="mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <Label>Subtotal</Label>
                  <Input placeholder="₹3,00,000" disabled className="mt-1" />
                </div>
                <div>
                  <Label>Subsidy</Label>
                  <Input placeholder="₹78,000" className="mt-1" />
                </div>
                <div>
                  <Label className="font-semibold">Net Amount</Label>
                  <Input placeholder="₹2,22,000" disabled className="mt-1 font-semibold" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                  Create Quote
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  Save as Draft
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Quotes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{quotes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Sent</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {quotes.filter(q => q.status === "Sent").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Accepted</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {quotes.filter(q => q.status === "Accepted").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-[#0047BA] mt-1">₹69L</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search quotes by customer or ID..."
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
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes List */}
      <div className="grid gap-4">
        {filteredQuotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{quote.customerName}</h3>
                        <p className="text-sm text-gray-600">{quote.id}</p>
                      </div>
                      <Badge className={statusColors[quote.status]}>
                        {quote.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">System Size</p>
                        <p className="font-semibold">{quote.systemSize} - {quote.systemType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created</p>
                        <p className="font-semibold">{quote.createdDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Valid Until</p>
                        <p className="font-semibold">{quote.validUntil}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Subsidy</p>
                        <p className="font-semibold text-green-600">{quote.subsidyAmount}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#0047BA]/10 to-[#1A5FE8]/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-2xl font-bold text-[#0047BA]">{quote.netAmount}</p>
                          {quote.subsidyAmount !== "₹0" && (
                            <p className="text-xs text-gray-500">Before subsidy: {quote.totalAmount}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download size={14} className="mr-1" />
                      PDF
                    </Button>
                    <Button size="sm" className="bg-[#0047BA] text-white flex-1">
                      <Send size={14} className="mr-1" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
