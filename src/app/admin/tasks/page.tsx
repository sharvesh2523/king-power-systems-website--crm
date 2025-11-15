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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, CheckCircle2, Circle, Clock, AlertCircle, User, Tag } from "lucide-react";
import { toast } from "sonner";

export default function TasksPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    relatedLead: "",
    dueDate: "",
    priority: "",
    status: "Pending",
    category: ""
  });

  // Load tasks from leads API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/leads/bulk');
        const data = await response.json();
        
        if (data.success) {
          // Create tasks from leads
          const taskData = data.data.map((lead: any, index: number) => ({
            id: index + 1,
            title: `Follow-up with ${lead.name}`,
            description: `Follow-up on lead from ${lead.source || "unknown source"}`,
            assignedTo: "Sales Team",
            dueDate: "2024-01-20", // In a real app, this would be calculated
            priority: "Medium",
            status: lead.status === "New" ? "Pending" : 
                   lead.status === "Contacted" ? "In Progress" : 
                   lead.status === "Won" ? "Completed" : "Pending",
            category: "Follow-up",
            relatedLead: lead.name
          }));
          
          setTasks(taskData);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Creating task:", formData);
    toast.success("Task created successfully!");
    setIsDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      relatedLead: "",
      dueDate: "",
      priority: "",
      status: "Pending",
      category: ""
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesStatus && matchesPriority;
  });

  const statusColors: Record<string, string> = {
    "Pending": "bg-orange-100 text-orange-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Completed": "bg-green-100 text-green-700",
    "Overdue": "bg-red-100 text-red-700"
  };

  const priorityColors: Record<string, string> = {
    "High": "bg-red-100 text-red-700",
    "Medium": "bg-yellow-100 text-yellow-700",
    "Low": "bg-green-100 text-green-700"
  };

  const statusIcons: Record<string, any> = {
    "Pending": Circle,
    "In Progress": Clock,
    "Completed": CheckCircle2,
    "Overdue": AlertCircle
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
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-1">Organize and track all team tasks</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
              <Plus className="mr-2" size={18} />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4 mt-4">
              <div>
                <Label>Task Title *</Label>
                <Input 
                  placeholder="Enter task title" 
                  className="mt-1" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Task details..." 
                  rows={3} 
                  className="mt-1" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Assign To *</Label>
                  <Select value={formData.assignedTo} onValueChange={(value) => setFormData({...formData, assignedTo: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Team">Sales Team</SelectItem>
                      <SelectItem value="Installation Team">Installation Team</SelectItem>
                      <SelectItem value="Service Team">Service Team</SelectItem>
                      <SelectItem value="Documentation Team">Documentation Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Related Lead</Label>
                  <Input 
                    placeholder="Lead name" 
                    className="mt-1" 
                    value={formData.relatedLead}
                    onChange={(e) => setFormData({...formData, relatedLead: e.target.value})}
                  />
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
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Site Visit">Site Visit</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Installation">Installation</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Documentation">Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                  Create Task
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
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{tasks.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {tasks.filter(t => t.status === "Pending").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {tasks.filter(t => t.status === "In Progress").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {tasks.filter(t => t.status === "Completed").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>All Tasks ({filteredTasks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
              <div className="mt-6">
                <Button 
                  className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Plus className="mr-2" size={18} />
                  Create Task
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task, index) => {
                const StatusIcon = statusIcons[task.status];
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Checkbox />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={priorityColors[task.priority]}>
                              {task.priority}
                            </Badge>
                            <Badge className={statusColors[task.status]}>
                              <StatusIcon size={14} className="mr-1 inline" />
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-600 mt-3">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            {task.assignedTo}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            Due: {task.dueDate}
                          </div>
                          <div className="flex items-center">
                            <Tag size={14} className="mr-1" />
                            {task.category}
                          </div>
                        </div>

                        {task.relatedLead && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Related to lead: </span>
                            <span className="font-medium text-[#0047BA]">{task.relatedLead}</span>
                          </div>
                        )}
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