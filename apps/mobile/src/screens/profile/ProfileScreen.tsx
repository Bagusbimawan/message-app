import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert,
} from 'react-native';
import Avatar from '@/components/common/Avatar';
import { CURRENT_UID } from '@/mock/data';

// Mock current user
const MOCK_ME = {
  uid:         CURRENT_UID,
  displayName: 'Alex Johnson',
  email:       'alex@example.com',
  photoURL:    null,
};

interface MenuRowProps {
  label:    string;
  value?:   string;
  onPress?: () => void;
  danger?:  boolean;
}

function MenuRow({ label, value, onPress, danger }: MenuRowProps) {
  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <Text style={[styles.menuLabel, danger && styles.danger]}>{label}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => { /* TODO: logout() */ } },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        {/* Avatar & name */}
        <View style={styles.hero}>
          <Avatar src={MOCK_ME.photoURL} name={MOCK_ME.displayName} size={88} />
          <Text style={styles.name}>{MOCK_ME.displayName}</Text>
          <Text style={styles.email}>{MOCK_ME.email}</Text>
        </View>

        {/* Account section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuRow label="Name" value={MOCK_ME.displayName} onPress={() => {}} />
          <MenuRow label="Email" value={MOCK_ME.email} />
        </View>

        {/* App section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <MenuRow label="Notifications"     onPress={() => {}} />
          <MenuRow label="Privacy & Security" onPress={() => {}} />
          <MenuRow label="Appearance"        onPress={() => {}} />
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <MenuRow label="Sign Out" danger onPress={handleLogout} />
        </View>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#f9fafb' },
  hero:         { alignItems: 'center', paddingVertical: 32, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  name:         { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 12 },
  email:        { fontSize: 14, color: '#6b7280', marginTop: 4 },
  section:      { backgroundColor: '#fff', marginTop: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 },
  menuRow:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#f9fafb' },
  menuLabel:    { fontSize: 15, color: '#111827' },
  menuValue:    { fontSize: 14, color: '#6b7280' },
  danger:       { color: '#ef4444' },
  version:      { textAlign: 'center', color: '#d1d5db', fontSize: 12, marginTop: 24, marginBottom: 12 },
});
