import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { DatabaseError } from './errors/DatabaseError';

export async function updateUserCredits(userId: string, newCredits: number): Promise<number> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { credits: newCredits });
    return newCredits;
  } catch (error) {
    throw new DatabaseError('Failed to update credits');
  }
}

export function onUserCreditsChange(userId: string, callback: (credits: number) => void) {
  const userRef = doc(db, 'users', userId);
  
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().credits);
    }
  });
}