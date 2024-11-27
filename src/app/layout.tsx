import type { Metadata } from "next";
import { SERVER_NAME } from "@/api/config";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-10 pb-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
