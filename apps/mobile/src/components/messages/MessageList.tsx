import React, { useRef, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { format, isToday, isYesterday } from 'date-fns';
import { Message } from '@messaging/types';
import MessageBubble from './MessageBubble';

interface Props {
  messages:       Message[];
  currentUid:     string;
  memberDetails?: Record<string, { displayName: string; photoURL: string | null }>;
}

function DateDivider({ date }: { date: Date }) {
  const label = isToday(date)
    ? 'Today'
    : isYesterday(date)
      ? 'Yesterday'
      : format(date, 'MMMM d, yyyy');

  return (
    <View style={styles.dividerWrap}>
      <Text style={styles.dividerText}>{label}</Text>
    </View>
  );
}

export default function MessageList({ messages, currentUid, memberDetails }: Props) {
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages.length]);

  let lastDate: string | null = null;

  const items: Array<{ type: 'date'; date: Date; key: string } | { type: 'msg'; msg: Message }> = [];
  for (const msg of messages) {
    const dateKey = msg.timestamp ? format(msg.timestamp, 'yyyy-MM-dd') : '';
    if (dateKey && dateKey !== lastDate) {
      lastDate = dateKey;
      items.push({ type: 'date', date: msg.timestamp as Date, key: dateKey });
    }
    items.push({ type: 'msg', msg });
  }

  return (
    <FlatList
      ref={listRef}
      data={items}
      keyExtractor={(item) => item.type === 'date' ? item.key : item.msg.id}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        if (item.type === 'date') {
          return <DateDivider date={item.date} />;
        }
        const { msg } = item;
        const isSender   = msg.senderId === currentUid;
        const senderName = !isSender && memberDetails
          ? memberDetails[msg.senderId]?.displayName
          : undefined;

        return (
          <MessageBubble
            message={msg}
            isSender={isSender}
            senderName={senderName}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  content:     { paddingVertical: 12 },
  dividerWrap: { alignItems: 'center', marginVertical: 12 },
  dividerText: { backgroundColor: '#e5e7eb', color: '#6b7280', fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
});
