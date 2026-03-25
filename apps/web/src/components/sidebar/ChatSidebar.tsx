'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ChatListItem  from './ChatListItem';
import NewChatModal  from './NewChatModal';
import { MOCK_CHATS, CURRENT_UID } from '@/mock/data';

export default function ChatSidebar() {
  const pathname = usePathname();
  const [search,  setSearch]  = useState('');
  const [showNew, setShowNew] = useState(false);

  const activeChatId = pathname.match(/\/chat\/([^/]+)/)?.[1] ?? null;

  const filtered = search.trim()
    ? MOCK_CHATS.filter((c) => {
        const otherUid = c.members.find((m) => m !== CURRENT_UID);
        const name = c.type === 'group'
          ? (c.groupName ?? '')
          : (c.memberDetails[otherUid!]?.displayName ?? '');
        return name.toLowerCase().includes(search.toLowerCase());
      })
    : MOCK_CHATS;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">Pesan</h1>
        <button
          onClick={() => setShowNew(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          title="Chat baru"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari percakapan…"
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-400">
            {search ? 'Tidak ditemukan' : 'Belum ada percakapan'}
          </div>
        ) : (
          filtered.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              currentUid={CURRENT_UID}
              active={chat.id === activeChatId}
            />
          ))
        )}
      </div>

      {showNew && (
        <NewChatModal currentUid={CURRENT_UID} onClose={() => setShowNew(false)} />
      )}
    </>
  );
}
