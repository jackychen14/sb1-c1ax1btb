import { supabase } from '../../config/supabase';
import { Toy } from '../../types/toy';
import { DatabaseError } from './errors/DatabaseError';

export async function fetchToys(): Promise<Toy[]> {
  const { data, error } = await supabase
    .from('toys')
    .select(`
      *,
      profiles:owner_id (
        id,
        name,
        credits
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
      profiles:owner_id (
        id,
        name,
        credits
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
    .insert({
      name: toy.name,
      description: toy.description,
      age_range: toy.ageRange,
      condition: toy.condition,
      images: toy.images,
      owner_id: toy.owner.id,
      location: toy.location,
      status: 'available',
      likes: toy.likes
    });

  if (error) throw new DatabaseError(error.message);
}

export async function updateToy(id: string, updates: Partial<Toy>): Promise<void> {
  const { error } = await supabase
    .from('toys')
    .update({
      name: updates.name,
      description: updates.description,
      age_range: updates.ageRange,
      condition: updates.condition,
      images: updates.images,
      location: updates.location,
      likes: updates.likes
    })
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
      id: dbToy.profiles.id,
      name: dbToy.profiles.name || 'Anonymous',
      location: dbToy.location?.address || 'Unknown location',
      avatar: '', // We'll handle avatars separately if needed
    },
    location: dbToy.location,
    postedAt: dbToy.created_at,
    likes: dbToy.likes || [],
  };
}