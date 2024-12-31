import { Location } from './location';

export interface ToyImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface Toy {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  images: ToyImage[];
  owner: {
    id: string;
    name: string;
    location: string;
    avatar: string;
  };
  location: Location;
  postedAt: string;
  likes: string[];
}