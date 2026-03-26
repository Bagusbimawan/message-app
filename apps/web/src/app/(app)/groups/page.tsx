'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileNavHeader from '@/components/layout/MobileNavHeader';

interface Group {
    id: string;
    name: string;
    members: number;
    lastActive: string;
    description: string;
    color: string;
}

const MOCK_GROUPS: Group[] = [
    { id: 'g1', name: 'Tim Proyek Alpha', members: 8, lastActive: '2m ago', description: 'Development team for Project Alpha', color: 'from-blue-500 to-indigo-600' },
    { id: 'g2', name: 'Design Squad', members: 5, lastActive: '1h ago', description: 'UI/UX design discussions', color: 'from-pink-500 to-rose-600' },
    { id: 'g3', name: 'Marketing Team', members: 12, lastActive: '3h ago', description: 'Marketing campaigns & strategy', color: 'from-orange-500 to-amber-600' },
    { id: 'g4', name: 'Engineering Leads', members: 4, lastActive: '1d ago', description: 'Engineering leadership sync', color: 'from-teal-500 to-cyan-600' },
];

export default function GroupsPage() {
    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [newName, setNewName] = useState('');

    const filtered = MOCK_GROUPS.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0b0e13] overflow-hidden">
            <MobileNavHeader title="Groups" subtitle={`${MOCK_GROUPS.length} groups`} />
            {/* Desktop header */}
            <div className="hidden md:block px-5 pt-5 pb-4 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-[18px] font-bold text-wa-text">Groups</h1>
                        <p className="text-[12px] text-wa-textMuted">{MOCK_GROUPS.length} groups</p>
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-1.5 bg-wa-primary hover:bg-wa-primaryDark text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-wa-primary/20 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        New Group
                    </button>
                </div>
                {/* Search */}
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wa-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search groups..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-[#1e2535] text-wa-text border border-gray-100 dark:border-[#222838] rounded-xl focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
                    />
                </div>
            </div>

            {/* Group list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filtered.map(group => (
                    <Link
                        key={group.id}
                        href={`/chat/${group.id}`}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-[#151a21] rounded-2xl border border-gray-50 dark:border-[#222838] hover:border-wa-primary/30 hover:shadow-sm transition-all group"
                    >
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                            {group.name.charAt(0)}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-bold text-wa-text truncate">{group.name}</p>
                            <p className="text-[12px] text-wa-textMuted truncate">{group.description}</p>
                        </div>
                        {/* Meta */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="text-[11px] text-wa-textMuted">{group.lastActive}</span>
                            <span className="flex items-center gap-1 text-[11px] text-wa-textMuted">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {group.members}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Create group modal */}
            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowCreate(false)}>
                    <div className="bg-white dark:bg-[#151a21] rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 border border-gray-100 dark:border-[#222838]" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h2 className="text-[16px] font-bold text-wa-text">Create Group</h2>
                            <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-wa-textMuted uppercase tracking-widest mb-1.5">Group Name *</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="e.g. Design Team"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1e2535] text-wa-text border border-gray-100 dark:border-[#222838] rounded-xl text-sm focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-gray-100 dark:border-[#222838] text-wa-textMuted text-sm font-semibold hover:bg-wa-hover transition-colors">Cancel</button>
                            <button disabled={!newName.trim()} className="flex-1 py-2.5 rounded-xl bg-wa-primary hover:bg-wa-primaryDark disabled:opacity-40 text-white text-sm font-bold transition-colors shadow-md shadow-wa-primary/20">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
