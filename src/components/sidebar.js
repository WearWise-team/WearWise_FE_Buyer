"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  ShoppingCart,
  MessageSquare,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Comments",
      path: "/comments",
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Supplier Dashboard</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`
                  flex items-center px-4 py-3 text-sm rounded-md transition-colors
                  ${
                    pathname === route.path
                      ? "bg-gray-100 dark:bg-gray-700 text-primary font-medium"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {route.icon}
                <span className="ml-3">{route.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                S
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Supplier Name</p>
                <p className="text-xs text-muted-foreground">
                  supplier@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
