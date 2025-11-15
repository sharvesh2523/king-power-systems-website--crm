"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function CreateAdminPage() {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createAdmin = async () => {
    setIsLoading(true);
    setStatus("Creating admin user...");
    
    try {
      const { error, data } = await authClient.signUp.email({
        email: "admin@kingpowersystem.in",
        password: "KingPower@123",
        name: "Admin"
      });

      if (error) {
        setStatus(`Error: ${error.message}`);
        setIsLoading(false);
        return;
      }

      setStatus("Admin user created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err: any) {
      setStatus(`Error: ${err.message || "Unknown error"}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Create Admin User</h1>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="font-semibold">Admin Credentials</h2>
              <p>Email: admin@kingpowersystem.in</p>
              <p>Password: KingPower@123</p>
            </div>
            
            <button
              onClick={createAdmin}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Admin User"}
            </button>
            
            {status && (
              <div className="p-3 bg-gray-100 rounded text-center">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}