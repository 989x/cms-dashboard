"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVER_IP } from "@/api/config";
import { clearAuthToken } from "@/utils/authStorage";
import {
  FiMenu,
  FiX,
  FiMonitor,
  FiLogOut,
  FiSettings,
  FiFileText,
  FiInbox,
} from "react-icons/fi";

const navItems = [
  {
    category: "General",
    items: [{ href: "/", label: "Overview", icon: FiMonitor }],
  },
  {
    category: "Forms",
    items: [
      { href: "/forms/franchise", label: "Franchise Forms", icon: FiInbox },
      { href: "/forms/business", label: "Business Forms", icon: FiInbox },
    ],
  },
  {
    category: "Management",
    items: [{ href: "/", label: "Manage Content", icon: FiFileText }],
  },
  {
    category: "Settings",
    items: [
      { href: "/", label: "Settings", icon: FiSettings },
      { href: "#", label: "Logout", icon: FiLogOut, isLogout: true }, // Add isLogout flag
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Use router for navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-5 right-4 z-50 p-3.5 bg-black text-white rounded-full shadow-xl lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <div className="p-6">
          <div className="flex flex-col mt-2">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8">
                <Image
                  src="/favicon.ico"
                  alt="Server Logo"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="font-semibold">CMS Dashboard</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-10 space-y-8">
            {navItems.map(({ category, items }) => (
              <div key={category}>
                {/* Category */}
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {category}
                </h2>
                <ul className="mt-5 space-y-5">
                  {items.map(({ href, label, icon: Icon, isLogout }) => (
                    <li key={label}>
                      {isLogout ? (
                        // Logout button
                        <button
                          onClick={clearAuthToken}
                          className="flex items-center gap-4 text-gray-700 hover:text-blue-500 w-full text-left"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{label}</span>
                        </button>
                      ) : (
                        // Normal navigation link
                        <Link
                          href={href}
                          className="flex items-center gap-4 text-gray-700 hover:text-blue-500"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{label}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 w-full flex items-center gap-4 px-3 sm:px-5 pb-5">
            <div className="relative w-11 h-11">
              <Image
                src="/labubu.webp"
                alt="User Profile Picture"
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
              {/* Green dot */}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-medium text-gray-800">admin</h2>
              <p className="text-sm text-gray-500">IP: {SERVER_IP}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
