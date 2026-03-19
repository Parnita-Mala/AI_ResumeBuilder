'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { LogIn, LogOut, User } from 'lucide-react';

export default function Auth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkSession();

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/builder',
      },
    });
    if (error) {
      console.error('Sign in error:', error.message);
      alert('Sign in failed. Ensure Google is enabled in your Supabase dashboard.');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pr-2 border-r">
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
              <User size={16} />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-none">{user.user_metadata?.full_name || user.email}</span>
            <span className="text-[10px] text-slate-400">Authenticated</span>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 border rounded-lg transition-all"
    >
      <LogIn size={16} className="text-blue-500" /> Sign In with Google
    </button>
  );
}
