import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Get the current origin, defaulting to a development URL if not available
const getRedirectTo = () => {
  if (typeof window !== 'undefined') {
    // Use window.location.origin for the current URL
    return `${window.location.origin}/chat`;
  }
  // Fallback for SSR or when window is not available
  return 'http://localhost:5173/chat';
};

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      redirectTo: getRedirectTo(),
    },
  }
);