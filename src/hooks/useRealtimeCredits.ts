import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';

export function useRealtimeCredits() {
  const { user, updateCredits } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase.channel(`public:profiles:id=eq.${user.id}`)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new && typeof payload.new.credits === 'number') {
            updateCredits(payload.new.credits);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, updateCredits]);
}