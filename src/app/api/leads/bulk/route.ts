import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for leads (in a real app, this would be a database)
let storedLeads: any[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    monthlyBill: "5000",
    suggestedKW: "5",
    source: "Website",
    status: "New",
    notes: "Interested in residential solar with subsidy"
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    email: "priya@example.com",
    monthlyBill: "3000",
    suggestedKW: "3",
    source: "ROI Calculator",
    status: "Contacted",
    notes: "Requested proposal via ROI calculator"
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leads } = body;

    // In a real application, this would interact with a database
    // For now, we'll store in memory
    console.log('Storing leads:', leads);
    
    // Replace stored leads with new ones (upsert)
    storedLeads = leads.map((lead: any, index: number) => ({
      ...lead,
      id: lead.id || Date.now() + index // Generate ID if not provided
    }));

    return NextResponse.json({ 
      success: true, 
      message: `${leads.length} leads processed successfully`,
      data: storedLeads
    });
  } catch (error) {
    console.error('Error processing leads:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process leads',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Return stored leads
    return NextResponse.json({ 
      success: true, 
      data: storedLeads
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch leads',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}