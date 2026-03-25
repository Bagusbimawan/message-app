'use client';

import { useEffect, useRef } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { Message } from '@messaging/types';
import MessageBubble from './MessageBubble';

interface Props {
  messages:   Message[];
  currentUid: string;
}

function DateDivider({ date }: { date: Date }) {
  const label = isToday(date)
    ? 'Today'
    : isYesterday(date)
      ? 'Yesterday'
      : format(date, 'MMMM d, yyyy');

  return (
    <div className="flex items-center justify-center my-4">
      <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{label}</span>
    </div>
  );
}

export default function MessageList({ messages, currentUid }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  // Group messages by date for dividers
  let lastDate: string | null = null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin bg-gray-50">
      {messages.map((msg, idx) => {
        const isSender  = msg.senderId === currentUid;
        const msgDate   = msg.timestamp ? format(msg.timestamp, 'yyyy-MM-dd') : '';
        const showDate  = msgDate !== lastDate;
        if (showDate) lastDate = msgDate;

        // Show avatar only for first message in a consecutive group from same sender
        const nextMsg   = messages[idx + 1];
        const showAvatar = !isSender && (!nextMsg || nextMsg.senderId !== msg.senderId);

        return (
          <div key={msg.id}>
            {showDate && msg.timestamp && <DateDivider date={msg.timestamp} />}
            <MessageBubble
              message={msg}
              isSender={isSender}
              showAvatar={showAvatar}
            />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
