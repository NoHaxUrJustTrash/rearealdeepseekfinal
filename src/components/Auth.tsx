import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  theme: 'light' | 'dark';
}

export const Auth: React.FC<Props> = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const isLight = theme === 'light';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            redirectTo: `${window.location.origin}`,
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
        isLight ? 'bg-white' : 'bg-gray-800'
      }`}>
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <h2 className={`text-2xl font-bold mb-6 ${
          isLight ? 'text-gray-900' : 'text-white'
        }`}>
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors mb-4 flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${isLight ? 'bg-white text-gray-500' : 'bg-gray-800 text-gray-400'}`}>
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isLight ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                isLight 
                  ? 'bg-white border-gray-300 text-gray-900' 
                  : 'bg-gray-700 border-gray-600 text-white'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${
              isLight ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 ${
                isLight 
                  ? 'bg-white border-gray-300 text-gray-900' 
                  : 'bg-gray-700 border-gray-600 text-white'
              }`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className={`mt-4 text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-blue-500 hover:text-blue-600"
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};