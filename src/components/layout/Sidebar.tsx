"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SERVER_IP } from "@/api/config";
import { clearAuthToken } from "@/utils/authStorage";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { navItems } from "./navItems";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current path

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
        className={`fixed top-0 left-0 h-full border-r transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <div className="h-full bg-white flex flex-col">
          {/* Header Section */}
          <div className="p-4 flex-shrink-0">
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
              <div className="space-y-[2px]">
                <p className="text-base font-semibold group-hover:text-blue-600 transition-colors">
                  Dashboard
                </p>
                <p className="text-sm text-gray-500 group-hover:text-blue-400 transition-colors">
                  {SERVER_IP}
                </p>
              </div>
            </Link>
          </div>

          {/* Scrollable Navigation Section */}
          <nav className="flex-1 overflow-y-auto px-4 no-scrollbar">
            {navItems.map(({ category, items }) => (
              <div key={category}>
                <h2 className="text-xs my-2 font-semibold text-gray-400 uppercase tracking-wide">
                  {category}
                </h2>
                <ul className="space-y-[2px] -mr-4"> {/* Adjust and custom spacing */}
                  {items.map(({ href, label, icon: Icon }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className={`relative flex items-center gap-2.5 text-[13px] font-medium px-3 py-2 rounded-md ${
                          pathname === href
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-gray-700 hover:text-blue-500 hover:bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            pathname === href ? "text-blue-600" : "text-gray-500"
                          }`}
                        />
                        <span>{label}</span>
                        {pathname === href && (
                          <span className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-md"></span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Account Section */}
          <div className="flex-shrink-0 p-4 mb-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-[38px] h-[38px]">
                  <Image
                    src="/labubu.webp"
                    alt="User Profile Picture"
                    width={38}
                    height={38}
                    className="rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <p className="text-sm text-gray-800 font-medium">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 border-[1.5px] rounded-lg"
                aria-label="Logout"
              >
                <FiLogOut className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
