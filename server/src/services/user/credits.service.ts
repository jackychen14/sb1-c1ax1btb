import { supabase } from '../../config/supabase';
import { logger } from '../../utils/logger';

export async function updateUserCredits(userId: string, creditsToAdd: number) {
  try {
    const { data, error } = await supabase.rpc('add_user_credits', {
      user_id: userId,
      credits_to_add: creditsToAdd
    });

    if (error) throw error;
    return data;
  } catch (err) {
    logger.error('Failed to update user credits:', err);
    throw new Error('Failed to update credits');
  }
}