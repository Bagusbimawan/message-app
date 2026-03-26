'use client';

import MobileNavHeader from '@/components/layout/MobileNavHeader';
import { useLanguage } from '@/components/providers/LanguageProvider';

const STATS = [
    { labelKey: 'totalMessages', value: '12,480', change: '+8%', up: true, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
    { labelKey: 'totalContacts', value: '248', change: '+3%', up: true, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { labelKey: 'activeGroups', value: '14', change: '+1', up: true, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { labelKey: 'unreadToday', value: '37', change: '-5%', up: false, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
] as { labelKey: string; value: string; change: string; up: boolean; icon: string }[];

const ACTIVITY = [
    { day: 'Mon', msgs: 420 },
    { day: 'Tue', msgs: 580 },
    { day: 'Wed', msgs: 370 },
    { day: 'Thu', msgs: 690 },
    { day: 'Fri', msgs: 810 },
    { day: 'Sat', msgs: 290 },
    { day: 'Sun', msgs: 180 },
];

const maxMsgs = Math.max(...ACTIVITY.map(a => a.msgs));

export default function ReportsPage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0b0e13] overflow-hidden">
            <MobileNavHeader title={t('reports')} subtitle={t('analyticsOverview')} />
            {/* Desktop header */}
            <div className="hidden md:block px-5 pt-5 pb-4 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                <h1 className="text-[18px] font-bold text-wa-text">{t('reports')}</h1>
                <p className="text-[12px] text-wa-textMuted mt-0.5">{t('analyticsOverview')}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3">
                    {STATS.map(s => (
                        <div key={s.labelKey} className="bg-white dark:bg-[#151a21] rounded-2xl p-4 border border-gray-50 dark:border-[#222838]">
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-8 h-8 rounded-xl bg-wa-primary/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-wa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                                    </svg>
                                </div>
                                <span className={`text-[11px] font-bold ${s.up ? 'text-green-500' : 'text-red-500'}`}>{s.change}</span>
                            </div>
                            <p className="text-[22px] font-extrabold text-wa-text leading-none">{s.value}</p>
                            <p className="text-[11px] text-wa-textMuted mt-1">{t(s.labelKey as any)}</p>
                        </div>
                    ))}
                </div>

                {/* Activity bar chart */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl p-4 border border-gray-50 dark:border-[#222838]">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[14px] font-bold text-wa-text">{t('weeklyActivity')}</p>
                        <span className="text-[11px] text-wa-textMuted bg-gray-50 dark:bg-[#1e2535] px-2.5 py-1 rounded-lg">{t('thisWeek')}</span>
                    </div>
                    <div className="flex items-end gap-2 h-32">
                        {ACTIVITY.map(a => (
                            <div key={a.day} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className="w-full rounded-t-lg bg-wa-primary/20 hover:bg-wa-primary transition-colors"
                                    style={{ height: `${(a.msgs / maxMsgs) * 100}%` }}
                                />
                                <span className="text-[10px] text-wa-textMuted font-semibold">{a.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top contacts */}
                <div className="bg-white dark:bg-[#151a21] rounded-2xl p-4 border border-gray-50 dark:border-[#222838]">
                    <p className="text-[14px] font-bold text-wa-text mb-3">Most Active Chats</p>
                    <div className="space-y-3">
                        {['Tim Proyek Alpha', 'Budi Santoso', 'Design Squad'].map((name, i) => (
                            <div key={name} className="flex items-center gap-3">
                                <span className="text-[12px] font-bold text-wa-textMuted w-4">{i + 1}</span>
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-wa-primary to-blue-600 flex items-center justify-center text-white text-[11px] font-bold">{name.charAt(0)}</div>
                                <span className="flex-1 text-[13px] font-semibold text-wa-text">{name}</span>
                                <span className="text-[12px] text-wa-textMuted">{[342, 218, 185][i]} msgs</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
