"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, Mail, CheckCircle2, AlertCircle, Plus, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FollowUpsPage() {
  const [filterType, setFilterType] = useState("all");

  const followUps = [
    {
      id: 1,
      leadName: "Rajesh Kumar",
      type: "Phone Call",
      dueDate: "2024-01-16",
      dueTime: "2:00 PM",
      priority: "High",
      status: "Pending",
      notes: "Discuss 5kW system pricing and PM Surya Ghar subsidy details",
      lastContact: "2024-01-10"
    },
    {
      id: 2,
      leadName: "Priya Sharma",
      type: "Email",
      dueDate: "2024-01-16",
      dueTime: "4:30 PM",
      priority: "Medium",
      status: "Pending",
      notes: "Send detailed quote and installation timeline",
      lastContact: "2024-01-12"
    },
    {
      id: 3,
      leadName: "Amit Patel",
      type: "Site Visit",
      dueDate: "2024-01-17",
      dueTime: "10:00 AM",
      priority: "High",
      status: "Scheduled",
      notes: "Site survey for 100kW commercial installation",
      lastContact: "2024-01-13"
    },
    {
      id: 4,
      leadName: "Sneha Reddy",
      type: "Phone Call",
      dueDate: "2024-01-17",
      dueTime: "3:00 PM",
      priority: "Medium",
      status: "Pending",
      notes: "Follow up on quote acceptance",
      lastContact: "2024-01-11"
    },
    {
      id: 5,
      leadName: "Vikram Singh",
      type: "Email",
      dueDate: "2024-01-18",
      dueTime: "11:00 AM",
      priority: "Low",
      status: "Pending",
      notes: "Share customer testimonials and project portfolio",
      lastContact: "2024-01-09"
    },
    {
      id: 6,
      leadName: "Meera Iyer",
      type: "Site Visit",
      dueDate: "2024-01-15",
      dueTime: "2:00 PM",
      priority: "High",
      status: "Completed",
      notes: "Completed site survey, quote sent",
      lastContact: "2024-01-15"
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Follow-Up Reminders</h1>
          <p className="text-gray-600 mt-1">Track and manage all your scheduled follow-ups</p>
        </div>
        <Button className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white">
          <Plus className="mr-2" size={18} />
          Schedule Follow-up
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{followUps.length}</p>
              </div>
              <Clock className="text-gray-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {followUps.filter(f => f.status === "Pending").length}
                </p>
              </div>
              <AlertCircle className="text-orange-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {followUps.filter(f => f.status === "Scheduled").length}
                </p>
              </div>
              <Calendar className="text-blue-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {followUps.filter(f => f.status === "Completed").length}
                </p>
              </div>
              <CheckCircle2 className="text-green-400" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Filter size={18} className="text-gray-400" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
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

      {/* Follow-ups List */}
      <div className="grid gap-4">
        {filteredFollowUps.map((followUp, index) => {
          const TypeIcon = typeIcons[followUp.type];
          return (
            <motion.div
              key={followUp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-lg transition-shadow ${
                followUp.priority === "High" ? "border-l-4 border-l-red-500" : ""
              }`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      followUp.priority === "High" ? "bg-red-100" :
                      followUp.priority === "Medium" ? "bg-yellow-100" : "bg-green-100"
                    }`}>
                      <TypeIcon className={`${
                        followUp.priority === "High" ? "text-red-600" :
                        followUp.priority === "Medium" ? "text-yellow-600" : "text-green-600"
                      }`} size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{followUp.leadName}</h3>
                          <p className="text-sm text-gray-600">{followUp.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[followUp.status]}>
                            {followUp.status}
                          </Badge>
                          <Badge className={priorityColors[followUp.priority]}>
                            {followUp.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar size={16} className="mr-2 text-[#0047BA]" />
                          <span className="font-medium">Due:</span>
                          <span className="ml-2">{followUp.dueDate} at {followUp.dueTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock size={16} className="mr-2 text-[#0047BA]" />
                          <span className="font-medium">Last Contact:</span>
                          <span className="ml-2">{followUp.lastContact}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">
                        <span className="font-medium">Notes:</span> {followUp.notes}
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" className="bg-[#0047BA] text-white">
                          Mark Complete
                        </Button>
                        {followUp.type === "Phone Call" && (
                          <Button size="sm" variant="outline">
                            <Phone size={14} className="mr-1" />
                            Call Now
                          </Button>
                        )}
                        {followUp.type === "Email" && (
                          <Button size="sm" variant="outline">
                            <Mail size={14} className="mr-1" />
                            Send Email
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
