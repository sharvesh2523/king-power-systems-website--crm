"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Phone, Mail, MapPin, Calendar, Filter, Download, Upload, FileSpreadsheet, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// @ts-ignore
import * as XLSX from 'xlsx';

export default function LeadsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExcelMode, setIsExcelMode] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    capacity: "",
    source: "",
    estimatedValue: "",
    notes: ""
  });

  // Load leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads/bulk');
        const data = await response.json();
        if (data.success) {
          setLeads(data.data);
          // If no leads, open Excel mode automatically
          if (data.data.length === 0) {
            openExcelMode();
          }
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        toast.error('Failed to load leads');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Adding lead:", formData);
    toast.success("Lead added successfully!");
    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      capacity: "",
      source: "",
      estimatedValue: "",
      notes: ""
    });
  };

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
    "Proposal Sent": "bg-purple-100 text-purple-700",
    "Follow-up": "bg-yellow-100 text-yellow-700",
    "Won": "bg-emerald-100 text-emerald-700",
    "Lost": "bg-red-100 text-red-700"
  };

  // Excel mode functions
  const openExcelMode = () => {
    // Convert leads to excel format
    const excelFormattedData = leads.map(lead => ({
      Name: lead.name || '',
      Phone: lead.phone || '',
      Email: lead.email || '',
      MonthlyBill: lead.monthlyBill || '',
      SuggestedKW: lead.suggestedKW || '',
      Source: lead.source || '',
      Status: lead.status || 'New',
      Notes: lead.notes || ''
    }));
    
    // If no data, add an empty row
    if (excelFormattedData.length === 0) {
      setExcelData([{
        Name: '',
        Phone: '',
        Email: '',
        MonthlyBill: '',
        SuggestedKW: '',
        Source: '',
        Status: 'New',
        Notes: ''
      }]);
    } else {
      setExcelData(excelFormattedData);
    }
    
    setIsExcelMode(true);
  };

  const saveExcelData = async () => {
    try {
      // Convert excel data back to lead format
      const newLeads = excelData.map((row, index) => ({
        id: leads[index]?.id || Date.now() + index,
        name: row.Name || '',
        phone: row.Phone || '',
        email: row.Email || '',
        monthlyBill: row.MonthlyBill || '',
        suggestedKW: row.SuggestedKW || '',
        source: row.Source || '',
        status: row.Status || 'New',
        notes: row.Notes || ''
      }));

      // Send to API
      const response = await fetch('/api/leads/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leads: newLeads }),
      });

      const result = await response.json();
      
      if (result.success) {
        setLeads(newLeads);
        setIsExcelMode(false);
        toast.success("Leads saved successfully!");
      } else {
        toast.error(result.message || "Failed to save leads");
      }
    } catch (error) {
      console.error('Error saving leads:', error);
      toast.error("Failed to save leads");
    }
  };

  const handleExcelDataChange = (rowIndex: number, column: string, value: string) => {
    const newData = [...excelData];
    newData[rowIndex] = { ...newData[rowIndex], [column]: value };
    setExcelData(newData);
  };

  const addExcelRow = () => {
    setExcelData([
      ...excelData,
      { Name: '', Phone: '', Email: '', MonthlyBill: '', SuggestedKW: '', Source: '', Status: 'New', Notes: '' }
    ]);
  };

  const removeExcelRow = (index: number) => {
    if (excelData.length <= 1) {
      toast.error("You must have at least one row");
      return;
    }
    const newData = [...excelData];
    newData.splice(index, 1);
    setExcelData(newData);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData.length > 0 ? excelData : [
      { Name: '', Phone: '', Email: '', MonthlyBill: '', SuggestedKW: '', Source: '', Status: '', Notes: '' }
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "leads.xlsx");
  };

  const importFromExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Convert to our format
      const formattedData = jsonData.map((row: any, index: number) => ({
        Name: row.Name || row.name || '',
        Phone: row.Phone || row.phone || '',
        Email: row.Email || row.email || '',
        MonthlyBill: row.MonthlyBill || row.monthlyBill || '',
        SuggestedKW: row.SuggestedKW || row.suggestedKW || '',
        Source: row.Source || row.source || '',
        Status: row.Status || row.status || 'New',
        Notes: row.Notes || row.notes || ''
      }));
      
      setExcelData(formattedData);
      toast.success("Leads imported successfully!");
    };
    reader.readAsArrayBuffer(file);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0047BA]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isExcelMode ? (
        // Excel Mode View (Full-screen)
        <div className="fixed inset-0 bg-white z-50 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Excel Mode Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lead Management - Excel Editor</h1>
                <p className="text-gray-600 mt-1">Edit leads in spreadsheet format</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('import-input')?.click()}
                >
                  <Upload className="mr-2" size={18} />
                  Import (.xlsx)
                </Button>
                <input 
                  id="import-input"
                  type="file" 
                  accept=".xlsx,.xls" 
                  className="hidden" 
                  onChange={importFromExcel} 
                />
                <Button variant="outline" onClick={exportToExcel}>
                  <Download className="mr-2" size={18} />
                  Export (.xlsx)
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                  onClick={saveExcelData}
                >
                  Save & Exit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsExcelMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>

            {/* Spreadsheet Table */}
            <div className="flex-1 overflow-auto">
              <div className="min-w-full min-h-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Bill</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested KW</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {excelData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            value={row.Name || ''}
                            onChange={(e) => handleExcelDataChange(index, 'Name', e.target.value)}
                            placeholder="Name"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            value={row.Phone || ''}
                            onChange={(e) => handleExcelDataChange(index, 'Phone', e.target.value)}
                            placeholder="Phone"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            value={row.Email || ''}
                            onChange={(e) => handleExcelDataChange(index, 'Email', e.target.value)}
                            placeholder="Email"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            value={row.MonthlyBill || ''}
                            onChange={(e) => handleExcelDataChange(index, 'MonthlyBill', e.target.value)}
                            placeholder="Monthly Bill"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            value={row.SuggestedKW || ''}
                            onChange={(e) => handleExcelDataChange(index, 'SuggestedKW', e.target.value)}
                            placeholder="Suggested KW"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Select 
                            value={row.Source || ''} 
                            onValueChange={(value) => handleExcelDataChange(index, 'Source', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Website">Website</SelectItem>
                              <SelectItem value="ROI Calculator">ROI Calculator</SelectItem>
                              <SelectItem value="Contact Form">Contact Form</SelectItem>
                              <SelectItem value="Phone Call">Phone Call</SelectItem>
                              <SelectItem value="Referral">Referral</SelectItem>
                              <SelectItem value="Social Media">Social Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Select 
                            value={row.Status || 'New'} 
                            onValueChange={(value) => handleExcelDataChange(index, 'Status', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Contacted">Contacted</SelectItem>
                              <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                              <SelectItem value="Follow-up">Follow-up</SelectItem>
                              <SelectItem value="Won">Won</SelectItem>
                              <SelectItem value="Lost">Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Input
                            value={row.Notes || ''}
                            onChange={(e) => handleExcelDataChange(index, 'Notes', e.target.value)}
                            placeholder="Notes"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeExcelRow(index)}
                          >
                            <X size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Row Button */}
            <div className="p-4 border-t">
              <Button 
                variant="outline" 
                onClick={addExcelRow}
                className="w-full"
              >
                <Plus className="mr-2" size={18} />
                Add New Row
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Regular Table View
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
              <p className="text-gray-600 mt-1">Track and manage all your sales leads</p>
            </div>
            <div className="flex gap-2">
              <Button 
                className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                onClick={openExcelMode}
              >
                <FileSpreadsheet className="mr-2" size={18} />
                Add (Excel)
              </Button>
            </div>
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
                    <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Won">Won</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportToExcel}>
                  <Download size={18} className="mr-2" />
                  Export (.xlsx)
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
                <p className="text-sm text-gray-600">Proposal Sent</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {leads.filter(l => l.status === "Proposal Sent").length}
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
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No leads</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding leads in Excel mode.</p>
                    <div className="mt-6">
                      <Button 
                        className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                        onClick={openExcelMode}
                      >
                        <FileSpreadsheet className="mr-2" size={18} />
                        Add Leads (Excel)
                      </Button>
                    </div>
                  </div>
                ) : (
                  filteredLeads.map((lead, index) => (
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
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => router.push(`/admin/leads/${lead.id}`)}
                          >
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-[#0047BA] text-white flex-1"
                            onClick={() => {
                              // In a real app, this would trigger a contact action
                              toast.info(`Contacting ${lead.name}`);
                            }}
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}