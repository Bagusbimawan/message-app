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
