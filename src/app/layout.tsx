import "./globals.css";
import type { Metadata } from "next";
import { SERVER_NAME } from "@/api/config";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: `${SERVER_NAME} - Dashboard`,
  description: `Welcome to ${SERVER_NAME}, your reliable dashboard solution.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <div className="flex-1 flex flex-col overflow-y-auto">
            <main className="flex-1 pt-8 sm:pt-10 pb-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
