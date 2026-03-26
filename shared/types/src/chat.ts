import { UserPreview } from './user';
import { Message } from './message';

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
