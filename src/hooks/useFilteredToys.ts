import { useMemo } from 'react';
import { Toy } from '../types/toy';
import { useAuth } from '../context/AuthContext';
import { calculateDistance } from '../utils/location';
import { LocationSearchFilters } from '../types/location';

export function useFilteredToys(toys: Toy[], filters: LocationSearchFilters) {
  const { user } = useAuth();

  return useMemo(() => {
    // If no user is authenticated, return empty array
    if (!user) {
      return [];
    }

    // Filter out user's own toys and apply location filter
    return toys.filter(toy => {
      // Skip undefined toys
      if (!toy || !toy.owner) {
        return false;
      }

      // Remove toys posted by the current user
      if (toy.owner.id === user.id) {
        return false;
      }

      // Apply location filter if set
      if (filters.location && toy.location) {
        const distance = calculateDistance(
          filters.location.latitude,
          filters.location.longitude,
          toy.location.latitude,
          toy.location.longitude
        );
        return distance <= (filters.radius || 10);
      }

      return true;
    });
  }, [toys, filters, user]);
}