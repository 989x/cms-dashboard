"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVER_IP } from "@/api/config";
import { clearAuthToken } from "@/utils/authStorage";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { navItems } from "./navItems";

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
        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="p-6 flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
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
                <p className="text-[17px] font-semibold group-hover:text-blue-600 transition-colors">
                  Dashboard
                </p>
                <p className="text-sm text-gray-500 group-hover:text-blue-400 transition-colors">
                  {SERVER_IP}
                </p>
              </div>
            </Link>
          </div>

          {/* Scrollable Navigation Section */}
          <nav className="flex-1 overflow-y-auto px-6">
            {navItems.map(({ category, items }) => (
              <div key={category} className="mb-4">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {category}
                </h2>
                <ul className="mt-4 space-y-4">
                  {items.map(({ href, label, icon: Icon }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-500"
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Account Section */}
          <div className="flex-shrink-0 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/labubu.webp"
                    alt="User Profile Picture"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <p className="font-medium text-gray-800">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 border-[1.5px] rounded-lg"
                aria-label="Logout"
              >
                <FiLogOut className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
