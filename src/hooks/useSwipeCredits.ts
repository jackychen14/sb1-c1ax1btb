import { useAuth } from '../context/AuthContext';
import { updateUserCredits } from '../services/database/credits';

export function useSwipeCredits() {
  const { user, updateCredits } = useAuth();

  const deductCredit = async () => {
    if (!user || user.credits < 1) {
      return false;
    }

    try {
      const newCredits = await updateUserCredits(user.id, -1);
      updateCredits(newCredits);
      return true;
    } catch (error) {
      console.error('Failed to deduct credit:', error);
      return false;
    }
  };

  return {
    canSwipe: user ? user.credits > 0 : false,
    deductCredit
  };
}