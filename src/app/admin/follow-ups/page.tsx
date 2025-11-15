"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, Mail, CheckCircle2, AlertCircle, Plus, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function FollowUpsPage() {
  const [filterType, setFilterType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    leadName: "",
    type: "",
    dueDate: "",
    dueTime: "",
    priority: "",
    notes: ""
  });

  // Load follow-ups from leads API
  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await fetch('/api/leads/bulk');
        const data = await response.json();
        
        if (data.success) {
          // Create follow-ups from leads
          const followUpData = data.data.map((lead: any, index: number) => ({
            id: index + 1,
            leadName: lead.name,
            type: "Phone Call", // Default type
            dueDate: "2024-01-20", // In a real app, this would be calculated
            dueTime: "2:00 PM", // In a real app, this would be set by user
            priority: "Medium",
            status: lead.status === "New" ? "Pending" : 
                   lead.status === "Contacted" ? "Scheduled" : 
                   lead.status === "Won" ? "Completed" : "Pending",
            notes: `Follow-up for ${lead.source || "lead"} from ${lead.source || "unknown source"}`,
            lastContact: "2024-01-15" // In a real app, this would be the actual last contact date
          }));
          
          setFollowUps(followUpData);
        }
      } catch (error) {
        console.error('Error fetching follow-ups:', error);
        toast.error('Failed to load follow-ups');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);

  const handleScheduleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Scheduling follow-up:", formData);
    toast.success("Follow-up scheduled successfully!");
    setIsDialogOpen(false);
    setFormData({
      leadName: "",
      type: "",
      dueDate: "",
      dueTime: "",
      priority: "",
      notes: ""
    });
  };

  const filteredFollowUps = filterType === "all" 
    ? followUps 
    : followUps.filter(f => f.type === filterType);

  const priorityColors: Record<string, string> = {
    "High": "bg-red-100 text-red-700 border-red-300",
    "Medium": "bg-yellow-100 text-yellow-700 border-yellow-300",
    "Low": "bg-green-100 text-green-700 border-green-300"
  };

  const statusColors: Record<string, string> = {
    "Pending": "bg-orange-100 text-orange-700",
    "Scheduled": "bg-blue-100 text-blue-700",
    "Completed": "bg-green-100 text-green-700",
    "Overdue": "bg-red-100 text-red-700"
  };

  const typeIcons: Record<string, any> = {
    "Phone Call": Phone,
    "Email": Mail,
    "Site Visit": Calendar
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
          <h1 className="text-3xl font-bold text-gray-900">Follow-Up Reminders</h1>
          <p className="text-gray-600 mt-1">Track and manage all your scheduled follow-ups</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
              <Plus className="mr-2" size={18} />
              Schedule Follow-up
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Follow-up</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleScheduleFollowUp} className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Lead Name *</Label>
                  <Input 
                    placeholder="Enter lead name" 
                    className="mt-1" 
                    value={formData.leadName}
                    onChange={(e) => setFormData({...formData, leadName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Follow-up Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Phone Call">Phone Call</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Site Visit">Site Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Due Date *</Label>
                  <Input 
                    type="date" 
                    className="mt-1" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Due Time *</Label>
                  <Input 
                    type="time" 
                    className="mt-1" 
                    value={formData.dueTime}
                    onChange={(e) => setFormData({...formData, dueTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea 
                  placeholder="Additional notes..." 
                  rows={3} 
                  className="mt-1" 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                  Schedule Follow-up
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by type:</span>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Phone Call">Phone Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Site Visit">Site Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Follow-ups</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{followUps.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {followUps.filter(f => f.status === "Pending").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Scheduled</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {followUps.filter(f => f.status === "Scheduled").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {followUps.filter(f => f.status === "Completed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Follow-ups List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Follow-ups ({filteredFollowUps.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFollowUps.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No follow-ups scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by scheduling a new follow-up.</p>
              <div className="mt-6">
                <Button 
                  className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2" size={18} />
                  Schedule Follow-up
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFollowUps.map((followUp, index) => {
                const TypeIcon = typeIcons[followUp.type];
                return (
                  <motion.div
                    key={followUp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className={`p-3 rounded-lg border ${priorityColors[followUp.priority]}`}>
                        <TypeIcon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{followUp.leadName}</h3>
                            <p className="text-gray-600">{followUp.notes}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[followUp.status]}>
                              {followUp.status}
                            </Badge>
                            <Badge className={priorityColors[followUp.priority].replace('border-', '')}>
                              {followUp.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-600 mt-3">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {followUp.dueDate} at {followUp.dueTime}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            Last contact: {followUp.lastContact}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            // In a real app, this would mark as complete
                            toast.success(`Marked follow-up with ${followUp.leadName} as complete`);
                          }}
                        >
                          <CheckCircle2 size={16} className="mr-1" />
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}