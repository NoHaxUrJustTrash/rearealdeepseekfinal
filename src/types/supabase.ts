export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          id: string
          user_id: string
          title: string
          last_updated: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          last_updated?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          last_updated?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          role: 'user' | 'assistant'
          content: string
          thinking?: string
          thinking_time?: number
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          role: 'user' | 'assistant'
          content: string
          thinking?: string
          thinking_time?: number
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          role?: 'user' | 'assistant'
          content?: string
          thinking?: string
          thinking_time?: number
          timestamp?: string
          created_at?: string
        }
      }
    }
  }
}