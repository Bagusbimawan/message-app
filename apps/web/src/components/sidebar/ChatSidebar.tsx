'use client';

import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import ChatListItem from './ChatListItem';
import NewChatModal from './NewChatModal';
import { MOCK_CHATS, CURRENT_UID } from '@/mock/data';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function ChatSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string>('home');
  const [subFilter, setSubFilter] = useState<'all' | 'groups' | 'contacts'>('all');
  const [navOpen, setNavOpen] = useState(false);

  const activeChatId = pathname.match(/\/chat\/([^/]+)/)?.[1] ?? null;
  const activeRoomId = searchParams.get('room');

  const communities = MOCK_CHATS.filter(c => c.type === 'community');
  const allHomeChats = MOCK_CHATS.filter(c => c.type !== 'community');

  // Apply sub-filter on top of homeChats
  const homeChats = subFilter === 'groups'
    ? allHomeChats.filter(c => c.type === 'group')
    : subFilter === 'contacts'
      ? allHomeChats.filter(c => c.type === 'direct')
      : allHomeChats;

  const getFilteredChats = (chats: typeof MOCK_CHATS) => search.trim()
    ? chats.filter((c) => {
      const otherUid = c.members.find((m) => m !== CURRENT_UID);
      const name = c.type === 'group' ? (c.groupName ?? '') : (c.memberDetails[otherUid!]?.displayName ?? '');
      return name.toLowerCase().includes(search.toLowerCase());
    })
    : chats;

  const NAV_LINKS = [
    {
      href: '/chat', label: t('chats'),
      icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>),
    },
    {
      href: '/groups', label: t('groups'),
      icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    },
    {
      href: '/contacts', label: t('contacts'),
      icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>),
    },
    {
      href: '/profile', label: t('profile'),
      icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0M19 21a7 7 0 00-14 0" /></svg>),
    },
  ] as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <div className="flex flex-col h-full">

      {/* ── Mobile top bar (hidden on desktop) ── */}
      <div className="md:hidden flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
        {/* Hamburger burger button */}
        <button
          onClick={() => setNavOpen(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-wa-textMuted hover:bg-wa-hover transition-colors"
          aria-label="Navigation menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* App name */}
        <span className="text-[16px] font-extrabold text-wa-text tracking-tight">Messenger</span>
        {/* Profile avatar */}
        <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          Y
        </Link>
      </div>

      {/* ── Mobile nav drawer overlay ── */}
      {navOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setNavOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          {/* Drawer panel */}
          <aside
            className="relative w-[72vw] max-w-[280px] h-full bg-white dark:bg-[#151a21] shadow-2xl flex flex-col animate-slide-in-left"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center gap-3 px-5 pt-8 pb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#00d097] flex items-center justify-center shadow-lg shadow-[#00d097]/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-[16px] font-extrabold text-wa-text">{t('messengerApp')}</p>
                <p className="text-[12px] text-wa-textMuted">{t('chooseSection')}</p>
              </div>
            </div>
            {/* Nav links */}
            <nav className="flex-1 px-3 space-y-1">
              {NAV_LINKS.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setNavOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors',
                    pathname === href || pathname.startsWith(href + '/')
                      ? 'bg-wa-primary/10 text-wa-primary'
                      : 'text-wa-text hover:bg-wa-hover'
                  )}
                >
                  <span className="flex-shrink-0">{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>
            {/* Settings at bottom */}
            <div className="px-3 pb-8">
              <div className="h-px bg-gray-100 dark:bg-[#222838] mb-3" />
              <Link
                href="/profile"
                onClick={() => setNavOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold text-wa-text hover:bg-wa-hover transition-colors"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t('settings')}
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Top header */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        {/* Search box */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wa-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-3 py-2 text-sm bg-wa-bg text-wa-text rounded-lg border border-wa-border focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-wa-textMuted hover:text-wa-text">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* Section nav: show community folders as tabs */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveFolder('home')}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                activeFolder === 'home' ? "bg-wa-primary/10 text-wa-primary" : "text-wa-textMuted hover:bg-wa-hover hover:text-wa-text"
              )}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {t('chats')}
              <span className="bg-wa-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {homeChats.length}
              </span>
            </button>
            {communities.map(comm => (
              <button
                key={comm.id}
                onClick={() => setActiveFolder(comm.id)}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                  activeFolder === comm.id ? "bg-wa-primary/10 text-wa-primary" : "text-wa-textMuted hover:bg-wa-hover hover:text-wa-text"
                )}
              >
                #{comm.groupName?.split(' ')[0]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-wa-textMuted hover:text-wa-primary hover:bg-wa-hover transition-colors"
            title={t('newChat')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sub-filter tabs: All / Groups / Contacts — stay in sidebar, filter chat list */}
      {activeFolder === 'home' && (
        <div className="px-4 mb-2 flex items-center gap-1 flex-shrink-0">
          {([
            { key: 'all', label: t('all') },
            { key: 'groups', label: t('groups') },
            { key: 'contacts', label: t('contacts') },
          ] as { key: 'all' | 'groups' | 'contacts'; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSubFilter(key)}
              className={clsx(
                'px-2.5 py-1 rounded-lg text-[12px] font-semibold transition-colors',
                subFilter === key
                  ? 'bg-wa-primary/10 text-wa-primary'
                  : 'text-wa-textMuted hover:bg-wa-hover hover:text-wa-text'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}



      {/* Favourites section label */}
      {activeFolder === 'home' && (
        <div className="px-5 py-1.5 flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-bold text-wa-textMuted uppercase tracking-widest">Favourite</span>
          <button className="text-wa-textMuted hover:text-wa-primary">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2">
        {activeFolder === 'home' ? (
          getFilteredChats(homeChats).length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-wa-textMuted">{search ? t('notFound') : t('noMessages')}</div>
          ) : (
            getFilteredChats(homeChats).map((chat) => (
              <ChatListItem key={chat.id} chat={chat} currentUid={CURRENT_UID} active={chat.id === activeChatId} />
            ))
          )
        ) : (
          (() => {
            const comm = communities.find(c => c.id === activeFolder);
            if (!comm || !comm.rooms) return null;

            const filteredRooms = search.trim()
              ? comm.rooms.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
              : comm.rooms;

            return filteredRooms.map((room) => {
              const roomUnread = room.unreadCount?.[CURRENT_UID] ?? 0;
              const isActive = activeChatId === comm.id && activeRoomId === room.id;

              return (
                <Link
                  key={room.id}
                  href={`/chat/${comm.id}?room=${room.id}`}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-3 rounded-xl mx-1 mb-1 transition-colors",
                    isActive ? "bg-wa-primary/10" : "hover:bg-wa-hover"
                  )}
                >
                  <div className={clsx(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 transition-colors",
                    isActive ? "bg-wa-primary text-white shadow-sm shadow-wa-primary/30" : "bg-wa-hover text-wa-textMuted"
                  )}>
                    #
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={clsx("text-sm font-semibold truncate", isActive ? "text-wa-primary" : "text-wa-text")}>{room.name}</p>
                    <p className="text-xs text-wa-textMuted truncate">Tap to view messages</p>
                  </div>
                  {roomUnread > 0 && (
                    <span className="bg-wa-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {roomUnread}
                    </span>
                  )}
                </Link>
              );
            });
          })()
        )}
      </div>

      {showNew && <NewChatModal currentUid={CURRENT_UID} onClose={() => setShowNew(false)} />}
    </div>
  );
}
