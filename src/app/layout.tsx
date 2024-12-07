import "./globals.css";
import { SERVER_IP } from "@/api/config";
import ClientLayout from "./client-layout";

export const metadata = {
  title: `CMS ${SERVER_IP}`,
  description: `Manage your CMS content seamlessly.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" type="image/png" />
      </head>
      <body className="h-full">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
