"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, Send, Eye, Search, Filter, DollarSign, FileText, Clock, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const invoices = [
    {
      id: "INV-2024-001",
      customerName: "Rajesh Kumar",
      project: "5 kW Residential Solar",
      amount: "₹2,22,000",
      tax: "₹39,960",
      total: "₹2,61,960",
      status: "Paid",
      dueDate: "2024-01-20",
      paidDate: "2024-01-18",
      issueDate: "2024-01-15",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "INV-2024-002",
      customerName: "Amit Patel",
      project: "100 kW Commercial Solar",
      amount: "₹60,00,000",
      tax: "₹10,80,000",
      total: "₹70,80,000",
      status: "Pending",
      dueDate: "2024-02-15",
      paidDate: null,
      issueDate: "2024-01-13",
      paymentMethod: null
    },
    {
      id: "INV-2024-003",
      customerName: "Priya Sharma",
      project: "3 kW Residential Solar",
      amount: "₹1,20,000",
      tax: "₹21,600",
      total: "₹1,41,600",
      status: "Overdue",
      dueDate: "2024-01-10",
      paidDate: null,
      issueDate: "2023-12-20",
      paymentMethod: null
    },
    {
      id: "INV-2024-004",
      customerName: "Sneha Reddy",
      project: "7 kW Residential Hybrid",
      amount: "₹4,42,000",
      tax: "₹79,560",
      total: "₹5,21,560",
      status: "Partially Paid",
      dueDate: "2024-02-12",
      paidDate: null,
      issueDate: "2024-01-12",
      paymentMethod: "UPI"
    },
    {
      id: "INV-2024-005",
      customerName: "Arjun Mehta",
      project: "15 kW Hotel Solar",
      amount: "₹9,00,000",
      tax: "₹1,62,000",
      total: "₹10,62,000",
      status: "Paid",
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      issueDate: "2024-01-09",
      paymentMethod: "Cheque"
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    "Paid": "bg-green-100 text-green-700",
    "Pending": "bg-yellow-100 text-yellow-700",
    "Overdue": "bg-red-100 text-red-700",
    "Partially Paid": "bg-blue-100 text-blue-700",
    "Cancelled": "bg-gray-100 text-gray-700"
  };

  const totalRevenue = invoices
    .filter(i => i.status === "Paid")
    .reduce((sum, i) => sum + parseFloat(i.total.replace(/[₹,]/g, '')), 0);

  const pendingAmount = invoices
    .filter(i => i.status === "Pending" || i.status === "Overdue")
    .reduce((sum, i) => sum + parseFloat(i.total.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600 mt-1">Manage invoices and track payments</p>
        </div>
        <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
          <Plus className="mr-2" size={18} />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ₹{(totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <DollarSign className="text-green-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  ₹{(pendingAmount / 100000).toFixed(1)}L
                </p>
              </div>
              <Clock className="text-yellow-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Invoices</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {invoices.filter(i => i.status === "Paid").length}
                </p>
              </div>
              <CheckCircle2 className="text-green-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{invoices.length}</p>
              </div>
              <FileText className="text-gray-400" size={32} />
            </div>
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
                placeholder="Search invoices by customer or ID..."
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
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Partially Paid">Partially Paid</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download size={18} className="mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <div className="grid gap-4">
        {filteredInvoices.map((invoice, index) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{invoice.id}</h3>
                        <p className="text-gray-600">{invoice.customerName}</p>
                        <p className="text-sm text-gray-500 mt-1">{invoice.project}</p>
                      </div>
                      <Badge className={statusColors[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Issue Date</p>
                        <p className="font-semibold">{invoice.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Due Date</p>
                        <p className="font-semibold">{invoice.dueDate}</p>
                      </div>
                      {invoice.paidDate && (
                        <div>
                          <p className="text-gray-600">Paid Date</p>
                          <p className="font-semibold text-green-600">{invoice.paidDate}</p>
                        </div>
                      )}
                    </div>

                    {invoice.paymentMethod && (
                      <div className="mt-3">
                        <Badge variant="outline">
                          Payment: {invoice.paymentMethod}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Amount Info */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 min-w-[200px]">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold">{invoice.amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax (18%):</span>
                        <span className="font-semibold">{invoice.tax}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-[#0047BA]">{invoice.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download size={14} className="mr-1" />
                      PDF
                    </Button>
                    {invoice.status !== "Paid" && (
                      <Button size="sm" className="bg-[#0047BA] text-white flex-1">
                        <Send size={14} className="mr-1" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">Revenue chart visualization would go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
