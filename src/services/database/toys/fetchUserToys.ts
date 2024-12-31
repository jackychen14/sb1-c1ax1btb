import { getDocs } from 'firebase/firestore';
import { Toy } from '../../../types/toy';
import { DatabaseError } from '../errors/DatabaseError';
import { transformToyFromFirestore } from '../firebase/transformers/toyTransformer';
import { queryUserToys } from '../firebase/queries/toyQueries';
import { logError } from '../../../utils/errorLogging';

export async function fetchUserToys(userId: string): Promise<Toy[]> {
  if (!userId) return [];

  try {
    const q = await queryUserToys(userId);
    const snapshot = await getDocs(q);
    
    return snapshot.docs
      .map(doc => {
        try {
          return transformToyFromFirestore(doc);
        } catch (error) {
          logError('TransformToy', error);
          return null;
        }
      })
      .filter((toy): toy is Toy => toy !== null);
  } catch (error) {
    logError('FetchUserToys', error);
    throw new DatabaseError('Failed to fetch user toys');
  }
}