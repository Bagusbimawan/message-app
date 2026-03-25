import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Message } from '@messaging/types';

interface Props {
  message:     Message;
  isSender:    boolean;
  senderName?: string;
}

function StatusTick({ status }: { status: Message['status'] }) {
  if (status === 'sending')   return <Text style={styles.tickGray}>⏳</Text>;
  if (status === 'sent')      return <Text style={styles.tickGray}>✓</Text>;
  if (status === 'delivered') return <Text style={styles.tickGray}>✓✓</Text>;
  return <Text style={styles.tickBlue}>✓✓</Text>;
}

export default function MessageBubble({ message, isSender, senderName }: Props) {
  const time = message.timestamp ? format(message.timestamp, 'HH:mm') : '';

  return (
    <View style={[styles.wrapper, isSender ? styles.wrapperRight : styles.wrapperLeft]}>
      <View style={[styles.bubble, isSender ? styles.bubbleSent : styles.bubbleReceived]}>
        {!isSender && senderName && (
          <Text style={styles.senderName}>{senderName}</Text>
        )}
        <Text style={styles.text}>{message.text}</Text>
        <View style={styles.meta}>
          <Text style={styles.time}>{time}</Text>
          {isSender && <StatusTick status={message.status} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:         { marginVertical: 2, paddingHorizontal: 12 },
  wrapperRight:    { alignItems: 'flex-end' },
  wrapperLeft:     { alignItems: 'flex-start' },
  bubble:          { maxWidth: '75%', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  bubbleSent:      { backgroundColor: '#dcf8c6', borderBottomRightRadius: 4 },
  bubbleReceived:  { backgroundColor: '#ffffff', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#f0f0f0' },
  senderName:      { fontSize: 12, fontWeight: '700', color: '#2563eb', marginBottom: 2 },
  text:            { fontSize: 15, color: '#111827', lineHeight: 21 },
  meta:            { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4, gap: 4 },
  time:            { fontSize: 11, color: '#9ca3af' },
  tickGray:        { fontSize: 11, color: '#9ca3af' },
  tickBlue:        { fontSize: 11, color: '#53bdeb' },
});
