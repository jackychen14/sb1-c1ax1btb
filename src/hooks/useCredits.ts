import { useAuth } from '../context/AuthContext';

export function useCredits() {
  const { user, updateCredits } = useAuth();

  const deductCredits = (amount: number): boolean => {
    if (!user) return false;
    if (user.credits < amount) return false;
    
    updateCredits(user.credits - amount);
    return true;
  };

  const hasEnoughCredits = (amount: number): boolean => {
    return user ? user.credits >= amount : false;
  };

  return {
    deductCredits,
    hasEnoughCredits,
    currentCredits: user?.credits || 0
  };
}