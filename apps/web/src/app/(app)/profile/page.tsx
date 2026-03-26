'use client';

import Link from 'next/link';

const PROFILE = {
    name: 'Yusuf A.',
    username: '@yusuf.a',
    role: 'Available',
    phone: '+62 812 3456 7890',
    email: 'yusuf@example.com',
    location: 'Jakarta, Indonesia',
    joinedDate: 'Jan 1, 2024',
    website: 'messenger.app',
    bio: 'Building the future, one message at a time. 🚀',
};

const STATS = [
    { label: 'Messages', value: '2.4K' },
    { label: 'Contacts', value: '128' },
    { label: 'Groups', value: '14' },
];

const FIELDS = [
    { icon: '📞', label: 'Phone', value: PROFILE.phone },
    { icon: '✉️', label: 'Email', value: PROFILE.email },
    { icon: '📍', label: 'Location', value: PROFILE.location },
    { icon: '📅', label: 'Member since', value: PROFILE.joinedDate },
    { icon: '🌐', label: 'Website', value: PROFILE.website },
];

export default function ProfilePage() {
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0b0e13] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/chat" className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1e2535] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-[16px] font-bold text-wa-text">My Profile</h1>
                </div>
                <button className="text-sm font-semibold text-wa-primary hover:underline transition-colors">
                    Edit
                </button>
            </div>

            <div className="max-w-xl mx-auto w-full px-6 py-8 space-y-6">
                {/* Avatar + basic info */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl border border-gray-100 dark:border-[#222838] p-6 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                            Y
                        </div>
                        <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-wa-primary flex items-center justify-center shadow-md shadow-wa-primary/30 hover:bg-wa-primaryDark transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        {/* Online indicator */}
                        <span className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-[#151a21]" />
                    </div>

                    <h2 className="text-xl font-bold text-wa-text">{PROFILE.name}</h2>
                    <p className="text-sm text-wa-textMuted mt-0.5">{PROFILE.username}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {PROFILE.role}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-wa-textMuted mt-4 leading-relaxed max-w-xs">{PROFILE.bio}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-[#222838] mt-6 w-full">
                        {STATS.map(({ label, value }) => (
                            <div key={label} className="text-center px-3 py-2">
                                <p className="text-xl font-extrabold text-wa-text">{value}</p>
                                <p className="text-[11px] text-wa-textMuted mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: 'Message', icon: '💬' },
                        { label: 'Call', icon: '📞' },
                        { label: 'Share', icon: '↗️' },
                    ].map(({ label, icon }) => (
                        <button key={label} className="flex flex-col items-center gap-2 py-4 bg-white dark:bg-[#151a21] rounded-xl border border-gray-100 dark:border-[#222838] hover:border-wa-primary hover:bg-wa-primary/5 transition-all">
                            <span className="text-2xl">{icon}</span>
                            <span className="text-xs font-semibold text-wa-text">{label}</span>
                        </button>
                    ))}
                </div>

                {/* Contact info */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl border border-gray-100 dark:border-[#222838] divide-y divide-gray-50 dark:divide-[#222838] overflow-hidden">
                    <div className="px-5 py-3">
                        <h3 className="text-[11px] font-bold text-wa-textMuted uppercase tracking-widest">Contact Info</h3>
                    </div>
                    {FIELDS.map(({ icon, label, value }) => (
                        <div key={label} className="flex items-center gap-4 px-5 py-3.5">
                            <span className="text-lg flex-shrink-0">{icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-wa-textMuted font-semibold uppercase tracking-wide mb-0.5">{label}</p>
                                <p className="text-[14px] text-wa-text font-medium truncate">{value}</p>
                            </div>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full text-wa-textMuted hover:text-wa-primary hover:bg-gray-100 dark:hover:bg-[#1e2535] transition-colors flex-shrink-0">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Danger zone */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl border border-gray-100 dark:border-[#222838] overflow-hidden">
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors text-sm font-semibold text-left">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>

                <div className="pb-6" />
            </div>
        </div>
    );
}
