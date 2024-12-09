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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">
        Dashboard
      </h1>
      <div className="space-y-6">
        {navItems.map((category) => (
          <div key={category.category}>
            <h2 className="font-semibold mb-4 text-gray-700">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block border rounded-lg p-4"
                >
                  <div className="flex flex-col">
                    <div className="w-8 h-8 mb-3 flex-shrink-0">
                      {item.icon ? (
                        <item.icon className="w-full h-full text-blue-500" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-full"></div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-700">
                      {item.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </p>
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
