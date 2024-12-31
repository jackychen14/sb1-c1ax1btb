import { supabase } from '../../../config/supabase';
import { Toy } from '../../../types/toy';
import { DatabaseError } from '../errors/DatabaseError';

export async function fetchToys(): Promise<Toy[]> {
  const { data, error } = await supabase
    .from('toys')
    .select(`
      *,
      owner:owner_id (
        id,
        email,
        raw_user_meta_data->>name as name,
        raw_user_meta_data->>avatar as avatar,
        raw_user_meta_data->>location as location
      )
    `)
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  if (error) throw new DatabaseError(error.message);
  
  return data.map(transformToyFromDB);
}

export async function fetchUserToys(userId: string): Promise<Toy[]> {
  const { data, error } = await supabase
    .from('toys')
    .select(`
      *,
      owner:owner_id (
        id,
        email,
        raw_user_meta_data->>name as name,
        raw_user_meta_data->>avatar as avatar,
        raw_user_meta_data->>location as location
      )
    `)
    .eq('owner_id', userId)
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  if (error) throw new DatabaseError(error.message);
  
  return data.map(transformToyFromDB);
}

export async function insertToy(toy: Toy): Promise<void> {
  const { error } = await supabase
    .from('toys')
    .insert(transformToyToDB(toy));

  if (error) throw new DatabaseError(error.message);
}

export async function updateToy(id: string, updates: Partial<Toy>): Promise<void> {
  const { error } = await supabase
    .from('toys')
    .update(transformToyToDB(updates as Toy))
    .eq('id', id);

  if (error) throw new DatabaseError(error.message);
}

export async function deleteToy(id: string): Promise<void> {
  const { error } = await supabase
    .from('toys')
    .update({ status: 'deleted' })
    .eq('id', id);

  if (error) throw new DatabaseError(error.message);
}

function transformToyFromDB(dbToy: any): Toy {
  return {
    id: dbToy.id,
    name: dbToy.name,
    description: dbToy.description,
    ageRange: dbToy.age_range,
    condition: dbToy.condition,
    images: dbToy.images,
    owner: {
      id: dbToy.owner.id,
      name: dbToy.owner.name,
      location: dbToy.owner.location,
      avatar: dbToy.owner.avatar || '',
    },
    location: dbToy.location,
    postedAt: dbToy.created_at,
    likes: dbToy.likes || [],
  };
}

function transformToyToDB(toy: Toy) {
  return {
    name: toy.name,
    description: toy.description,
    age_range: toy.ageRange,
    condition: toy.condition,
    images: toy.images,
    owner_id: toy.owner.id,
    location: toy.location,
    likes: toy.likes,
  };
}