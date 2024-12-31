export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface LocationPreference {
  id: string;
  userId: string;
  location: Location;
  radius: number; // in kilometers
  isDefault: boolean;
  privacyLevel: 'public' | 'matches-only' | 'private';
}

export interface LocationSearchFilters {
  location?: Location;
  radius?: number;
  city?: string;
  state?: string;
}