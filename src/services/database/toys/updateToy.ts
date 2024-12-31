import { doc, updateDoc } from 'firebase/firestore';
import { Toy } from '../../../types/toy';
import { DatabaseError } from '../errors/DatabaseError';
import { collections } from '../firebase/collections';
import { transformToyToFirestore } from '../firebase/transformers/toyTransformer';
import { logError } from '../../../utils/errorLogging';

export async function updateToy(id: string, updates: Partial<Toy>): Promise<void> {
  try {
    const toyRef = doc(collections.toys, id);
    const toyData = transformToyToFirestore(updates as Toy);
    
    await updateDoc(toyRef, {
      ...toyData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    logError('UpdateToy', error);
    throw new DatabaseError('Failed to update toy');
  }
}