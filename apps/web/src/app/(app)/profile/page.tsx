'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

const PROFILE = {
    name: 'Yusuf A.',
    username: '@yusuf.a',
    role: 'Available',
    phone: '+62 812 3456 7890',
    email: 'yusuf@example.com',
    location: 'Jakarta, Indonesia',
    joinedDate: 'Jan 1, 2024',
    website: 'messenger.app',
    bio: 'Building the future, one message at a time.',
};

const STATS = [
    { labelKey: 'messages', value: '2.4K' },
    { labelKey: 'contacts', value: '128' },
    { labelKey: 'groups', value: '14' },
];

const FIELDS = [
    {
        labelKey: 'phone', value: PROFILE.phone,
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
    },
    {
        labelKey: 'email', value: PROFILE.email,
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
    },
    {
        labelKey: 'location', value: PROFILE.location,
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    },
    {
        labelKey: 'memberSince', value: PROFILE.joinedDate,
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>),
    },
    {
        labelKey: 'website', value: PROFILE.website,
        icon: (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>),
    },
] as { labelKey: string; value: string; icon: React.ReactNode }[];

export default function ProfilePage() {
    const { t } = useLanguage();

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
                    <h1 className="text-[16px] font-bold text-wa-text">{t('myProfile')}</h1>
                </div>
                <button className="text-sm font-semibold text-wa-primary hover:underline transition-colors">
                    {t('edit')}
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
                        {STATS.map(({ labelKey, value }) => (
                            <div key={labelKey} className="text-center px-3 py-2">
                                <p className="text-xl font-extrabold text-wa-text">{value}</p>
                                <p className="text-[11px] text-wa-textMuted mt-0.5">{t(labelKey as any)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        {
                            labelKey: 'messageBtn',
                            icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>),
                        },
                        {
                            labelKey: 'callBtn',
                            icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
                        },
                        {
                            labelKey: 'shareBtn',
                            icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>),
                        },
                    ].map(({ labelKey, icon }) => (
                        <button key={labelKey} className="flex flex-col items-center gap-2 py-4 bg-white dark:bg-[#151a21] rounded-xl border border-gray-100 dark:border-[#222838] hover:border-wa-primary hover:bg-wa-primary/5 transition-all text-wa-textMuted hover:text-wa-primary">
                            {icon}
                            <span className="text-xs font-semibold text-wa-text">{t(labelKey as any)}</span>
                        </button>
                    ))}
                </div>

                {/* Contact info */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl border border-gray-100 dark:border-[#222838] divide-y divide-gray-50 dark:divide-[#222838] overflow-hidden">
                    <div className="px-5 py-3">
                        <h3 className="text-[11px] font-bold text-wa-textMuted uppercase tracking-widest">{t('contactInfo')}</h3>
                    </div>
                    {FIELDS.map(({ labelKey, value, icon }) => (
                        <div key={labelKey} className="flex items-center gap-4 px-5 py-3.5">
                            <span className="w-5 flex-shrink-0 flex items-center justify-center text-wa-textMuted">{icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-wa-textMuted font-semibold uppercase tracking-wide mb-0.5">{t(labelKey as any)}</p>
                                <p className="text-[14px] text-wa-text font-medium truncate">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Danger zone */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl border border-gray-100 dark:border-[#222838] overflow-hidden">
                    <button className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors text-sm font-semibold text-left">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t('signOut')}
                    </button>
                </div>

                <div className="pb-6" />
            </div>
        </div>
    );
}
