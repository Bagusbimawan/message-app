import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '@/screens/chats/ChatListScreen';
import ChatRoomScreen from '@/screens/chats/ChatRoomScreen';
import NewChatScreen  from '@/screens/chats/NewChatScreen';
import ProfileScreen  from '@/screens/profile/ProfileScreen';

export type AppStackParamList = {
  Tabs:     undefined;
  ChatRoom: { chatId: string; chatName: string };
  NewChat:  undefined;
};

export type TabParamList = {
  Chats:   undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tab   = createBottomTabNavigator<TabParamList>();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:      '#2563eb',
        tabBarInactiveTintColor:    '#9ca3af',
        tabBarStyle:                { borderTopColor: '#f0f0f0', elevation: 0, shadowOpacity: 0 },
        tabBarLabelStyle:           { fontSize: 11, fontWeight: '600' },
        headerShown:                false,
      }}
    >
      <Tab.Screen
        name="Chats"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => <TabIcon emoji="💬" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor:       '#2563eb',
        headerTitleStyle:      { fontWeight: '700', fontSize: 17 },
        headerShadowVisible:   false,
        headerStyle:           { backgroundColor: '#fff' },
        contentStyle:          { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="Tabs"     component={TabNavigator}   options={{ headerShown: false }} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({ title: route.params.chatName })}
      />
      <Stack.Screen name="NewChat"  component={NewChatScreen}  options={{ title: 'New Conversation' }} />
    </Stack.Navigator>
  );
}
