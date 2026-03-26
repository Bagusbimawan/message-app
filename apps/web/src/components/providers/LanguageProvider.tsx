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

        chats: 'Chats',
        groups: 'Groups',
        community: 'Community',
        contacts: 'Contacts',
        reports: 'Reports',
        profile: 'Profile',
        settings: 'Settings',

        phone: 'Phone',
        email: 'Email',
        location: 'Location',
        memberSince: 'Member since',
        website: 'Website',
        messageBtn: 'Message',
        callBtn: 'Call',
        shareBtn: 'Share',
        contactInfo: 'Contact Info',
        signOut: 'Sign Out',
        myProfile: 'My Profile',
        edit: 'Edit',

        searchGroups: 'Search groups...',
        noGroups: 'No groups found',
        createGroup: 'Create Group',

        searchChannels: 'Search channels...',
        noChannels: 'No channels found',
        featuredCommunity: 'Featured Community',
        joinConversation: 'Join the conversation',
        subscribers: 'Subscribers',
        joinBtn: 'Join',

        analyticsOverview: 'Analytics Overview',
        totalMessages: 'Total Messages',
        totalContacts: 'Total Contacts',
        activeGroups: 'Active Groups',
        storageUsed: 'Storage Used',
        weeklyActivity: 'Weekly Activity',
        mostActiveChats: 'Most Active Chats',
        msgCount: 'Msg',
        unreadToday: 'Unread Today',
        thisWeek: 'This Week',

        searchContacts: 'Search contacts...',
        noContacts: 'No contacts found',
        addBtn: 'Add',
        addContact: 'Add Contact',
        fullNameLabel: 'Full Name *',
        phoneLabel: 'Phone Number *',
        contactLabel: 'Label (optional)',
        cancelBtn: 'Cancel',
        saveContact: 'Save Contact',
    },
    id: {
        all: 'Semua',
        chooseSection: 'Pilih bagian',
        messengerApp: 'Messenger',

        messages: 'Pesan',
        newChat: 'Chat baru',
        searchPlaceholder: 'Cari atau mulai chat baru',
        noMessages: 'Belum ada percakapan',
        notFound: 'Tidak ditemukan',
        typeMessage: 'Ketik pesan',

        chats: 'Obrolan',
        groups: 'Grup',
        community: 'Komunitas',
        contacts: 'Kontak',
        reports: 'Laporan',
        profile: 'Profil',
        settings: 'Pengaturan',

        phone: 'Telepon',
        email: 'Email',
        location: 'Lokasi',
        memberSince: 'Bergabung sejak',
        website: 'Situs Web',
        messageBtn: 'Pesan',
        callBtn: 'Panggil',
        shareBtn: 'Bagikan',
        contactInfo: 'Info Kontak',
        signOut: 'Keluar',
        myProfile: 'Profil Saya',
        edit: 'Edit',

        searchGroups: 'Cari grup...',
        noGroups: 'Grup tidak ditemukan',
        createGroup: 'Buat Grup',

        searchChannels: 'Cari channel...',
        noChannels: 'Channel tidak ditemukan',
        featuredCommunity: 'Komunitas Pilihan',
        joinConversation: 'Bergabung dalam percakapan',
        subscribers: 'Pelanggan',
        joinBtn: 'Gabung',

        analyticsOverview: 'Ringkasan Analitik',
        totalMessages: 'Total Pesan',
        totalContacts: 'Total Kontak',
        activeGroups: 'Grup Aktif',
        storageUsed: 'Penyimpanan',
        weeklyActivity: 'Aktivitas Mingguan',
        mostActiveChats: 'Obrolan Teraktif',
        msgCount: 'Pesan',
        unreadToday: 'Belum Dibaca',
        thisWeek: 'Minggu Ini',

        searchContacts: 'Cari kontak...',
        noContacts: 'Kontak tidak ditemukan',
        addBtn: 'Tambah',
        addContact: 'Tambah Kontak',
        fullNameLabel: 'Nama Lengkap *',
        phoneLabel: 'Nomor Telepon *',
        contactLabel: 'Label (opsional)',
        cancelBtn: 'Batal',
        saveContact: 'Simpan Kontak',
    },
    ja: {
        all: 'すべて',
        chooseSection: 'セクションを選択',
        messengerApp: 'メッセンジャー',

        messages: 'メッセージ',
        newChat: '新しいチャット',
        searchPlaceholder: '検索または新しいチャットを開始',
        noMessages: 'メッセージはまだありません',
        notFound: '見つかりません',
        typeMessage: 'メッセージを入力',

        chats: 'チャット',
        groups: 'グループ',
        community: 'コミュニティ',
        contacts: '連絡先',
        reports: 'レポート',
        profile: 'プロフィール',
        settings: '設定',

        phone: '電話番号',
        email: 'メール',
        location: '場所',
        memberSince: '参加日',
        website: 'ウェブサイト',
        messageBtn: 'メッセージ',
        callBtn: '通話',
        shareBtn: '共有',
        contactInfo: '連絡先情報',
        signOut: 'サインアウト',
        myProfile: 'マイプロフィール',
        edit: '編集',

        searchGroups: 'グループを検索...',
        noGroups: 'グループが見つかりません',
        createGroup: 'グループを作成',

        searchChannels: 'チャンネルを検索...',
        noChannels: 'チャンネルが見つかりません',
        featuredCommunity: '注目のコミュニティ',
        joinConversation: '会話に参加する',
        subscribers: '登録者',
        joinBtn: '参加',

        analyticsOverview: '分析概要',
        totalMessages: '総メッセージ数',
        totalContacts: '総連絡先数',
        activeGroups: 'アクティブなグループ',
        storageUsed: '使用ストレージ',
        weeklyActivity: '週間アクティビティ',
        mostActiveChats: '最もアクティブなチャット',
        msgCount: 'メッセージ',
        unreadToday: '未読',
        thisWeek: '今週',

        searchContacts: '連絡先を検索...',
        noContacts: '連絡先が見つかりません',
        addBtn: '追加',
        addContact: '連絡先を追加',
        fullNameLabel: '氏名 *',
        phoneLabel: '電話番号 *',
        contactLabel: 'ラベル (オプション)',
        cancelBtn: 'キャンセル',
        saveContact: '連絡先を保存',
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
