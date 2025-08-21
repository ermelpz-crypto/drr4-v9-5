import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
  user_metadata?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session?.user) await setUserFromSession(session.user);
      setLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setError(null);
      if (session?.user) {
        await setUserFromSession(session.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setUserFromSession = async (supabaseUser: SupabaseUser) => {
    if (!supabaseUser.email) {
      setError('User email is missing');
      return;
    }

    const { data: userProfile, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', supabaseUser.email)
      .single();

    const userData: User = {
      id: supabaseUser.id,
      email: supabaseUser.email,
      role: userProfile?.role || supabaseUser.user_metadata?.role || 'editor',
      name: userProfile?.name || supabaseUser.user_metadata?.name || supabaseUser.email,
      user_metadata: supabaseUser.user_metadata
    };

    setUser(userData);
    setIsAuthenticated(true);

    if (userProfile?.id) {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userProfile.id);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return false;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      console.error('Login error:', error);
      const msg = error.message.toLowerCase();
      if (msg.includes('invalid')) setError('Invalid email or password.');
      else if (msg.includes('confirm')) setError('Please confirm your email.');
      else if (msg.includes('request')) setError('Too many attempts. Try again later.');
      else setError(error.message);
      setLoading(false);
      return false;
    }

    if (data?.user) {
      await setUserFromSession(data.user);
      setLoading(false);
      return true;
    }

    setError('Login failed. No user returned.');
    setLoading(false);
    return false;
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      setError('Failed to sign out');
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};