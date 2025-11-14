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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, CheckCircle2, Circle, Clock, AlertCircle, User } from "lucide-react";

export default function TasksPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const tasks = [
    {
      id: 1,
      title: "Site visit - Rajesh Kumar",
      description: "Conduct detailed site survey for 5kW residential installation",
      assignedTo: "Ramesh Kumar",
      dueDate: "2024-01-16",
      priority: "High",
      status: "In Progress",
      category: "Site Visit",
      relatedLead: "Rajesh Kumar"
    },
    {
      id: 2,
      title: "Prepare quote - Amit Patel",
      description: "Create detailed quotation for 100kW commercial project",
      assignedTo: "Priya Singh",
      dueDate: "2024-01-17",
      priority: "High",
      status: "Pending",
      category: "Quotation",
      relatedLead: "Amit Patel"
    },
    {
      id: 3,
      title: "Follow-up call - Sneha Reddy",
      description: "Discuss quote details and answer technical questions",
      assignedTo: "Ramesh Kumar",
      dueDate: "2024-01-17",
      priority: "Medium",
      status: "Pending",
      category: "Follow-up",
      relatedLead: "Sneha Reddy"
    },
    {
      id: 4,
      title: "Installation planning - Rohit Kapoor",
      description: "Schedule and plan 10kW installation team and equipment",
      assignedTo: "Installation Team",
      dueDate: "2024-01-18",
      priority: "High",
      status: "In Progress",
      category: "Installation",
      relatedLead: "Rohit Kapoor"
    },
    {
      id: 5,
      title: "System maintenance - Meera Iyer",
      description: "Annual maintenance check for 2kW system",
      assignedTo: "Service Team",
      dueDate: "2024-01-19",
      priority: "Low",
      status: "Pending",
      category: "Maintenance",
      relatedLead: "Meera Iyer"
    },
    {
      id: 6,
      title: "Document verification - Vikram Singh",
      description: "Verify all documents for subsidy application",
      assignedTo: "Priya Singh",
      dueDate: "2024-01-15",
      priority: "Medium",
      status: "Completed",
      category: "Documentation",
      relatedLead: "Vikram Singh"
    },
    {
      id: 7,
      title: "Net meter installation - Kavita Desai",
      description: "Coordinate with DISCOM for net meter setup",
      assignedTo: "Ramesh Kumar",
      dueDate: "2024-01-20",
      priority: "Medium",
      status: "Pending",
      category: "Installation",
      relatedLead: "Kavita Desai"
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-1">Organize and track all team tasks</p>
        </div>
        <Dialog>
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
            <form className="space-y-4 mt-4">
              <div>
                <Label>Task Title *</Label>
                <Input placeholder="Enter task title" className="mt-1" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Task details..." rows={3} className="mt-1" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Assign To *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ramesh">Ramesh Kumar</SelectItem>
                      <SelectItem value="priya">Priya Singh</SelectItem>
                      <SelectItem value="installation">Installation Team</SelectItem>
                      <SelectItem value="service">Service Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Related Lead</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Link to lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                      <SelectItem value="amit">Amit Patel</SelectItem>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Due Date *</Label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <Label>Priority *</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="site-visit">Site Visit</SelectItem>
                      <SelectItem value="quotation">Quotation</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
                Create Task
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{tasks.length}</p>
              </div>
              <Circle className="text-gray-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {tasks.filter(t => t.status === "Pending").length}
                </p>
              </div>
              <Circle className="text-orange-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {tasks.filter(t => t.status === "In Progress").length}
                </p>
              </div>
              <Clock className="text-blue-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {tasks.filter(t => t.status === "Completed").length}
                </p>
              </div>
              <CheckCircle2 className="text-green-400" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Filter size={18} className="text-gray-400" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
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
              <SelectTrigger className="w-48">
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

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.map((task, index) => {
          const StatusIcon = statusIcons[task.status];
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-lg transition-shadow ${
                task.priority === "High" ? "border-l-4 border-l-red-500" : ""
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <Checkbox 
                      checked={task.status === "Completed"}
                      className="mt-1"
                    />

                    {/* Status Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      task.status === "Completed" ? "bg-green-100" :
                      task.status === "In Progress" ? "bg-blue-100" : "bg-orange-100"
                    }`}>
                      <StatusIcon className={`${
                        task.status === "Completed" ? "text-green-600" :
                        task.status === "In Progress" ? "text-blue-600" : "text-orange-600"
                      }`} size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[task.status]}>
                            {task.status}
                          </Badge>
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-3 mt-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <User size={14} className="mr-2 text-[#0047BA]" />
                          <span className="font-medium">{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={14} className="mr-2 text-[#0047BA]" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="text-sm">
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Lead: <span className="font-medium">{task.relatedLead}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        {task.status !== "Completed" && (
                          <Button size="sm" className="bg-[#0047BA] text-white">
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
