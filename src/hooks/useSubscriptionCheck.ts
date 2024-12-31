import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';

export function useSubscriptionCheck() {
  const { user, updateUser } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    // Subscribe to profile changes using the correct channel API
    const channel = supabase.channel(`profile-changes-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new) {
            updateUser({
              ...user,
              subscription: {
                isActive: payload.new.subscription_status,
                plan: payload.new.subscription_plan || 'free',
                expiresAt: payload.new.subscription_expires_at
              }
            });
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user?.id, updateUser]);
}