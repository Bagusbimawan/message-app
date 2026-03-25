import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '@/components/common/Avatar';
import { Chat } from '@messaging/types';

interface Props {
  chat:       Chat;
  currentUid: string;
  onPress:    () => void;
}

export default function ChatListItem({ chat, currentUid, onPress }: Props) {
  const otherUid = chat.type === 'direct'
    ? chat.members.find((m) => m !== currentUid)
    : null;

  const name = chat.type === 'group'
    ? (chat.groupName ?? 'Group')
    : (chat.memberDetails[otherUid!]?.displayName ?? 'Unknown');

  const photo = chat.type === 'group'
    ? chat.groupPhotoURL
    : chat.memberDetails[otherUid!]?.photoURL;

  const unread = chat.unreadCount[currentUid] ?? 0;

  const lastText = !chat.lastMessage
    ? 'No messages yet'
    : chat.lastMessage.type === 'image' ? '📷 Photo'
    : chat.lastMessage.type === 'file'  ? '📎 File'
    : chat.lastMessage.text ?? '';

  const timeAgo = chat.lastMessage?.timestamp
    ? formatDistanceToNowStrict(chat.lastMessage.timestamp)
    : '';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Avatar src={photo} name={name} size={52} />

      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          {timeAgo ? <Text style={styles.time}>{timeAgo}</Text> : null}
        </View>
        <View style={styles.row}>
          <Text style={styles.last} numberOfLines={1}>{lastText}</Text>
          {unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unread > 99 ? '99+' : unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:  { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff' },
  body:       { flex: 1, marginLeft: 12 },
  row:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name:       { flex: 1, fontSize: 15, fontWeight: '600', color: '#111827' },
  time:       { fontSize: 12, color: '#9ca3af', marginLeft: 8 },
  last:       { flex: 1, fontSize: 13, color: '#6b7280', marginTop: 2 },
  badge:      { marginLeft: 8, backgroundColor: '#2563eb', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  badgeText:  { color: '#fff', fontSize: 11, fontWeight: '700' },
});
