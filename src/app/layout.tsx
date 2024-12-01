"use client"

import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route

  const isFullScreenPage = pathname === "/login"; // Check if it's the login page

  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${isFullScreenPage ? "" : "flex"}`}>
        {/* Conditional rendering for Sidebar */}
        {!isFullScreenPage && <Sidebar />}

        {/* Main Content */}
        <div
          className={`flex flex-col flex-1 h-full overflow-hidden ${
            isFullScreenPage ? "w-full" : ""
          }`}
        >
          <div className="flex-1 flex flex-col overflow-y-auto">
            <main className={`${isFullScreenPage ? "h-full" : "flex-1 pt-8 sm:pt-10 pb-10"}`}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
