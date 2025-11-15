"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id;

  // Mock lead data - in a real app, this would come from an API
  const lead = {
    id: leadId,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    location: "New Delhi",
    capacity: "5 kW",
    source: "Website",
    status: "New",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    estimatedValue: "₹3,00,000",
    notes: "Interested in residential solar with subsidy",
    followUps: [
      {
        id: 1,
        date: "2024-01-16",
        notes: "Initial contact made, scheduled site visit for next week",
        status: "Completed"
      },
      {
        id: 2,
        date: "2024-01-20",
        notes: "Site visit scheduled",
        status: "Pending"
      }
    ],
    activities: [
      {
        id: 1,
        type: "Email",
        date: "2024-01-15",
        description: "Sent welcome email with brochure"
      },
      {
        id: 2,
        type: "Call",
        date: "2024-01-16",
        description: "Discussed system requirements and pricing"
      }
    ]
  };

  const statusColors: Record<string, string> = {
    "New": "bg-blue-100 text-blue-700",
    "Contacted": "bg-green-100 text-green-700",
    "Proposal Sent": "bg-purple-100 text-purple-700",
    "Follow-up": "bg-yellow-100 text-yellow-700",
    "Won": "bg-emerald-100 text-emerald-700",
    "Lost": "bg-red-100 text-red-700"
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
    toast.info("Opening edit dialog for lead");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete lead ${lead.name}?`);
    if (confirmed) {
      toast.success(`Lead ${lead.name} deleted successfully`);
      router.push('/admin/leads');
    }
  };

  const handleConvertToCustomer = () => {
    toast.success("Lead converted to customer!");
    router.push("/admin/customers");
  };

  const handleScheduleFollowUp = () => {
    toast.info("Opening schedule follow-up dialog");
    // In a real app, this would open a schedule follow-up dialog
  };

  return (
    <div className="space-y-6">
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <input 
                  type="text" 
                  defaultValue={lead.name}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <input 
                  type="email" 
                  defaultValue={lead.email}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Phone *</label>
                <input 
                  type="tel" 
                  defaultValue={lead.phone}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <input 
                  type="text" 
                  defaultValue={lead.location}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Desired Capacity</label>
                <select 
                  defaultValue={lead.capacity}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1-3kw">1-3 kW</option>
                  <option value="3-5kw">3-5 kW</option>
                  <option value="5-10kw">5-10 kW</option>
                  <option value="10-50kw">10-50 kW</option>
                  <option value="50kw-plus">50 kW+</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Lead Source</label>
                <select 
                  defaultValue={lead.source}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="website">Website</option>
                  <option value="roi-calculator">ROI Calculator</option>
                  <option value="contact-form">Contact Form</option>
                  <option value="phone">Phone Call</option>
                  <option value="referral">Referral</option>
                  <option value="social-media">Social Media</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Estimated Value</label>
              <input 
                type="text" 
                defaultValue={lead.estimatedValue}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <textarea 
                defaultValue={lead.notes}
                rows={3} 
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                onClick={() => {
                  toast.success("Lead updated successfully");
                  setIsEditDialogOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <p className="text-gray-600">Lead Details</p>
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
          {/* Lead Info */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Badge className={statusColors[lead.status] || "bg-gray-100 text-gray-700"}>
                  {lead.status}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign size={16} className="mr-1" />
                  <span>{lead.estimatedValue}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span>Created: {lead.createdAt}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span>{lead.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span>{lead.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span>{lead.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Capacity:</span> {lead.capacity}
                    </div>
                    <div>
                      <span className="font-medium">Source:</span> {lead.source}
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span> {lead.updatedAt}
                    </div>
                  </div>
                </div>
              </div>

              {lead.notes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {lead.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Follow-ups */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Follow-ups</CardTitle>
              <Button onClick={handleScheduleFollowUp} size="sm">
                <Calendar size={16} className="mr-2" />
                Schedule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lead.followUps.map((followUp) => (
                  <div key={followUp.id} className="border-l-4 border-blue-500 pl-4 py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{followUp.date}</h3>
                      <Badge variant={followUp.status === "Completed" ? "default" : "secondary"}>
                        {followUp.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{followUp.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lead.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {activity.type === "Email" ? (
                        <Mail size={16} className="text-blue-500" />
                      ) : (
                        <Phone size={16} className="text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{activity.type}</h3>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => {
                window.location.href = `mailto:${lead.email}`;
                toast.success(`Opening email client for ${lead.email}`);
              }}>
                <Mail size={18} className="mr-2" />
                Send Email
              </Button>
              <Button className="w-full" variant="outline" onClick={() => {
                window.location.href = `tel:${lead.phone}`;
                toast.success(`Initiating call to ${lead.phone}`);
              }}>
                <Phone size={18} className="mr-2" />
                Make Call
              </Button>
              <Button className="w-full" variant="outline" onClick={() => {
                window.location.href = `sms:${lead.phone}`;
                toast.success(`Opening SMS client for ${lead.phone}`);
              }}>
                <MessageSquare size={18} className="mr-2" />
                Send SMS
              </Button>
              <Button className="w-full" variant="outline" onClick={() => {
                router.push('/admin/quotes');
                toast.success("Navigating to quotes page");
              }}>
                <FileText size={18} className="mr-2" />
                Create Quote
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-[#0047BA] to-[#1A5FE8] text-white"
                onClick={handleConvertToCustomer}
              >
                Convert to Customer
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Activities</span>
                  <span className="font-medium">{lead.activities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Follow-ups</span>
                  <span className="font-medium">{lead.followUps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Active</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}