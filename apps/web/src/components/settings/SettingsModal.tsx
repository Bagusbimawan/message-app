'use client';

import clsx from 'clsx';
import { useLanguage, Language } from '@/components/providers/LanguageProvider';

interface Props {
    readonly onClose: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export default function SettingsModal({ onClose }: Props) {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="bg-wa-panel text-wa-text rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-wa-border"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-wa-border bg-wa-header">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-wa-primary/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-wa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h2 className="text-[16px] font-bold text-wa-text">Settings</h2>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover hover:text-wa-text transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Language */}
                    <div>
                        <h3 className="text-[11px] font-bold text-wa-textMuted uppercase tracking-widest mb-3">
                            🌍 Language / Bahasa / 言語
                        </h3>
                        <div className="flex flex-col gap-2">
                            {LANGUAGES.map(({ code, label, flag }) => (
                                <button
                                    key={code}
                                    onClick={() => { setLanguage(code); onClose(); }}
                                    className={clsx(
                                        'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left',
                                        language === code
                                            ? 'border-wa-primary bg-wa-primary/5 text-wa-primary'
                                            : 'border-wa-border text-wa-text hover:border-wa-primary/40 hover:bg-wa-hover'
                                    )}
                                >
                                    <span className="text-xl">{flag}</span>
                                    <span className="text-[14px] font-semibold">{label}</span>
                                    {language === code && (
                                        <svg className="w-4 h-4 ml-auto text-wa-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* About */}
                    <div className="border-t border-wa-border pt-5">
                        <h3 className="text-[11px] font-bold text-wa-textMuted uppercase tracking-widest mb-3">About</h3>
                        <p className="text-[13px] text-wa-textMuted leading-relaxed">
                            Messenger — Modern real-time messaging platform.<br />
                            Built with Next.js · Local Mock Data Mode
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
