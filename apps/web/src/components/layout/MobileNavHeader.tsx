'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useLanguage } from '@/components/providers/LanguageProvider';

const NAV_LINKS = [
    {
        href: '/chat', labelKey: 'chats',
        icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>),
    },
    {
        href: '/groups', labelKey: 'groups',
        icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
    },
    {
        href: '/community', labelKey: 'community',
        icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>),
    },
    {
        href: '/contacts', labelKey: 'contacts',
        icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>),
    },
    {
        href: '/reports', labelKey: 'reports',
        icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>),
    },
    {
        href: '/profile', labelKey: 'profile',
        icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0M19 21a7 7 0 00-14 0" /></svg>),
    },
] as { href: string; labelKey: string; icon: React.ReactNode }[];

interface Props {
    readonly title: string;
    readonly subtitle?: string;
    readonly action?: React.ReactNode;
}

export default function MobileNavHeader({ title, subtitle, action }: Props) {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            {/* Top bar — mobile only */}
            <div className="md:hidden flex items-center justify-between px-4 pt-4 pb-3 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                {/* Burger button */}
                <button
                    onClick={() => setNavOpen(true)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-wa-textMuted hover:bg-wa-hover transition-colors flex-shrink-0"
                    aria-label="Navigation menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Title */}
                <div className="flex-1 mx-3">
                    <p className="text-[15px] font-bold text-wa-text leading-tight">{title}</p>
                    {subtitle && <p className="text-[11px] text-wa-textMuted">{subtitle}</p>}
                </div>

                {/* Optional action (e.g. + button) */}
                {action ?? (
                    <Link href="/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        Y
                    </Link>
                )}
            </div>

            {/* Nav drawer overlay */}
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
                                <p className="text-[16px] font-extrabold text-wa-text">Messenger</p>
                                <p className="text-[12px] text-wa-textMuted">Navigate</p>
                            </div>
                        </div>

                        {/* Nav links */}
                        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                            {NAV_LINKS.map(({ href, labelKey, icon }) => {
                                const active = pathname === href || (href !== '/chat' && pathname.startsWith(href));
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setNavOpen(false)}
                                        className={clsx(
                                            'flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold transition-colors',
                                            active
                                                ? 'bg-wa-primary/10 text-wa-primary'
                                                : 'text-wa-text hover:bg-wa-hover'
                                        )}
                                    >
                                        <span className="flex-shrink-0">{icon}</span>
                                        {t(labelKey as any)}
                                    </Link>
                                );
                            })}
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
        </>
    );
}
