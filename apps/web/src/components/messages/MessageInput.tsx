'use client';

import { useState, KeyboardEvent } from 'react';

interface Props {
  readonly onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('');

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="bg-white dark:bg-[#151a21] border-t border-gray-100 dark:border-[#222838] px-6 py-4 flex-shrink-0">
      {/* Toolbar row - emoji, attach, mic, video */}
      <div className="flex items-center gap-2 mb-3">
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-wa-textMuted hover:text-wa-text hover:bg-wa-hover transition-colors" title="Add">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-wa-textMuted hover:text-wa-text hover:bg-wa-hover transition-colors" title="Emoji">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-wa-textMuted hover:text-wa-text hover:bg-wa-hover transition-colors" title="Attach">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-wa-textMuted hover:text-wa-text hover:bg-wa-hover transition-colors" title="Voice">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-wa-textMuted hover:text-wa-text hover:bg-wa-hover transition-colors" title="Video">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Message area */}
      <div className="flex items-end gap-3">
        <div className="flex-1 bg-white dark:bg-[#252e3d] border border-wa-border rounded-2xl px-4 py-2.5 focus-within:border-wa-primary transition-colors">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan..."
            className="w-full resize-none text-[14px] bg-transparent text-wa-text focus:outline-none placeholder:text-wa-textMuted max-h-28 overflow-y-auto leading-relaxed"
          />
        </div>

        {/* Send button */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-xl bg-wa-primary text-white hover:bg-wa-primaryDark disabled:opacity-40 disabled:cursor-default transition-all duration-200 active:scale-95 shadow-sm shadow-wa-primary/30"
            aria-label="Send"
          >
            <svg className="w-4 h-4 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
            </svg>
          </button>
          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-xl border border-wa-border text-wa-textMuted hover:bg-wa-hover transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
