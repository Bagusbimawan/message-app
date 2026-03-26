'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

export type Language = 'en' | 'id' | 'ja';

type Dictionary = {
    [key: string]: string;
};

const dictionaries: Record<Language, Dictionary> = {
    en: {
        messages: 'Messages',
        newChat: 'New Chat',
        searchPlaceholder: 'Search or start new chat',
        noMessages: 'No messages yet',
        notFound: 'Not found',
        typeMessage: 'Type a message',
    },
    id: {
        messages: 'Pesan',
        newChat: 'Chat baru',
        searchPlaceholder: 'Cari atau mulai chat baru',
        noMessages: 'Belum ada percakapan',
        notFound: 'Tidak ditemukan',
        typeMessage: 'Ketik pesan',
    },
    ja: {
        messages: 'メッセージ',
        newChat: '新しいチャット',
        searchPlaceholder: '検索または新しいチャットを開始',
        noMessages: 'メッセージはまだありません',
        notFound: '見つかりません',
        typeMessage: 'メッセージを入力',
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof dictionaries['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { readonly children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('id');

    const value = useMemo(() => {
        const t = (key: keyof typeof dictionaries['en']): string => {
            return (dictionaries[language][key] || dictionaries['en'][key] || String(key)) as string;
        };
        return { language, setLanguage, t };
    }, [language]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
}
