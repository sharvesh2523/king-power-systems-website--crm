"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, User, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PipelinePage() {
  const router = useRouter();
  const [kanbanData, setKanbanData] = useState<Record<string, any[]>>({
    "Lead": [],
    "Qualified": [],
    "Quote Sent": [],
    "Negotiation": [],
    "Won": []
  });
  const [loading, setLoading] = useState(true);

  // Load leads from API and organize them into pipeline stages
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('/api/leads/bulk');
        const data = await response.json();
        
        if (data.success) {
          // Organize leads into pipeline stages based on their status
          const organizedData: Record<string, any[]> = {
            "Lead": [],
            "Qualified": [],
            "Quote Sent": [],
            "Negotiation": [],
            "Won": []
          };

          data.data.forEach((lead: any) => {
            // Map lead status to pipeline stages
            switch (lead.status) {
              case "New":
              case "Contacted":
                organizedData["Lead"].push({
                  id: lead.id,
                  name: lead.name,
                  value: `₹${lead.monthlyBill || "0"}`,
                  capacity: `${lead.suggestedKW || "0"} kW`,
                  date: "Recent" // In a real app, this would be the lead creation date
                });
                break;
              case "Proposal Sent":
                organizedData["Quote Sent"].push({
                  id: lead.id,
                  name: lead.name,
                  value: `₹${lead.monthlyBill || "0"}`,
                  capacity: `${lead.suggestedKW || "0"} kW`,
                  date: "Recent"
                });
                break;
              case "Follow-up":
                organizedData["Negotiation"].push({
                  id: lead.id,
                  name: lead.name,
                  value: `₹${lead.monthlyBill || "0"}`,
                  capacity: `${lead.suggestedKW || "0"} kW`,
                  date: "Recent"
                });
                break;
              case "Won":
                organizedData["Won"].push({
                  id: lead.id,
                  name: lead.name,
                  value: `₹${lead.monthlyBill || "0"}`,
                  capacity: `${lead.suggestedKW || "0"} kW`,
                  date: "Recent"
                });
                break;
              default:
                // Default to Lead stage
                organizedData["Lead"].push({
                  id: lead.id,
                  name: lead.name,
                  value: `₹${lead.monthlyBill || "0"}`,
                  capacity: `${lead.suggestedKW || "0"} kW`,
                  date: "Recent"
                });
            }
          });

          setKanbanData(organizedData);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        toast.error('Failed to load pipeline data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const stageColors: Record<string, string> = {
    "Lead": "bg-blue-500",
    "Qualified": "bg-purple-500",
    "Quote Sent": "bg-orange-500",
    "Negotiation": "bg-yellow-500",
    "Won": "bg-green-500"
  };

  const handleViewDetails = (dealId: number) => {
    // Navigate to the lead details page
    router.push(`/admin/leads/${dealId}`);
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        <p className="text-gray-600 mt-1">Visual Kanban board to track deal progress</p>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(kanbanData).map(([stage, deals]) => {
          const totalValue = deals.reduce((sum, deal) => {
            const value = parseInt(deal.value.replace(/[₹,]/g, '')) || 0;
            return sum + value;
          }, 0);
          
          return (
            <Card key={stage}>
              <CardContent className="p-4">
                <div className={`w-3 h-3 rounded-full ${stageColors[stage]} mb-2`} />
                <p className="text-sm text-gray-600">{stage}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{deals.length}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ₹{(totalValue / 100000).toFixed(1)}L
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {Object.entries(kanbanData).map(([stage, deals]) => (
            <div key={stage} className="w-80 flex-shrink-0">
              <div className={`${stageColors[stage]} text-white px-4 py-3 rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{stage}</h3>
                  <Badge className="bg-white/20 text-white">{deals.length}</Badge>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-b-lg min-h-[500px] space-y-3">
                {deals.map((deal) => (
                  <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-move">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{deal.name}</h4>
                          <p className="text-sm text-gray-600">{deal.capacity}</p>
                        </div>
                        <User className="text-gray-400" size={18} />
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <DollarSign size={14} className="mr-1 text-[#0047BA]" />
                        <span className="font-semibold text-[#0047BA]">{deal.value}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar size={12} className="mr-1" />
                        {deal.date}
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-xs"
                          onClick={() => handleViewDetails(deal.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Click on a card to view full details and add notes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}