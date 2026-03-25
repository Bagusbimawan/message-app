import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  src?:      string | null;
  name:      string;
  size?:     number;
  isOnline?: boolean;
}

export default function Avatar({ src, name, size = 44, isOnline }: Props) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const fontSize = size * 0.38;

  return (
    <View style={{ width: size, height: size }}>
      {src ? (
        <Image
          source={{ uri: src }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
        </View>
      )}
      {isOnline !== undefined && (
        <View
          style={[
            styles.dot,
            {
              width:        size * 0.28,
              height:       size * 0.28,
              borderRadius: size * 0.14,
              backgroundColor: isOnline ? '#22c55e' : '#9ca3af',
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback:  { backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  initials:  { color: '#fff', fontWeight: '700' },
  dot:       { position: 'absolute', bottom: 0, right: 0, borderWidth: 2, borderColor: '#fff' },
});
