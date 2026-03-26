'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Chat } from '@/types';
import Avatar from '@/components/common/Avatar';
import ProfilePanel from './ProfilePanel';

interface Props {
  readonly chat: Chat;
  readonly currentUid: string;
}

export default function ChatHeader({ chat, currentUid }: Props) {
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  const otherUid = chat.type === 'direct'
    ? chat.members.find((m) => m !== currentUid) ?? null
    : null;

  const name = (chat.type === 'group' || chat.type === 'community')
    ? (chat.groupName ?? 'Group')
    : (chat.memberDetails[otherUid!]?.displayName ?? 'Unknown');

  const photo = (chat.type === 'group' || chat.type === 'community')
    ? chat.groupPhotoURL
    : chat.memberDetails[otherUid!]?.photoURL;

  const subtitle = (chat.type === 'group' || chat.type === 'community')
    ? `${chat.members.length} members`
    : 'Project Manager';

  return (
    <>
      {/* Header bar */}
      <div className="flex items-center gap-4 px-4 py-3 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] transition-colors flex-shrink-0 h-[60px]">
        {/* Back button — mobile only */}
        <button
          onClick={() => router.back()}
          className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover transition-colors flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setShowProfile((v) => !v)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left min-w-0 flex-1"
        >
          <Avatar src={photo} name={name} size={38} />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold text-wa-text leading-tight truncate">{name}</p>
            <p className="text-[12px] text-wa-textMuted leading-tight">{subtitle}</p>
          </div>
        </button>

        <div className="flex-1" />

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {[
            { title: 'Call', path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
            { title: 'History', path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { title: 'Search', path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
            { title: 'More', path: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' },
          ].map(({ title, path }) => (
            <button
              key={title}
              title={title}
              className="w-9 h-9 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover hover:text-wa-text transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
              </svg>
            </button>
          ))}

          {/* Profile toggle */}
          <button
            onClick={() => setShowProfile((v) => !v)}
            title="Profile"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${showProfile ? 'bg-wa-primary/10 text-wa-primary' : 'text-wa-textMuted hover:bg-wa-hover hover:text-wa-text'}`}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile panel mounts beside content — rendered in the chat wrapper via context or portal */}
      {/* We pass showProfile to page.tsx via a context trick. For now it renders inline. */}
      {showProfile && (
        <div className="fixed right-0 top-0 bottom-0 z-30">
          <ProfilePanel chat={chat} currentUid={currentUid} onClose={() => setShowProfile(false)} />
        </div>
      )}
    </>
  );
}
