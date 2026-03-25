'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_CHATS, MOCK_MESSAGES, CURRENT_UID } from '@/mock/data';
import { Message } from '@messaging/types';
import MessageList  from '@/components/messages/MessageList';
import MessageInput from '@/components/messages/MessageInput';
import ChatHeader   from '@/components/messages/ChatHeader';

export default function ChatRoomPage() {
  const { id: chatId } = useParams<{ id: string }>();

  const chat = MOCK_CHATS.find((c) => c.id === chatId);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[chatId] ?? []);

  function handleSend(text: string) {
    const newMsg: Message = {
      id:        `local_${Date.now()}`,
      chatId,
      senderId:  CURRENT_UID,
      type:      'text',
      text,
      status:    'sending',
      readBy:    {},
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulate network: sending → sent
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => m.id === newMsg.id ? { ...m, status: 'sent' } : m)
      );
    }, 700);
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p>Chat tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader chat={chat} currentUid={CURRENT_UID} />
      <MessageList messages={messages} currentUid={CURRENT_UID} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
