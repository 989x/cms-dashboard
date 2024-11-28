"use client";

import { useState } from "react";
import Image from "next/image";
import { SERVER_NAME } from "@/api/config";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = { name: "Admin", status: "Online" };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-4 right-4 z-50 p-3 bg-blue-500 border-2 text-white rounded-full lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
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
        className={`fixed top-0 right-0 h-full bg-gray-100 border transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-64 transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:flex-shrink-0`}
      >
        <div className="pt-10 px-3 sm:px-5 flex flex-col items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Image
              src="/favicon.ico"
              alt="CMS Dashboard Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-lg font-bold">{SERVER_NAME}</h1>
          </div>

          {/* User Info Section */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Status: {user.status}</span>
            <span className="text-sm font-semibold">{user.name}</span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-10 w-full">
            <ul className="space-y-4">
              {["Dashboard", "Settings", "Profile", "Logout"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="block text-gray-500 font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
