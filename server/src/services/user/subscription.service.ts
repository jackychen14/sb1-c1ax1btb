import { supabase } from '../../config/supabase';
import { SubscriptionStatus } from '../../types/subscription';
import { logger } from '../../utils/logger';

export async function updateUserSubscription(
  userId: string, 
  subscription: SubscriptionStatus
) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: subscription.isActive,
        subscription_plan: subscription.plan,
        subscription_expires_at: subscription.expiresAt
      })
      .eq('id', userId);

    if (error) throw error;

    logger.info('User subscription updated:', { userId, subscription });
  } catch (err) {
    logger.error('Failed to update user subscription:', err);
    throw new Error('Failed to update subscription status');
  }
}

export async function checkSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_plan, subscription_expires_at')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return {
      isActive: data.subscription_status,
      plan: data.subscription_plan || 'free',
      expiresAt: data.subscription_expires_at
    };
  } catch (err) {
    logger.error('Failed to check subscription status:', err);
    throw new Error('Failed to check subscription status');
  }
}