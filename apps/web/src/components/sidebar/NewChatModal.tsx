'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/common/Avatar';
import { UserPreview } from '@/types';
import clsx from 'clsx';

interface Props {
  currentUid: string;
  onClose: () => void;
}

const MOCK_USERS: UserPreview[] = [
  { uid: 'user2', displayName: 'Budi Santoso', photoURL: null },
  { uid: 'user3', displayName: 'Sari Dewi', photoURL: null },
  { uid: 'user4', displayName: 'Andi Wijaya', photoURL: null },
  { uid: 'user5', displayName: 'Rina Pratiwi', photoURL: null },
  { uid: 'user6', displayName: 'Doni Kusuma', photoURL: null },
];

type TabType = 'DM' | 'GROUP' | 'COMMUNITY';

export default function NewChatModal({ onClose }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>('DM');
  const [query, setQuery] = useState('');

  // States for Group/Community creation
  const [groupName, setGroupName] = useState('');
  const [subRooms, setSubRooms] = useState('general, frontend');

  const results = query.trim()
    ? MOCK_USERS.filter((u) =>
      u.displayName.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  function startDirectChat(user: UserPreview) {
    // TODO: backend integration
    router.push(`/chat/${user.uid}`);
    onClose();
  }

  function handleCreateGroupOrCommunity(e: React.FormEvent) {
    e.preventDefault();
    if (!groupName.trim()) return;

    // Simulate creating a group/community and navigating to it
    // In a real app this would call the API and return the new ID
    const mockNewId = `new_${Date.now()}`;
    const roomsArray = subRooms.split(',').map(r => r.trim()).filter(Boolean);

    console.log('Creating:', {
      type: tab === 'COMMUNITY' ? 'community' : 'group',
      name: groupName,
      rooms: tab === 'COMMUNITY' ? roomsArray : null
    });

    // Fallback to chat 4 (mock community) to show the discord behavior
    router.push(`/chat/4?room=r1`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-wa-panel text-wa-text rounded-2xl shadow-xl w-full max-w-sm p-0 overflow-hidden border border-wa-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-wa-border bg-wa-header">
          <h2 className="font-semibold text-[16px]">Buat Percakapan</h2>
          <button onClick={onClose} className="text-wa-textMuted hover:text-wa-text transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-wa-border bg-wa-header px-4">
          {(['DM', 'GROUP', 'COMMUNITY'] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                "flex-1 py-3 text-sm font-semibold transition-colors border-b-2",
                tab === t
                  ? "border-wa-primary text-wa-primary"
                  : "border-transparent text-wa-textMuted hover:text-wa-text"
              )}
            >
              {t === 'DM' ? 'Personal' : t === 'GROUP' ? 'Grup' : 'Komunitas'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'DM' && (
            <div className="space-y-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kontak…"
                autoFocus
                className="w-full px-3 py-2 text-sm bg-wa-bg text-wa-text border border-wa-border rounded-lg focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted"
              />
              <ul className="max-h-56 overflow-y-auto space-y-1 scrollbar-thin">
                {results.map((u) => (
                  <li key={u.uid}>
                    <button
                      onClick={() => startDirectChat(u)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-wa-hover transition-colors text-left"
                    >
                      <Avatar src={u.photoURL} name={u.displayName} size={36} />
                      <span className="text-[15px] font-medium text-wa-text">{u.displayName}</span>
                    </button>
                  </li>
                ))}
                {query && results.length === 0 && (
                  <li className="text-center text-sm text-wa-textMuted py-4">Kontak tidak ditemukan</li>
                )}
                {!query && (
                  <li className="text-center text-sm text-wa-textMuted py-4">Ketik nama untuk mencari kontak</li>
                )}
              </ul>
            </div>
          )}

          {(tab === 'GROUP' || tab === 'COMMUNITY') && (
            <form onSubmit={handleCreateGroupOrCommunity} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-wa-textMuted mb-1">
                  Nama {tab === 'GROUP' ? 'Grup' : 'Komunitas'}
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder={`Contoh: ${tab === 'GROUP' ? 'Keluarga Besar' : 'Komunitas Web Dev'}`}
                  autoFocus
                  required
                  className="w-full px-3 py-2 text-sm bg-wa-bg text-wa-text border border-wa-border rounded-lg focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted"
                />
              </div>

              {tab === 'COMMUNITY' && (
                <div>
                  <label className="block text-xs font-semibold text-wa-textMuted mb-1">
                    Sub-Rooms (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={subRooms}
                    onChange={(e) => setSubRooms(e.target.value)}
                    placeholder="general, frontend, backend"
                    required
                    className="w-full px-3 py-2 text-sm bg-wa-bg text-wa-text border border-wa-border rounded-lg focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted"
                  />
                  <p className="text-[11px] text-wa-textMuted mt-1 mb-4">
                    Komunitas memungkinkan Anda membuat ruang obrolan (channel) yang bercabang seperti Discord.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-wa-primary hover:bg-[#008f6f] text-white font-bold py-2.5 rounded-lg transition-colors mt-2"
              >
                Buat {tab === 'GROUP' ? 'Grup' : 'Komunitas'} Sekarang
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
