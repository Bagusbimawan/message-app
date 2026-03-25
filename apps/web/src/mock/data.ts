import { Chat, Message } from '@messaging/types';

export const CURRENT_UID = 'me';

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    type: 'direct',
    members: ['me', 'user2'],
    memberDetails: {
      me:    { uid: 'me',    displayName: 'You',          photoURL: null },
      user2: { uid: 'user2', displayName: 'Budi Santoso', photoURL: null },
    },
    createdBy: 'me',
    unreadCount: { me: 2, user2: 0 },
    lastMessage: {
      text:      'Hei, gimana kabarnya?',
      senderId:  'user2',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type:      'text',
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'group',
    members: ['me', 'user2', 'user3'],
    memberDetails: {
      me:    { uid: 'me',    displayName: 'You',          photoURL: null },
      user2: { uid: 'user2', displayName: 'Budi Santoso', photoURL: null },
      user3: { uid: 'user3', displayName: 'Sari Dewi',    photoURL: null },
    },
    groupName: 'Tim Proyek Alpha',
    createdBy: 'me',
    unreadCount: { me: 0, user2: 0, user3: 0 },
    lastMessage: {
      text:      'Meeting jam 3 sore ya',
      senderId:  'me',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type:      'text',
    },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'direct',
    members: ['me', 'user3'],
    memberDetails: {
      me:    { uid: 'me',    displayName: 'You',       photoURL: null },
      user3: { uid: 'user3', displayName: 'Sari Dewi', photoURL: null },
    },
    createdBy: 'me',
    unreadCount: { me: 0, user3: 0 },
    lastMessage: {
      text:      'Ok siap!',
      senderId:  'me',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type:      'text',
    },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', chatId: '1', senderId: 'user2', type: 'text', text: 'Hei!', status: 'read', readBy: { me: new Date() }, timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    { id: 'm2', chatId: '1', senderId: 'me',    type: 'text', text: 'Hei juga! Ada apa?', status: 'read', readBy: { user2: new Date() }, timestamp: new Date(Date.now() - 9 * 60 * 1000) },
    { id: 'm3', chatId: '1', senderId: 'user2', type: 'text', text: 'Mau tanya soal proyek kita', status: 'read', readBy: { me: new Date() }, timestamp: new Date(Date.now() - 8 * 60 * 1000) },
    { id: 'm4', chatId: '1', senderId: 'user2', type: 'text', text: 'Hei, gimana kabarnya?', status: 'delivered', readBy: {}, timestamp: new Date(Date.now() - 5 * 60 * 1000) },
  ],
  '2': [
    { id: 'm5', chatId: '2', senderId: 'user3', type: 'text', text: 'Besok ada standup jam berapa?', status: 'read', readBy: { me: new Date(), user2: new Date() }, timestamp: new Date(Date.now() - 60 * 60 * 1000) },
    { id: 'm6', chatId: '2', senderId: 'me',    type: 'text', text: 'Meeting jam 3 sore ya', status: 'delivered', readBy: {}, timestamp: new Date(Date.now() - 30 * 60 * 1000) },
  ],
  '3': [
    { id: 'm7', chatId: '3', senderId: 'me',    type: 'text', text: 'Sari, tugasnya sudah selesai?', status: 'read', readBy: { user3: new Date() }, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 - 5000) },
    { id: 'm8', chatId: '3', senderId: 'user3', type: 'text', text: 'Ok siap!', status: 'read', readBy: { me: new Date() }, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  ],
};
