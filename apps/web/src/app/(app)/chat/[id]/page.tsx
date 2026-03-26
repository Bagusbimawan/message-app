'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { MOCK_CHATS, MOCK_MESSAGES, CURRENT_UID } from '@/mock/data';
import { Message } from '@messaging/types';
import MessageList from '@/components/messages/MessageList';
import MessageInput from '@/components/messages/MessageInput';
import ChatHeader from '@/components/messages/ChatHeader';

export default function ChatRoomPage() {
  const { id: chatId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');

  const chat = MOCK_CHATS.find((c) => c.id === chatId);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messageKey = roomId ? `${chatId}_${roomId}` : chatId;
    setMessages(MOCK_MESSAGES[messageKey] ?? []);
  }, [chatId, roomId]);

  function handleSend(text: string) {
    const newMsg: Message = {
      id: `local_${Date.now()}`,
      chatId,
      senderId: CURRENT_UID,
      type: 'text',
      text,
      status: 'sending',
      readBy: {},
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
    <div className="flex flex-col h-full bg-wa-panel transition-colors relative">
      {/* Subtle chat background pattern could go here */}
      <ChatHeader chat={chat} currentUid={CURRENT_UID} />
      <MessageList messages={messages} currentUid={CURRENT_UID} />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
