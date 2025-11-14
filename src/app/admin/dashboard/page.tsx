"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  DollarSign,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Leads",
      value: "248",
      change: "+12.5%",
      icon: UserPlus,
      color: "bg-blue-500"
    },
    {
      title: "Active Customers",
      value: "156",
      change: "+8.2%",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Pending Quotes",
      value: "32",
      change: "+5.1%",
      icon: FileText,
      color: "bg-orange-500"
    },
    {
      title: "Monthly Revenue",
      value: "₹45.2L",
      change: "+23.4%",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      title: "Follow-ups Due",
      value: "18",
      change: "-3",
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Installations",
      value: "12",
      change: "+4",
      icon: Activity,
      color: "bg-indigo-500"
    },
    {
      title: "Conversion Rate",
      value: "34.5%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "bg-teal-500"
    },
    {
      title: "Tasks Completed",
      value: "89",
      change: "+15",
      icon: CheckCircle2,
      color: "bg-pink-500"
    }
  ];

  const recentLeads = [
    { name: "Rajesh Kumar", phone: "+91 98765 43210", capacity: "5 kW", status: "New", time: "2 hours ago" },
    { name: "Priya Sharma", phone: "+91 98765 43211", capacity: "3 kW", status: "Contacted", time: "5 hours ago" },
    { name: "Amit Patel", phone: "+91 98765 43212", capacity: "10 kW", status: "Quote Sent", time: "1 day ago" },
    { name: "Sneha Reddy", phone: "+91 98765 43213", capacity: "7 kW", status: "New", time: "1 day ago" },
  ];

  const upcomingTasks = [
    { task: "Site visit - Rajesh Kumar", time: "Today, 2:00 PM", priority: "High" },
    { task: "Follow-up call - Priya Sharma", time: "Today, 4:30 PM", priority: "Medium" },
    { task: "Quote revision - Amit Patel", time: "Tomorrow, 10:00 AM", priority: "High" },
    { task: "Installation planning meeting", time: "Tomorrow, 3:00 PM", priority: "Medium" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.phone}</p>
                    <p className="text-xs text-gray-500 mt-1">{lead.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mb-1">
                      {lead.status}
                    </span>
                    <p className="text-sm font-semibold text-gray-900">{lead.capacity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{task.task}</p>
                    <p className="text-sm text-gray-600 mt-1">{task.time}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white rounded-lg hover:opacity-90 transition-opacity">
              <UserPlus className="mx-auto mb-2" size={24} />
              <span className="text-sm font-medium">Add Lead</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              <FileText className="mx-auto mb-2" size={24} />
              <span className="text-sm font-medium">Create Quote</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              <CheckCircle2 className="mx-auto mb-2" size={24} />
              <span className="text-sm font-medium">Add Task</span>
            </button>
            <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              <DollarSign className="mx-auto mb-2" size={24} />
              <span className="text-sm font-medium">New Invoice</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
