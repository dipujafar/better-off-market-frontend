"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Settings,
  ShoppingCart,
  HousePlus,
  Receipt,
  ChartNoAxesCombined,
  User,
  Lock,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const path = pathname?.split("/")[2];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const router = useRouter();

  const SIDEBAR_LINKS = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={25} />,
      href: "/user/dashboard",
    },
    {
      key: "my-listings",
      label: "My Listings",
      icon: <HousePlus size={25} />,
      href: "/user/my-listings",
    },

    {
      key: "offers-received",
      label: "Offers Received",
      icon: <Receipt size={25} />,
      href: "/user/offers-received",
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: <ChartNoAxesCombined size={25} />,
      href: "/user/analytics",
    },
    {
      key: "edit-profile",
      label: "Edit Profile",
      icon: <User size={25} />,
      href: "/user/edit-profile",
    },
    {
      key: "change-password",
      label: "Change Password",
      icon: <Lock size={25} />,
      href: "/user/change-password",
    }
  ];

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Close the sidebar when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById("dashboardSidebar");
    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarVisible]);

  return (
    <div className="border-r-2 border-[#ECEEF0] pr-4 h-full">
      {/* Menu Toggle Button for mobile/tablet devices */}
      <div className="p-4 xl:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          {isSidebarVisible ? <X size={28} /> : <Menu size={28} />}{" "}
          {/* Toggle between Menu and Close (X) icons */}
        </button>
      </div>

      {/* Sidebar */}
      <div
        id="dashboardSidebar"
        className={`fixed inset-y-0 left-0 z-30 xl:z-10 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out xl:relative xl:transform-none xl:shadow-none ${
          isSidebarVisible
            ? "translate-x-0"
            : "-translate-x-full xl:translate-x-0"
        }`}
      >
        <div className="dashboard-card bg-white py-5">
          <div className="space-y-2">
            {SIDEBAR_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className={cn(
                  "flex items-center gap-x-3 px-5 py-3 text-gray-scale-600 transition-all duration-300 ease-in-out text-sm",
                  pathname === link.href &&
                    "border-l-4 border-l-primary-color bg-primary-color rounded-xl text-base text-white",
                  link.href.includes(path) &&
                    "border-l-4 border-l-primary-color bg-primary-color text-base text-white",
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            <button
              onClick={() => {
                router.push("/sign-in");
              }}
              type="button"
              className="flex items-center gap-x-3 px-5 py-4 text-base text-[#BA1A1A] "
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
            <div className="border border-b border-[#ECEEF0] mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
