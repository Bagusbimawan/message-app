// Server component — wraps everything in the app shell
import AuthGuard from '@/components/auth/AuthGuard';
import ChatSidebar from '@/components/sidebar/ChatSidebar';
import LeftNavStrip from '@/components/sidebar/LeftNavStrip';
import ResponsiveMain from '@/components/layout/ResponsiveMain';

export default function AppLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#f7f8fa] dark:bg-[#0b0e13] overflow-hidden">

        {/* Far-left icon nav — always dark, hidden on small screens */}
        <div className="hidden md:flex flex-shrink-0">
          <LeftNavStrip />
        </div>

        {/* Responsive area: sidebar + main — controlled by client component */}
        <ResponsiveMain sidebar={<ChatSidebar />}>
          {children}
        </ResponsiveMain>
      </div>
    </AuthGuard>
  );
}
