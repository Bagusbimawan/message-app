// User types
export interface User {
  uid: string;
  displayName: string;
  photoURL: string | null;
  email: string | null;
  phone: string | null;
  fcmTokens: string[];
  presence: {
    isOnline: boolean;
    lastSeen: Date;
  };
  createdAt: Date;
}

export interface UserPreview {
  uid: string;
  displayName: string;
  photoURL: string | null;
}

// Message types
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';
export type MessageType = 'text' | 'image' | 'file';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  type: MessageType;
  text?: string;
  mediaURL?: string;
  mediaType?: string;   // MIME type e.g. "image/jpeg"
  fileName?: string;
  fileSize?: number;    // bytes
  status: MessageStatus;
  readBy: Record<string, Date>; // userId -> timestamp
  replyTo?: string;             // messageId
  timestamp: Date;
}

export interface MessageDraft {
  chatId: string;
  senderId: string;
  type: MessageType;
  text?: string;
  localUri?: string;   // local file path before upload
  mediaType?: string;
  fileName?: string;
  fileSize?: number;
  replyTo?: string;
}

// Chat types
export type ChatType = 'direct' | 'group' | 'channel' | 'community';

export interface ChatRoom {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unreadCount?: Record<string, number>;
  lastMessage?: Pick<Message, 'text' | 'senderId' | 'timestamp' | 'type'>;
}

export interface Chat {
  id: string;
  type: ChatType;
  members: string[];
  memberDetails: Record<string, UserPreview>;
  groupName?: string;
  groupPhotoURL?: string;
  createdBy: string;
  lastMessage?: Pick<Message, 'text' | 'senderId' | 'timestamp' | 'type'>;
  unreadCount: Record<string, number>; // userId -> count
  createdAt: Date;
  rooms?: ChatRoom[];
  defaultRoomId?: string;
}

export interface ChatPreview extends Pick<Chat, 'id' | 'type' | 'members' | 'memberDetails' | 'groupName' | 'groupPhotoURL' | 'lastMessage' | 'unreadCount'> { }