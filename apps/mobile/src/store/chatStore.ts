import { create } from 'zustand';
import { Chat, Message } from '@messaging/types';

interface ChatState {
  chats:         Chat[];
  activeChatId:  string | null;
  messages:      Record<string, Message[]>;
  setChats:      (chats: Chat[]) => void;
  setActiveChat: (id: string | null) => void;
  setMessages:   (chatId: string, messages: Message[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats:        [],
  activeChatId: null,
  messages:     {},
  setChats:     (chats) => set({ chats }),
  setActiveChat:(id)    => set({ activeChatId: id }),
  setMessages:  (chatId, messages) =>
    set((s) => ({ messages: { ...s.messages, [chatId]: messages } })),
}));
