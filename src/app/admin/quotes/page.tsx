"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, FileText, Calendar, DollarSign, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    customerName: "",
    project: "",
    systemSize: "",
    amount: "",
    validity: "",
    status: "Draft"
  });

  // Load quotes from leads API (leads with "Proposal Sent" status)
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/leads/bulk');
        const data = await response.json();
        
        if (data.success) {
          // Filter leads with "Proposal Sent" status and convert to quotes
          const proposalLeads = data.data.filter((lead: any) => lead.status === "Proposal Sent");
          
          const quoteData = proposalLeads.map((lead: any, index: number) => ({
            id: `Q-2024-${String(index + 1).padStart(3, '0')}`,
            customerName: lead.name,
            project: `${lead.suggestedKW || "0"} kW Solar System`,
            systemSize: `${lead.suggestedKW || "0"} kW`,
            amount: `₹${lead.monthlyBill || "0"}`,
            validity: "2024-02-15", // In a real app, this would be calculated from current date
            status: "Sent",
            date: "2024-01-15" // In a real app, this would be the actual date
          }));
          
          setQuotes(quoteData);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        toast.error('Failed to load quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Creating quote:", formData);
    toast.success("Quote created successfully!");
    setIsDialogOpen(false);
    setFormData({
      customerName: "",
      project: "",
      systemSize: "",
      amount: "",
      validity: "",
      status: "Draft"
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Quotes Management</h1>
          <p className="text-gray-600 mt-1">Create and manage customer quotes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
              <Plus className="mr-2" size={18} />
              Create Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateQuote} className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Customer Name *</Label>
                  <Input 
                    placeholder="Enter customer name" 
                    className="mt-1" 
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Project *</Label>
                  <Input 
                    placeholder="Project description" 
                    className="mt-1" 
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>System Size</Label>
                  <Input 
                    placeholder="5 kW" 
                    className="mt-1" 
                    value={formData.systemSize}
                    onChange={(e) => setFormData({...formData, systemSize: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Amount (₹) *</Label>
                  <Input 
                    type="number" 
                    placeholder="100000" 
                    className="mt-1" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Validity Date *</Label>
                  <Input 
                    type="date" 
                    className="mt-1" 
                    value={formData.validity}
                    onChange={(e) => setFormData({...formData, validity: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                  Create Quote
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search quotes by customer name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Quotes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{quotes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Draft</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">
              {quotes.filter(q => q.status === "Draft").length}
            </p>
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
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {quotes.filter(q => q.status === "Rejected").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <CardTitle>All Quotes ({filteredQuotes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredQuotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No quotes found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new quote.</p>
              <div className="mt-6">
                <Button 
                  className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2" size={18} />
                  Create Quote
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuotes.map((quote, index) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{quote.customerName}</h3>
                          <p className="text-gray-600">{quote.project}</p>
                        </div>
                        <span className="text-lg font-bold text-[#0047BA]">{quote.amount}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center">
                          <FileText size={14} className="mr-1" />
                          {quote.id}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {quote.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          Valid until {quote.validity}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                      <Badge className={statusColors[quote.status]}>
                        {quote.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
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