import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useGoogleAuth() {
  const { signInWithGoogle: authSignInWithGoogle } = useAuth();

  const signInWithGoogle = useCallback(async () => {
    try {
      // For development, use mock data
      await authSignInWithGoogle();
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  }, [authSignInWithGoogle]);

  return { signInWithGoogle };
}