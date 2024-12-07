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
  FiSettings,
  FiFileText,
  FiInbox,
  FiLogOut,
} from "react-icons/fi";

const navItems = [
  {
    category: "Homepage",
    items: [{ href: "/", label: "Overview", icon: FiMonitor }],
  },
  {
    category: "Messages",
    items: [
      { href: "/forms/franchise", label: "Franchise forms", icon: FiInbox },
      { href: "/forms/business", label: "Business forms", icon: FiInbox },
    ],
  },
  {
    category: "Management",
    items: [{ href: "/", label: "Manage content", icon: FiFileText }],
  },
  {
    category: "General",
    items: [{ href: "/", label: "Settings", icon: FiSettings }],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
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
            <div className="flex items-center gap-3">
              <div className="w-11 h-11">
                <Image
                  src="/favicon.png"
                  alt="Server Logo"
                  width={44}
                  height={44}
                  className="object-cover"
                />
              </div>
              <div className="space-y-[1px]">
                <p className="text-[17px] font-semibold">Dashboard</p>
                <p className="text-sm text-gray-500">{SERVER_IP}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-10 space-y-8">
            {navItems.map(({ category, items }) => (
              <div key={category}>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {category}
                </h2>
                <ul className="mt-5 space-y-5">
                  {items.map(({ href, label, icon: Icon }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="flex items-center gap-4 text-gray-700 hover:text-blue-500"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* account section */}
          <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-3 sm:px-5 pb-5">
            <div className="flex items-center gap-4">
              <div className="relative w-11 h-11">
                <Image
                  src="/labubu.webp"
                  alt="User Profile Picture"
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <p className="font-medium text-gray-800">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 border-[1.5px] rounded-lg"
              aria-label="Logout"
            >
              <FiLogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
