import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useCreditsManagement() {
  const { user, updateCredits } = useAuth();

  const addCredits = async (amount: number) => {
    if (!user) return false;

    try {
      const userRef = doc(db, 'users', user.id);
      const newCredits = user.credits + amount;
      await updateDoc(userRef, { credits: newCredits });
      updateCredits(newCredits);
      return true;
    } catch (error) {
      console.error('Failed to add credits:', error);
      return false;
    }
  };

  return {
    addCredits
  };
}