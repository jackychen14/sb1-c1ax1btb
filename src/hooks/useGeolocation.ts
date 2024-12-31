import { useState, useCallback } from 'react';
import { Location } from '../types/location';
import { getCurrentPosition, reverseGeocode, GeolocationError } from '../utils/geolocation';

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async (): Promise<Location | null> => {
    try {
      setLoading(true);
      setError(null);

      const position = await getCurrentPosition();
      const location = await reverseGeocode(
        position.coords.latitude,
        position.coords.longitude
      );

      return location;
    } catch (err) {
      const message = err instanceof GeolocationError ? err.message : 'Failed to get location';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getLocation,
    loading,
    error
  };
}