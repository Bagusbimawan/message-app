// No-op mock — real Firestore is not used in UI preview mode.
// Screens use mock data from src/mock/data.ts instead.
import { Chat, Message, MessageDraft, UserPreview } from '@messaging/types';

export async function searchUsers(_term: string, _currentUid: string): Promise<UserPreview[]> {
  return [];
}

export async function updateFcmToken(_uid: string, _token: string) {}

export async function getOrCreateDirectChat(
  _currentUid: string,
  _currentUser: UserPreview,
  _otherUid:    string,
  _otherUser:   UserPreview
): Promise<string> {
  return _otherUid;
}

export async function createGroupChat(
  _creatorUid:  string,
  _creatorUser: UserPreview,
  _members:     UserPreview[],
  _groupName:   string
): Promise<string> {
  return 'mock-group-id';
}

export async function sendMessage(_draft: MessageDraft & { mediaURL?: string }): Promise<string> {
  return `mock_${Date.now()}`;
}

export async function markMessagesAsRead(_chatId: string, _userId: string) {}

export function subscribeToChats(_uid: string, _callback: (chats: Chat[]) => void) {
  return () => {};
}

export function subscribeToMessages(_chatId: string, _callback: (msgs: Message[]) => void) {
  return () => {};
}
