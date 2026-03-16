export interface FAQItem {
  id: string;
  intent: string;
  keywords: string[];
  question: string;
  answer: string;
  routeContext: string[]; // e.g., ["global"], ["/"], ["/culinary"]
  followUpIds?: string[]; // IDs of related FAQ items to suggest
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[]; // Follow-up FAQ question suggestions
}
