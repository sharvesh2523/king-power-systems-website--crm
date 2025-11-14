"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Kanban,
  FileText,
  Database,
  CheckSquare,
  CreditCard,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, refetch } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/leads", label: "Lead Management", icon: UserPlus },
    { href: "/admin/follow-ups", label: "Follow-Up Reminders", icon: CheckSquare },
    { href: "/admin/pipeline", label: "Sales Pipeline", icon: Kanban },
    { href: "/admin/quotes", label: "Quotations", icon: FileText },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/admin/billing", label: "Billing & Invoices", icon: CreditCard },
  ];

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    localStorage.removeItem("bearer_token");
    refetch();
    router.push("/admin");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0047BA] text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-[#0047BA] to-[#1A5FE8] text-white w-64 z-40
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#0047BA] font-bold text-xl">K</span>
              </div>
              <div>
                <div className="font-bold text-lg">King Power</div>
                <div className="text-xs text-white/80">Admin CRM</div>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Users size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{session?.user?.name || "Admin"}</div>
                <div className="text-xs text-white/70 truncate">{session?.user?.email}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                        ${
                          isActive
                            ? "bg-white text-[#0047BA] shadow-lg"
                            : "hover:bg-white/10 text-white"
                        }
                      `}
                    >
                      <item.icon size={20} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/20">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="mr-2" size={18} />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}
