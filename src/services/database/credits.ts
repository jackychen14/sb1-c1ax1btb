import { supabase } from '../../config/supabase';
import { DatabaseError } from './errors/DatabaseError';

export async function updateUserCredits(userId: string, amount: number): Promise<number> {
  const { data, error } = await supabase.rpc('add_user_credits', {
    user_id: userId,
    credits_to_add: amount
  });

  if (error) throw new DatabaseError('Failed to update credits');
  return data;
}

export async function getUserCredits(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (error) throw new DatabaseError('Failed to get credits');
  return data.credits;
}