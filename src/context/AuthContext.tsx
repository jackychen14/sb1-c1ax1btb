import React, { createContext, useContext, useState } from 'react';
import { User, AuthState, SignUpData, LoginData } from '../types/auth';
import { AuthError } from '../services/auth/errors';
import { signUp as apiSignUp, login as apiLogin, logout as apiLogout } from '../services/auth/auth.service';
import { supabase } from '../config/supabase';
import { useAuthInitialization } from '../hooks/useAuthInitialization';
import { LoadingScreen } from '../components/LoadingScreen';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  updateCredits: (newCredits: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized, user: initialUser, isAuthenticated: initialAuth } = useAuthInitialization();
  const [authState, setAuthState] = useState<AuthState>({
    user: initialUser,
    isAuthenticated: initialAuth,
  });

  const login = async (data: LoginData) => {
    try {
      const user = await apiLogin(data);
      setAuthState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUp = async (data: SignUpData) => {
    try {
      const user = await apiSignUp(data);
      setAuthState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setAuthState({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
      });
    }
  };

  const updateUser = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true,
    });
  };

  const updateCredits = (newCredits: number) => {
    if (!authState.user) return;
    
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, credits: newCredits } : null,
    }));
  };

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ 
      ...authState, 
      login, 
      signUp, 
      logout, 
      updateUser,
      updateCredits 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};