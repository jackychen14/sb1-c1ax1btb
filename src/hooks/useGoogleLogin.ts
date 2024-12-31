import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AUTH_CONFIG } from '../config/auth';

export function useGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle: authSignInWithGoogle } = useAuth();

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await authSignInWithGoogle();
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    loading,
  };
}