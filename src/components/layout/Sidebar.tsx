"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX, FiMonitor, FiLogOut, FiSettings, FiFileText, FiInbox } from "react-icons/fi";

const navItems = [
  { href: "/", label: "Overview", icon: FiMonitor },
  { href: "/forms/franchise", label: "Franchise Forms", icon: FiInbox },
  { href: "/forms/business", label: "Business Forms", icon: FiInbox },
  { href: "/news", label: "Manage News", icon: FiFileText },
  { href: "/articles", label: "Manage Articles", icon: FiFileText },
  { href: "/", label: "Settings", icon: FiSettings },
  { href: "/", label: "Logout", icon: FiLogOut },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
        {isOpen ? (
          <FiX className="w-5 h-5" />
        ) : (
          <FiMenu className="w-5 h-5" />
        )}
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
          <nav className="mt-10">
            <ul className="space-y-8">
              {navItems.map(({ href, label, icon: Icon }) => (
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
          </nav>
        </div>
      </aside>
    </>
  );
}
