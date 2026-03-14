export interface FAQItem {
  id: string;
  intent: string;
  keywords: string[];
  question: string;
  answer: string;
  routeContext: string[]; // e.g., ["global"], ["/"], ["/culinary"]
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
