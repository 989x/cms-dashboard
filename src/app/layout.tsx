import "./globals.css";
import { SERVER_IP } from "@/api/config";
import ClientLayout from "./client-layout";

export const metadata = {
  title: `CMS Dashboard (${SERVER_IP})`,
  description: `Manage your CMS content seamlessly.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
