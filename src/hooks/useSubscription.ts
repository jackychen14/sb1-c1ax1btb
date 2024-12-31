import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { STRIPE_CHECKOUT_URL } from '../config/stripe';

export function useSubscription() {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const hasUnlimitedSwipes = () => {
    if (!user?.subscription) return false;
    
    return (
      user.subscription.isActive &&
      user.subscription.plan === 'unlimited' &&
      (user.subscription.expiresAt === null || 
       new Date(user.subscription.expiresAt) > new Date())
    );
  };

  const startSubscription = async () => {
    setIsProcessing(true);
    try {
      // Redirect to Stripe checkout
      window.location.href = STRIPE_CHECKOUT_URL;
    } catch (error) {
      console.error('Failed to start subscription:', error);
      setIsProcessing(false);
      throw error;
    }
  };

  return {
    hasUnlimitedSwipes,
    startSubscription,
    isProcessing,
    currentPlan: user?.subscription?.plan || 'free'
  };
}