import AuthGuard from '@/components/auth/AuthGuard';
import ChatSidebar from '@/components/sidebar/ChatSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Sidebar — fixed width on desktop, hidden on mobile when chat is open */}
        <aside className="w-full sm:w-80 lg:w-96 border-r border-gray-200 flex-shrink-0 flex flex-col">
          <ChatSidebar />
        </aside>

        {/* Main content */}
        <main className="hidden sm:flex flex-1 flex-col min-w-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
