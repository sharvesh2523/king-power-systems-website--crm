import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Create admin user with the specified credentials
    const adminUser = await auth.api.signUp({
      email: "admin@kingpowersystem.in",
      password: "KingPower@123",
      name: "Admin"
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin user created successfully",
        user: adminUser
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error("Error creating admin user:", error);
    
    // If user already exists, return a different message
    if (error.message && (error.message.includes('exists') || error.message.includes('duplicate'))) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Admin user may already exist"
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Error creating admin user: " + error.message
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}