'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Contact {
    id: string;
    name: string;
    phone: string;
    label?: string;
    avatar?: string;
}

const INITIAL_CONTACTS: Contact[] = [
    { id: '1', name: 'Budi Santoso', phone: '+62 812 0001 0001', label: 'Friend' },
    { id: '2', name: 'Sari Dewi', phone: '+62 813 0002 0002', label: 'Work' },
    { id: '3', name: 'Tim Proyek Alpha', phone: '+62 815 0003 0003', label: 'Work' },
    { id: '4', name: 'Alfonso George', phone: '+1 342 432 3452', label: 'Client' },
];

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
    const [search, setSearch] = useState('');
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', label: '' });

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    // Group by first letter
    const grouped = filtered.reduce<Record<string, Contact[]>>((acc, c) => {
        const key = c.name.charAt(0).toUpperCase();
        if (!acc[key]) acc[key] = [];
        acc[key].push(c);
        return acc;
    }, {});

    const sortedKeys = Object.keys(grouped).sort();

    function handleSave() {
        if (!form.name.trim() || !form.phone.trim()) return;
        const newContact: Contact = {
            id: `c_${Date.now()}`,
            name: form.name.trim(),
            phone: form.phone.trim(),
            label: form.label.trim() || undefined,
        };
        setContacts(prev => [...prev, newContact].sort((a, b) => a.name.localeCompare(b.name)));
        setForm({ name: '', phone: '', label: '' });
        setShowAdd(false);
    }

    function handleDelete(id: string) {
        setContacts(prev => prev.filter(c => c.id !== id));
    }

    const COLORS = ['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-teal-400', 'bg-orange-400'];

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0b0e13] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Link href="/chat" className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-[16px] font-bold text-wa-text">Contacts</h1>
                        <p className="text-[12px] text-wa-textMuted">{contacts.length} contacts</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-1.5 bg-wa-primary hover:bg-wa-primaryDark text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-wa-primary/20 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3 bg-white dark:bg-[#151a21] border-b border-gray-100 dark:border-[#222838] flex-shrink-0">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-wa-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search contacts..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-[#1e2535] text-wa-text border border-gray-100 dark:border-[#222838] rounded-xl focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
                    />
                </div>
            </div>

            {/* Contact list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
                {sortedKeys.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1e2535] flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-wa-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <p className="text-sm text-wa-textMuted">No contacts found</p>
                    </div>
                ) : (
                    sortedKeys.map(letter => (
                        <div key={letter}>
                            <p className="text-[11px] font-bold text-wa-textMuted uppercase tracking-widest mb-2 px-1">{letter}</p>
                            <div className="space-y-1">
                                {grouped[letter].map((contact, i) => (
                                    <div
                                        key={contact.id}
                                        className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#151a21] rounded-xl border border-gray-50 dark:border-[#222838] hover:border-wa-primary/30 transition-colors group"
                                    >
                                        {/* Avatar */}
                                        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm ${COLORS[i % COLORS.length]}`}>
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[14px] font-semibold text-wa-text truncate">{contact.name}</p>
                                            <p className="text-[12px] text-wa-textMuted">{contact.phone}</p>
                                        </div>
                                        {/* Label */}
                                        {contact.label && (
                                            <span className="text-[10px] font-semibold text-wa-primary bg-wa-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                                {contact.label}
                                            </span>
                                        )}
                                        {/* Actions (visible on hover) */}
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                title="Message"
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-wa-textMuted hover:text-wa-primary hover:bg-wa-primary/10 transition-colors"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(contact.id)}
                                                title="Delete"
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-wa-textMuted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Contact Modal */}
            {showAdd && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setShowAdd(false)}
                >
                    <div
                        className="bg-white dark:bg-[#151a21] rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 border border-gray-100 dark:border-[#222838]"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-[16px] font-bold text-wa-text">Add Contact</h2>
                            <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-wa-textMuted hover:bg-wa-hover transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-wa-textMuted uppercase tracking-widest mb-1.5">Full Name *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="e.g. Budi Santoso"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1e2535] text-wa-text border border-gray-100 dark:border-[#222838] rounded-xl text-sm focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-wa-textMuted uppercase tracking-widest mb-1.5">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                    placeholder="+62 812 3456 7890"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1e2535] text-wa-text border border-gray-100 dark:border-[#222838] rounded-xl text-sm focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-wa-textMuted uppercase tracking-widest mb-1.5">Label (optional)</label>
                                <input
                                    type="text"
                                    value={form.label}
                                    onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                                    placeholder="e.g. Work, Friend, Family"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#1e2535] text-wa-text border border-gray-100 dark:border-[#222838] rounded-xl text-sm focus:outline-none focus:border-wa-primary placeholder:text-wa-textMuted transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setShowAdd(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-100 dark:border-[#222838] text-wa-textMuted text-sm font-semibold hover:bg-wa-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!form.name.trim() || !form.phone.trim()}
                                className="flex-1 py-2.5 rounded-xl bg-wa-primary hover:bg-wa-primaryDark disabled:opacity-40 text-white text-sm font-bold transition-colors shadow-md shadow-wa-primary/20"
                            >
                                Save Contact
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
