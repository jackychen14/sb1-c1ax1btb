import { doc, deleteDoc } from 'firebase/firestore';
import { DatabaseError } from '../errors/DatabaseError';
import { collections } from '../firebase/collections';
import { logError } from '../../../utils/errorLogging';

export async function deleteToy(id: string): Promise<void> {
  try {
    const toyRef = doc(collections.toys, id);
    await deleteDoc(toyRef);
  } catch (error) {
    logError('DeleteToy', error);
    throw new DatabaseError('Failed to delete toy');
  }
}