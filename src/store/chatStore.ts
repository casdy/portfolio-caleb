import { create } from 'zustand';
import { ChatMessage } from '../types/chat';

interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  toggleChat: () => void;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [{
    id: 'welcome-msg',
    sender: 'bot',
    text: "System Online. Welcome to Caleb Labs. Ask me anything about Caleb's background!",
    timestamp: new Date()
  }],
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, { ...msg, id: crypto.randomUUID(), timestamp: new Date() }]
  })),
  clearHistory: () => set({ messages: [] })
}));
