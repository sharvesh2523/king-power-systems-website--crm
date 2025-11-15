"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MessageSquare, 
  FileText,
  DollarSign,
  Zap,
  Wrench
} from "lucide-react";
import { toast } from "sonner";

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id;

  // Mock customer data - in a real app, this would come from an API
  const customer = {
    id: customerId,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    location: "New Delhi",
    status: "Active",
    type: "Residential",
    installDate: "Jan 15, 2024",
    systemSize: "5 kW",
    totalSpent: "₹3,00,000",
    projects: 1,
    invoices: 3,
    lastService: "Nov 10, 2024",
    nextService: "May 10, 2025",
    notes: "Satisfied customer, interested in battery backup system for future",
    recentInvoices: [
      { id: "INV-001", date: "Jan 15, 2024", amount: "₹1,50,000", status: "Paid" },
      { id: "INV-002", date: "Jul 15, 2024", amount: "₹75,000", status: "Paid" },
      { id: "INV-003", date: "Oct 15, 2024", amount: "₹75,000", status: "Paid" }
    ],
    serviceHistory: [
      { date: "Jan 15, 2024", type: "Installation", technician: "Amit Sharma" },
      { date: "May 15, 2024", type: "Routine Check", technician: "Vikram Singh" },
      { date: "Nov 10, 2024", type: "Maintenance", technician: "Rohit Kapoor" }
    ]
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEdit = () => {
    toast.info("Opening edit dialog for customer");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete customer ${customer.name}?`);
    if (confirmed) {
      toast.success(`Customer ${customer.name} deleted successfully`);
      router.push('/admin/customers');
    }
  };

  const handleCreateInvoice = () => {
    toast.error("Billing functionality has been removed");
  };

  const handleScheduleService = () => {
    toast.info("Opening schedule service dialog");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-gradient-to-br from-[#0047BA] to-[#1A5FE8] text-white text-lg">
                {getInitials(customer.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
              <p className="text-gray-600">Customer Details</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit size={18} className="mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 size={18} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-green-100 text-green-700">{customer.status}</Badge>
                <Badge variant="outline">{customer.type}</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span>{customer.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">System Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span>Installed: {customer.installDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Zap size={16} className="mr-2 text-gray-400" />
                      <span>System: {customer.systemSize}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-2 text-gray-400" />
                      <span>Total Spent: {customer.totalSpent}</span>
                    </div>
                  </div>
                </div>
              </div>

              {customer.notes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {customer.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Invoices</CardTitle>
              <Button onClick={handleCreateInvoice} size="sm">
                <FileText size={16} className="mr-2" />
                Create Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{invoice.id}</h3>
                      <p className="text-sm text-gray-600">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{invoice.amount}</span>
                      <Badge 
                        className={
                          invoice.status === "Paid" ? "bg-green-100 text-green-700" : 
                          invoice.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                          "bg-red-100 text-red-700"
                        }
                      >
                        {invoice.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Service History</CardTitle>
              <Button onClick={handleScheduleService} size="sm">
                <Wrench size={16} className="mr-2" />
                Schedule Service
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customer.serviceHistory.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{service.type}</h3>
                      <p className="text-sm text-gray-600">{service.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Technician: {service.technician}</span>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => {
                window.location.href = `mailto:${customer.email}`;
                toast.success(`Opening email client for ${customer.email}`);
              }}>
                <Mail size={18} className="mr-2" />
                Send Email
              </Button>
              <Button className="w-full" variant="outline" onClick={() => {
                window.location.href = `tel:${customer.phone}`;
                toast.success(`Initiating call to ${customer.phone}`);
              }}>
                <Phone size={18} className="mr-2" />
                Make Call
              </Button>
              <Button className="w-full" variant="outline" onClick={() => {
                window.location.href = `sms:${customer.phone}`;
                toast.success(`Opening SMS client for ${customer.phone}`);
              }}>
                <MessageSquare size={18} className="mr-2" />
                Send SMS
              </Button>
              <Button className="w-full" variant="outline" onClick={() => {
                toast.error("Billing functionality has been removed");
              }}>
                <FileText size={18} className="mr-2" />
                View Invoices
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-medium">{customer.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoices</span>
                  <span className="font-medium">{customer.invoices}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Service</span>
                  <span className="font-medium">{customer.lastService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Service</span>
                  <span className="font-medium">{customer.nextService}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}