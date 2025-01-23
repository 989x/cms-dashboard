// cms-dashboard/src/app/client-layout.tsx

'use client';

import Sidebar from '@/components/layout/Sidebar';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { hasAuthToken } from '@/utils/authStorage';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isFullScreenPage = pathname === '/login';

  useEffect(() => {
    // Check if user is authenticated
    if (!hasAuthToken() && pathname !== '/login') {
      router.replace('/login');
    }
  }, [router, pathname]);

  // Optionally prevent rendering until authentication is verified
  if (!hasAuthToken() && pathname !== '/login') {
    return null; // Prevent rendering if redirecting
  }

  return (
    <div className={`h-full ${isFullScreenPage ? '' : 'flex'}`}>
      {!isFullScreenPage && <Sidebar />}
      <div
        className={`flex flex-col flex-1 h-full overflow-hidden ${
          isFullScreenPage ? 'w-full' : ''
        }`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main
            className={`${
              isFullScreenPage ? 'h-full' : 'flex-1 pt-8 sm:pt-10 pb-10'
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
