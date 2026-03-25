import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@/navigation/AppNavigator';
import Avatar from '@/components/common/Avatar';
import { UserPreview } from '@messaging/types';

type Props = NativeStackScreenProps<AppStackParamList, 'NewChat'>;

// Mock user list for search results
const MOCK_USERS: UserPreview[] = [
  { uid: 'user2', displayName: 'Budi Santoso',    photoURL: null },
  { uid: 'user3', displayName: 'Sari Dewi',        photoURL: null },
  { uid: 'user4', displayName: 'Andi Wijaya',      photoURL: null },
  { uid: 'user5', displayName: 'Rina Pratiwi',     photoURL: null },
  { uid: 'user6', displayName: 'Doni Kusuma',      photoURL: null },
  { uid: 'user7', displayName: 'Maya Anggraini',   photoURL: null },
];

export default function NewChatScreen({ navigation }: Props) {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<UserPreview[]>([]);

  function handleSearch(text: string) {
    setQuery(text);
    if (!text.trim()) { setResults([]); return; }
    const filtered = MOCK_USERS.filter((u) =>
      u.displayName.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  }

  function startChat(user: UserPreview) {
    // TODO: hit POST /chats endpoint, then navigate
    navigation.navigate('ChatRoom', {
      chatId:   user.uid,      // placeholder until real API
      chatName: user.displayName,
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Search bar */}
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          value={query}
          onChangeText={handleSearch}
          placeholder="Search by name…"
          placeholderTextColor="#9ca3af"
          autoFocus
          returnKeyType="search"
        />
      </View>

      {results.length === 0 && query.trim() !== '' && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No users found</Text>
        </View>
      )}

      {results.length === 0 && query.trim() === '' && (
        <View style={styles.hint}>
          <Text style={styles.hintText}>Type a name to find people</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(u) => u.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => startChat(item)}
            activeOpacity={0.7}
          >
            <Avatar src={item.photoURL} name={item.displayName} size={44} />
            <Text style={styles.userName}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#fff' },
  searchWrap: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  search:     { backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#111827' },
  userRow:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  userName:   { fontSize: 15, fontWeight: '500', color: '#111827', marginLeft: 12 },
  separator:  { height: 1, backgroundColor: '#f9fafb', marginLeft: 72 },
  empty:      { alignItems: 'center', paddingTop: 48 },
  emptyText:  { color: '#9ca3af', fontSize: 14 },
  hint:       { alignItems: 'center', paddingTop: 48 },
  hintText:   { color: '#9ca3af', fontSize: 14 },
});
