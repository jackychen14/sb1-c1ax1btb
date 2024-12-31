import { getDocs } from 'firebase/firestore';
import { Toy } from '../../../types/toy';
import { DatabaseError } from '../errors/DatabaseError';
import { transformToyFromFirestore } from '../firebase/transformers/toyTransformer';
import { queryAvailableToys } from '../firebase/queries/toyQueries';
import { logError } from '../../../utils/errorLogging';

export async function fetchToys(): Promise<Toy[]> {
  try {
    const q = await queryAvailableToys();
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
    logError('FetchToys', error);
    throw new DatabaseError('Failed to fetch toys');
  }
}