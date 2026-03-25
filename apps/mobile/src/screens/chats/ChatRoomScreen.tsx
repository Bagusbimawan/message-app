import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@/navigation/AppNavigator';
import MessageList  from '@/components/messages/MessageList';
import MessageInput from '@/components/messages/MessageInput';
import { MOCK_MESSAGES, CURRENT_UID, MOCK_CHATS } from '@/mock/data';
import { Message } from '@messaging/types';

type Props = NativeStackScreenProps<AppStackParamList, 'ChatRoom'>;

export default function ChatRoomScreen({ route }: Props) {
  const { chatId } = route.params;
  const chat = MOCK_CHATS.find((c) => c.id === chatId);

  const [messages, setMessages] = useState<Message[]>(
    MOCK_MESSAGES[chatId] ?? []
  );

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

    // Simulate sent status after short delay
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => m.id === newMsg.id ? { ...m, status: 'sent' } : m)
      );
    }, 800);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <MessageList
        messages={messages}
        currentUid={CURRENT_UID}
        memberDetails={chat?.memberDetails}
      />
      <MessageInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
});
