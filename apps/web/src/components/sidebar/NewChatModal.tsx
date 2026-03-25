'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/common/Avatar';
import { UserPreview } from '@messaging/types';

interface Props {
  currentUid: string;
  onClose:    () => void;
}

const MOCK_USERS: UserPreview[] = [
  { uid: 'user2', displayName: 'Budi Santoso',  photoURL: null },
  { uid: 'user3', displayName: 'Sari Dewi',     photoURL: null },
  { uid: 'user4', displayName: 'Andi Wijaya',   photoURL: null },
  { uid: 'user5', displayName: 'Rina Pratiwi',  photoURL: null },
  { uid: 'user6', displayName: 'Doni Kusuma',   photoURL: null },
];

export default function NewChatModal({ onClose }: Props) {
  const router  = useRouter();
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? MOCK_USERS.filter((u) =>
        u.displayName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function startChat(user: UserPreview) {
    // TODO: ganti dengan POST /chats ke backend
    router.push(`/chat/${user.uid}`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Percakapan baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama pengguna…"
          autoFocus
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        <ul className="max-h-64 overflow-y-auto space-y-1">
          {results.map((u) => (
            <li key={u.uid}>
              <button
                onClick={() => startChat(u)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <Avatar src={u.photoURL} name={u.displayName} size={36} />
                <span className="text-sm font-medium text-gray-900">{u.displayName}</span>
              </button>
            </li>
          ))}
          {query && results.length === 0 && (
            <li className="text-center text-sm text-gray-400 py-4">Pengguna tidak ditemukan</li>
          )}
          {!query && (
            <li className="text-center text-sm text-gray-400 py-4">Ketik nama untuk mencari</li>
          )}
        </ul>
      </div>
    </div>
  );
}
