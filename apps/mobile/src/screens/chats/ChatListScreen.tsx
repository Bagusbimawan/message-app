import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, TabParamList } from '@/navigation/AppNavigator';
import ChatListItem from '@/components/chat/ChatListItem';
import { MOCK_CHATS, CURRENT_UID } from '@/mock/data';
import { Chat } from '@messaging/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Chats'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function ChatListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? MOCK_CHATS.filter((c) => {
      const otherUid = c.members.find((m) => m !== CURRENT_UID);
      const name = c.type === 'group'
        ? (c.groupName ?? '')
        : (c.memberDetails[otherUid!]?.displayName ?? '');
      return name.toLowerCase().includes(search.toLowerCase());
    })
    : MOCK_CHATS;

  function getChatName(chat: Chat) {
    if (chat.type === 'group') return chat.groupName ?? 'Group';
    const otherUid = chat.members.find((m) => m !== CURRENT_UID);
    return chat.memberDetails[otherUid!]?.displayName ?? 'Unknown';
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate('NewChat')}
          activeOpacity={0.7}
        >
          <Text style={styles.newBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search conversations…"
          placeholderTextColor="#9ca3af"
          returnKeyType="search"
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            currentUid={CURRENT_UID}
            onPress={() =>
              navigation.navigate('ChatRoom', {
                chatId: item.id,
                chatName: getChatName(item),
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No conversations yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },
  newBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  newBtnText: { color: '#fff', fontSize: 24, lineHeight: 28, fontWeight: '300' },
  searchWrap: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff' },
  search: { backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: '#111827' },
  separator: { height: 1, backgroundColor: '#f9fafb', marginLeft: 80 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: '#9ca3af', fontSize: 15 },
});
