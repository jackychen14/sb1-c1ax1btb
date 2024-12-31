import { addDoc } from 'firebase/firestore';
import { Toy } from '../../../types/toy';
import { DatabaseError } from '../errors/DatabaseError';
import { collections } from '../firebase/collections';
import { transformToyToFirestore } from '../firebase/transformers/toyTransformer';
import { logError } from '../../../utils/errorLogging';

export async function insertToy(toy: Toy): Promise<void> {
  try {
    const toyData = transformToyToFirestore(toy);
    await addDoc(collections.toys, {
      ...toyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'available'
    });
  } catch (error) {
    logError('InsertToy', error);
    throw new DatabaseError('Failed to insert toy');
  }
}