import { supabase } from '../../config/supabase';
import { User, LoginData, SignUpData } from '../../types/auth';
import { AuthError } from './errors';

export async function login({ email, password }: LoginData): Promise<User> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw AuthError.fromSupabaseError(authError);
    if (!authData.user) throw new AuthError('No user returned from auth');

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw new AuthError('Failed to fetch user profile');

    return {
      id: authData.user.id,
      email: authData.user.email!,
      name: profile.name || authData.user.email!.split('@')[0],
      credits: profile.credits || 0,
    };
  } catch (error) {
    console.error('Auth error:', error);
    throw error instanceof AuthError ? error : new AuthError('Login failed');
  }
}

export async function signUp({ email, password, name }: SignUpData): Promise<User> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (authError) throw AuthError.fromSupabaseError(authError);
    if (!authData.user) throw new AuthError('Sign up failed');

    // Wait for profile creation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw new AuthError('Failed to create user profile');

    return {
      id: authData.user.id,
      email: authData.user.email!,
      name: profile.name || name,
      credits: profile.credits || 100,
    };
  } catch (error) {
    console.error('Auth error:', error);
    throw error instanceof AuthError ? error : new AuthError('Sign up failed');
  }
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw AuthError.fromSupabaseError(error);
}