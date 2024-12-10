import { SERVER_IP } from "@/api/config";

export const metadata = {
  title: `CMS ${SERVER_IP}`,
  description: `Access your CMS Dashboard securely.`,
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
