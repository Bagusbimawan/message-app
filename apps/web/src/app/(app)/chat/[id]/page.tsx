import { Suspense } from 'react';
import ChatRoomContent from './ChatRoomContent';

// Loading skeleton for chat room
function ChatRoomSkeleton() {
  return (
    <div className="flex flex-col h-full bg-wa-panel">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] animate-pulse">
        <div className="w-10 h-10 bg-gray-200 dark:bg-[#222838] rounded-full"></div>
        <div className="flex-1 space-y-1">
          <div className="h-4 bg-gray-200 dark:bg-[#222838] rounded w-32"></div>
          <div className="h-3 bg-gray-200 dark:bg-[#222838] rounded w-20"></div>
        </div>
      </div>
      
      {/* Messages skeleton */}
      <div className="flex-1 p-4 space-y-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs p-3 rounded-2xl ${i % 2 === 0 ? 'bg-gray-200 dark:bg-[#222838]' : 'bg-blue-200 dark:bg-blue-900/30'}`}>
              <div className="h-3 bg-gray-300 dark:bg-[#333] rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-[#333] rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input skeleton */}
      <div className="p-4 bg-white dark:bg-[#151a21] border-t border-gray-100 dark:border-[#222838] animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-[#222838] rounded-full"></div>
      </div>
    </div>
  );
}

export default function ChatRoomPage() {
  return (
    <Suspense fallback={<ChatRoomSkeleton />}>
      <ChatRoomContent />
    </Suspense>
  );
}
