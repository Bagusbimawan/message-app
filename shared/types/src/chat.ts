import { UserPreview } from './user';
import { Message } from './message';

export type ChatType = 'direct' | 'group';

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
}

export interface ChatPreview extends Pick<Chat, 'id' | 'type' | 'members' | 'memberDetails' | 'groupName' | 'groupPhotoURL' | 'lastMessage' | 'unreadCount'> {}
