"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if on login page or still loading
    if (pathname === "/admin" || isPending) return;

    if (!session?.user) {
      router.push("/admin");
    }
  }, [session, isPending, router, pathname]);

  // Show loading state
  if (isPending && pathname !== "/admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0047BA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Login page doesn't need sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Protected pages with sidebar
  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
