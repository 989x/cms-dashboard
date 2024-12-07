"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasAuthToken } from "@/utils/authStorage";
import { navItems } from "@/components/layout/navItems";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!hasAuthToken()) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Dashboard</h1>
      <div className="space-y-8">
        {navItems.map((category) => (
          <div key={category.category}>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      {item.icon ? (
                        <item.icon className="w-full h-full text-blue-500" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
