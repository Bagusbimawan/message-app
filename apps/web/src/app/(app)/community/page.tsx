'use client';

import MobileNavHeader from '@/components/layout/MobileNavHeader';

const CHANNELS = [
    { id: 'c1', name: 'General Announcements', subscribers: 1240, icon: '📢', verified: true },
    { id: 'c2', name: 'Product Updates', subscribers: 890, icon: '🚀', verified: true },
    { id: 'c3', name: 'Design Insights', subscribers: 430, icon: '🎨', verified: false },
    { id: 'c4', name: 'Engineering Blog', subscribers: 760, icon: '⚙️', verified: false },
    { id: 'c5', name: 'Community Events', subscribers: 320, icon: '🎉', verified: false },
];

export default function CommunityPage() {
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0b0e13] overflow-hidden">
            <MobileNavHeader title="Community" subtitle="Browse and join channels" />
            {/* Desktop header */}
            <div className="hidden md:block px-5 pt-5 pb-4 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                <h1 className="text-[18px] font-bold text-wa-text">Community</h1>
                <p className="text-[12px] text-wa-textMuted mt-0.5">Browse and join channels</p>
            </div>

            {/* Featured banner */}
            <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-r from-[#00d097] to-[#0099ff] p-5 text-white flex-shrink-0">
                <p className="text-[12px] font-semibold opacity-80 mb-1">FEATURED</p>
                <p className="text-[18px] font-extrabold leading-tight mb-1">Join 1,200+ members</p>
                <p className="text-[13px] opacity-80">Get the latest updates from our community</p>
            </div>

            {/* Channel grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 mt-2">
                <p className="text-xs font-bold text-wa-textMuted uppercase tracking-widest px-1 mb-1">Channels</p>
                {CHANNELS.map(ch => (
                    <div
                        key={ch.id}
                        className="flex items-center gap-4 p-4 bg-white dark:bg-[#151a21] rounded-2xl border border-gray-50 dark:border-[#222838] hover:border-wa-primary/30 transition-all cursor-pointer group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#1e2535] flex items-center justify-center text-2xl flex-shrink-0">
                            {ch.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <p className="text-[14px] font-bold text-wa-text truncate">{ch.name}</p>
                                {ch.verified && (
                                    <svg className="w-3.5 h-3.5 text-wa-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-[12px] text-wa-textMuted">{ch.subscribers.toLocaleString()} subscribers</p>
                        </div>
                        <button className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-wa-primary/10 text-wa-primary text-[12px] font-bold hover:bg-wa-primary hover:text-white transition-colors">
                            Join
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
