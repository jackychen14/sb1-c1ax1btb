import { Toy } from '../../../types/toy';

interface DBToy {
  id: string;
  name: string;
  description: string;
  age_range?: string;
  condition: Toy['condition'];
  images: any[];
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  owner_location: string;
  location: any;
  created_at: string;
  likes?: string[];
}

export function transformToyFromDB(dbToy: DBToy): Toy {
  if (!dbToy) {
    throw new Error('Invalid toy data received from database');
  }

  return {
    id: dbToy.id,
    name: dbToy.name,
    description: dbToy.description,
    ageRange: dbToy.age_range || '3-12 years', // Provide default age range
    condition: dbToy.condition,
    images: Array.isArray(dbToy.images) ? dbToy.images : [],
    owner: {
      id: dbToy.owner?.id || '',
      name: dbToy.owner?.name || '',
      location: dbToy.owner_location || '',
      avatar: dbToy.owner?.avatar || '',
    },
    location: dbToy.location || {},
    postedAt: dbToy.created_at,
    likes: Array.isArray(dbToy.likes) ? dbToy.likes : [],
  };
}

export function transformToyToDB(toy: Toy) {
  if (!toy.owner?.id) {
    throw new Error('Owner ID is required');
  }

  return {
    name: toy.name.trim(),
    description: toy.description.trim(),
    age_range: toy.ageRange,
    condition: toy.condition,
    images: Array.isArray(toy.images) ? toy.images : [],
    owner_id: toy.owner.id,
    owner_name: toy.owner.name,
    owner_location: toy.owner.location,
    location: toy.location,
    status: 'available',
    likes: Array.isArray(toy.likes) ? toy.likes : [],
  };
}