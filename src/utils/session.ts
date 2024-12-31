import { supabase } from '../config/supabase';

export async function clearSession() {
  try {
    // Clear local storage
    localStorage.removeItem('supabase.auth.token');
    
    // Clear any session cookies
    document.cookie = 'sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Session cleanup error:', error);
    throw error;
  }
}