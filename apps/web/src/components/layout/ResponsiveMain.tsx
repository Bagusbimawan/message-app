'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Props {
    readonly sidebar: React.ReactNode;
    readonly children: React.ReactNode;
}

export default function ResponsiveMain({ sidebar, children }: Props) {
    const pathname = usePathname();

    // On mobile: in a chat room → show chat view; otherwise → show sidebar chat list
    const inRoom = /\/chat\/.+/.test(pathname) || /\/(contacts|profile|groups|reports|community)/.test(pathname);

    // Track if we need the mobile hamburger overlay (for desktop-like pages)
    const [drawerOpen, setDrawerOpen] = useState(false);
    useEffect(() => { setDrawerOpen(false); }, [pathname]);

    return (
        <div className="flex flex-1 h-full min-w-0 overflow-hidden">

            {/* ═══ DESKTOP: permanent sidebar ═══ */}
            <aside className="hidden md:flex w-[300px] flex-shrink-0 flex-col bg-white dark:bg-[#151a21] border-r border-gray-100 dark:border-[#222838] overflow-hidden">
                {sidebar}
            </aside>

            {/* ═══ MOBILE: sidebar as full screen OR chat as full screen ═══ */}

            {/* Mobile sidebar — shown when NOT in room */}
            <aside
                className={[
                    'flex-col flex-shrink-0 overflow-hidden',
                    'bg-white dark:bg-[#151a21]',
                    'w-full',
                    // Mobile: toggle based on route; Desktop: always hidden (md:hidden)
                    inRoom ? 'hidden md:hidden' : 'flex md:hidden',
                ].join(' ')}
            >
                {sidebar}
            </aside>

            {/* Main content — full width stays */}
            <main
                className={[
                    'flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-[#0b0e13] overflow-hidden',
                    // Mobile: only show when in room; desktop always show
                    inRoom ? 'flex' : 'hidden md:flex',
                ].join(' ')}
            >
                {/* Mobile: floating button to go back to chat list (when on non-room pages) */}
                {drawerOpen && (
                    <div
                        className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDrawerOpen(false)}
                    />
                )}
                {children}
            </main>
        </div>
    );
}
