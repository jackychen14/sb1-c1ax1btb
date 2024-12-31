import { useState } from 'react';
import { Location } from '../types/location';

export function useLocation() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    return new Promise<Location | null>((resolve) => {
      setLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        resolve(null);
        return;
      }

      // For demo purposes, return a mock location
      setTimeout(() => {
        const mockLocation: Location = {
          latitude: 40.7128,
          longitude: -74.0060,
          address: '123 Demo Street, New York, NY',
          city: 'New York',
          state: 'NY',
          country: 'USA'
        };
        
        setCurrentLocation(mockLocation);
        setLoading(false);
        resolve(mockLocation);
      }, 1000);
    });
  };

  return { currentLocation, loading, error, getCurrentLocation };
}