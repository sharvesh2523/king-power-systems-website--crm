"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Phone, Mail, MapPin, Calendar, DollarSign, Zap, FileText, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CustomersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    systemSize: "",
    type: ""
  });

  // Load customers from leads API (leads with "Won" status)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/leads/bulk');
        const data = await response.json();
        
        if (data.success) {
          // Filter leads with "Won" status and convert to customers
          const wonLeads = data.data.filter((lead: any) => lead.status === "Won");
          
          const customerData = wonLeads.map((lead: any) => ({
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            location: lead.location || "Not specified",
            systemSize: `${lead.suggestedKW || "0"} kW`,
            installDate: "2024-01-15", // In a real app, this would be the actual install date
            totalSpent: `₹${lead.monthlyBill || "0"}`,
            status: "Active",
            type: "Residential", // In a real app, this would be determined by system size or other factors
            lastService: "2024-03-10", // In a real app, this would be the actual last service date
            projects: 1,
            invoices: 2
          }));
          
          setCustomers(customerData);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Adding customer:", formData);
    toast.success("Customer added successfully!");
    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      systemSize: "",
      type: ""
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0047BA]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Database</h1>
          <p className="text-gray-600 mt-1">Manage all your customer information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
              <Plus className="mr-2" size={18} />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCustomer} className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input 
                    placeholder="Enter name" 
                    className="mt-1" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="mt-1" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Phone *</Label>
                  <Input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    className="mt-1" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input 
                    placeholder="City, State" 
                    className="mt-1" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>System Size</Label>
                  <Input 
                    placeholder="e.g., 5 kW" 
                    className="mt-1" 
                    value={formData.systemSize}
                    onChange={(e) => setFormData({...formData, systemSize: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Customer Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                  Add Customer
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

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
            <p className="text-sm text-gray-600">Residential</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {customers.filter(c => c.type === "Residential").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Commercial</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {customers.filter(c => c.type === "Commercial").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {customers.filter(c => c.status === "Active").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new customer or converting won leads.</p>
              <div className="mt-6">
                <Button 
                  className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2" size={18} />
                  Add Customer
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCustomers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#0047BA] text-white">
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{customer.name}</h3>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                            customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}>
                            {customer.status}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-[#0047BA]">{customer.totalSpent}</span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                        <div className="flex items-center">
                          <Mail size={14} className="mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-2" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2" />
                          {customer.location}
                        </div>
                        <div className="flex items-center">
                          <Zap size={14} className="mr-2" />
                          {customer.systemSize}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm mt-2">
                        <span className="text-gray-600">Type: {customer.type}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">Projects: {customer.projects}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">Invoices: {customer.invoices}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => router.push(`/admin/customers/${customer.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}