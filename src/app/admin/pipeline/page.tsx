"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, User, Calendar } from "lucide-react";

export default function PipelinePage() {
  const [kanbanData] = useState({
    "Lead": [
      { id: 1, name: "Rajesh Kumar", value: "₹3,00,000", capacity: "5 kW", date: "Jan 15" },
      { id: 2, name: "Priya Sharma", value: "₹1,80,000", capacity: "3 kW", date: "Jan 14" },
      { id: 3, name: "Vikram Singh", value: "₹2,40,000", capacity: "4 kW", date: "Jan 11" }
    ],
    "Qualified": [
      { id: 4, name: "Sneha Reddy", value: "₹4,20,000", capacity: "7 kW", date: "Jan 12" },
      { id: 5, name: "Kavita Desai", value: "₹3,60,000", capacity: "6 kW", date: "Jan 10" }
    ],
    "Quote Sent": [
      { id: 6, name: "Amit Patel", value: "₹60,00,000", capacity: "100 kW", date: "Jan 13" },
      { id: 7, name: "Arjun Mehta", value: "₹9,00,000", capacity: "15 kW", date: "Jan 09" }
    ],
    "Negotiation": [
      { id: 8, name: "Meera Iyer", value: "₹1,20,000", capacity: "2 kW", date: "Jan 08" }
    ],
    "Won": [
      { id: 9, name: "Rohit Kapoor", value: "₹6,00,000", capacity: "10 kW", date: "Jan 07" }
    ]
  });

  const stageColors: Record<string, string> = {
    "Lead": "bg-blue-500",
    "Qualified": "bg-purple-500",
    "Quote Sent": "bg-orange-500",
    "Negotiation": "bg-yellow-500",
    "Won": "bg-green-500"
  };

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
            const value = parseInt(deal.value.replace(/[₹,]/g, ''));
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
                        <Button size="sm" variant="outline" className="w-full text-xs">
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
            <strong>Tip:</strong> Drag and drop cards between columns to update deal status. Click on a card to view full details and add notes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
