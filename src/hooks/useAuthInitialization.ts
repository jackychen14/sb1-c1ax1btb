import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { User } from '../types/auth';

interface AuthInitState {
  isInitialized: boolean;
  user: User | null;
  isAuthenticated: boolean;
}

export function useAuthInitialization(): AuthInitState {
  const [state, setState] = useState<AuthInitState>({
    isInitialized: false,
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setState({
              isInitialized: true,
              user: {
                id: session.user.id,
                email: session.user.email!,
                name: profile.name || session.user.email!.split('@')[0],
                credits: profile.credits || 0,
              },
              isAuthenticated: true,
            });
            return;
          }
        }
        
        setState({
          isInitialized: true,
          user: null,
          isAuthenticated: false,
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState({
          isInitialized: true,
          user: null,
          isAuthenticated: false,
        });
      }
    };

    initAuth();
  }, []);

  return state;
}