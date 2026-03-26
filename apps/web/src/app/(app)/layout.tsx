// Server component — wraps everything in the app shell
import { Suspense } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import ChatSidebar from '@/components/sidebar/ChatSidebar';
import LeftNavStrip from '@/components/sidebar/LeftNavStrip';
import ResponsiveMain from '@/components/layout/ResponsiveMain';

// Loading component for ChatSidebar
function ChatSidebarSkeleton() {
  return (
    <div className="w-full h-full bg-white dark:bg-[#151a21] border-r border-gray-100 dark:border-[#222838] animate-pulse">
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-[#222838] rounded w-3/4"></div>
        <div className="h-10 bg-gray-200 dark:bg-[#222838] rounded"></div>
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-[#222838] rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-200 dark:bg-[#222838] rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 dark:bg-[#222838] rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#f7f8fa] dark:bg-[#0b0e13] overflow-hidden">

        {/* Far-left icon nav — always dark, hidden on small screens */}
        <div className="hidden md:flex flex-shrink-0">
          <LeftNavStrip />
        </div>

        {/* Responsive area: sidebar + main — controlled by client component */}
        <ResponsiveMain sidebar={
          <Suspense fallback={<ChatSidebarSkeleton />}>
            <ChatSidebar />
          </Suspense>
        }>
          {children}
        </ResponsiveMain>
      </div>
    </AuthGuard>
  );
}
