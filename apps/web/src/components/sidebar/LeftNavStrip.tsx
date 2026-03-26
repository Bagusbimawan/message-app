'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import SettingsModal from '@/components/settings/SettingsModal';

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/chat',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        label: 'Chats',
        href: '/chat',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
    },
    {
        label: 'Groups',
        href: '/groups',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Community',
        href: '/chat',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
        ),
    },
    {
        label: 'Contacts',
        href: '/contacts',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        label: 'Reports',
        href: '/reports',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="relative group">
            {children}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                {label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
        </div>
    );
}

export default function LeftNavStrip() {
    const pathname = usePathname();
    const [showSettings, setShowSettings] = useState(false);

    function isNavActive(href: string) {
        if (href === '/chat') return pathname === '/chat' || pathname.startsWith('/chat/');
        return pathname.startsWith(href);
    }

    return (
        <>
            <div className="w-[68px] flex-shrink-0 flex flex-col items-center py-4 gap-1 bg-[#1a1c23] dark:bg-[#080b10] transition-colors">
                {/* Logo */}
                <Tooltip label="Messenger">
                    <Link
                        href="/chat"
                        className="w-10 h-10 rounded-xl bg-[#00d097] flex items-center justify-center mb-4 shadow-lg shadow-[#00d097]/30 hover:scale-105 transition-transform"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </Link>
                </Tooltip>

                {/* Nav items */}
                {NAV_ITEMS.map((item) => {
                    const active = isNavActive(item.href);
                    return (
                        <Tooltip key={item.label} label={item.label}>
                            <Link
                                href={item.href}
                                className={clsx(
                                    'w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 relative',
                                    active
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/40 hover:text-white hover:bg-white/10'
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#00d097] rounded-r-full" />
                                )}
                                {item.icon}
                            </Link>
                        </Tooltip>
                    );
                })}

                {/* Spacer */}
                <div className="flex-1" />

                {/* Divider */}
                <div className="w-8 h-px bg-white/10 mb-3" />

                {/* Bottom: Settings + Theme + Profile */}
                <div className="flex flex-col items-center gap-2">
                    {/* Settings */}
                    <Tooltip label="Settings">
                        <button
                            onClick={() => setShowSettings(true)}
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </Tooltip>

                    {/* Theme toggle */}
                    <ThemeToggle />

                    {/* Profile avatar */}
                    <Tooltip label="My Profile">
                        <Link href="/profile" className="relative group">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:scale-105 transition-transform">
                                Y
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00d097] rounded-full border-2 border-[#1a1c23] dark:border-[#080b10]" />
                        </Link>
                    </Tooltip>
                </div>
            </div>

            {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        </>
    );
}
