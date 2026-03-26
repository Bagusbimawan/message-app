'use client';

import clsx from 'clsx';
import { Chat } from '@/types';

interface Props {
    readonly chat: Chat;
    readonly currentUid: string;
    readonly onClose: () => void;
}

const contactInfo = [
    {
        label: 'Phone', value: '(342) 432-3452',
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
    },
    {
        label: 'Email', value: 'user@mail.com',
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
    },
    {
        label: 'Full name', value: 'Alfonso George',
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>),
    },
    {
        label: 'Location', value: 'Jakarta, Indonesia',
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    },
    {
        label: 'Member since', value: 'Jan 1, 2024',
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>),
    },
] as { label: string; value: string; icon: React.ReactNode }[];

export default function ProfilePanel({ chat, currentUid, onClose }: Props) {
    const otherUid = chat.type === 'direct'
        ? chat.members.find((m) => m !== currentUid) ?? null
        : null;

    const name = (chat.type === 'group' || chat.type === 'community')
        ? (chat.groupName ?? 'Group')
        : (chat.memberDetails[otherUid!]?.displayName ?? 'Unknown');

    const memberCount = chat.type !== 'direct' ? `${chat.members.length} members` : null;

    return (
        <div className="w-[300px] flex-shrink-0 flex flex-col bg-wa-panel border-l border-wa-border h-full overflow-y-auto scrollbar-thin animate-slide-in-right">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-wa-border">
                <h3 className="text-[15px] font-bold text-wa-text">Profile</h3>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover hover:text-wa-text transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Avatar & Name */}
            <div className="flex flex-col items-center py-8 px-5 border-b border-wa-border">
                {/* Avatar circle with initials */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-wa-primary to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-wa-primary/20 mb-4">
                    {name.charAt(0).toUpperCase()}
                    {/* Online indicator */}
                    {chat.type === 'direct' && (
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-wa-panel" />
                    )}
                </div>
                <h2 className="text-[17px] font-bold text-wa-text text-center">{name}</h2>
                <p className="text-[13px] text-wa-textMuted mt-1 text-center">
                    {memberCount ?? 'Project Manager'}
                </p>

                {/* Quick action buttons */}
                <div className="flex gap-4 mt-5">
                    {[
                        {
                            label: 'Chat', icon: (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            )
                        },
                        {
                            label: 'Call', icon: (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            )
                        },
                        {
                            label: 'Email', icon: (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            )
                        },
                        {
                            label: 'More', icon: (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                            )
                        },
                    ].map(({ label, icon }) => (
                        <button
                            key={label}
                            className="flex flex-col items-center gap-1.5 group"
                            title={label}
                        >
                            <div className="w-10 h-10 rounded-full border border-wa-border flex items-center justify-center text-wa-textMuted group-hover:border-wa-primary group-hover:text-wa-primary group-hover:bg-wa-primary/5 transition-colors">
                                {icon}
                            </div>
                            <span className="text-[11px] text-wa-textMuted group-hover:text-wa-primary transition-colors">{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col divide-y divide-wa-border">
                {contactInfo.map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center gap-3 px-5 py-3.5">
                        <span className="w-5 flex-shrink-0 flex items-center justify-center text-wa-textMuted">{icon}</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-wa-textMuted uppercase tracking-wide font-semibold mb-0.5">{label}</p>
                            <p className="text-[14px] text-wa-text font-medium truncate">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
