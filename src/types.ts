export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  thinking?: string;
  thinkingTime?: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
  userId?: string;
}

export interface Settings {
  theme: 'dark' | 'light';
  fontSize: 'small' | 'medium' | 'large';
  showTimestamps: boolean;
}

export interface ChatStats {
  totalChats: number;
  totalMessages: number;
  averageResponseTime: number;
}