import { useState } from 'react';
import { Toy, ToyImage } from '../types/toy';
import { Location } from '../types/location';
import { useAuth } from '../context/AuthContext';
import { insertToy } from '../services/database/toys.service';
import { getUserCredits } from '../services/database/credits';
import { useErrorHandler } from './useErrorHandler';

interface ToyFormData {
  name: string;
  description: string;
  ageRange: string;
  condition: Toy['condition'];
}

export function useToyPosting() {
  const { user, updateCredits } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, handleError, clearError } = useErrorHandler('ToyPosting');

  const validateToyData = (formData: ToyFormData, images: ToyImage[], location: Location) => {
    if (!formData.name.trim()) throw new Error('Name is required');
    if (!formData.description.trim()) throw new Error('Description is required');
    if (!formData.ageRange.trim()) throw new Error('Age range is required');
    if (images.length === 0) throw new Error('Please upload at least one image');
    if (!location) throw new Error('Please set a location');
  };

  const postToy = async (formData: ToyFormData, images: ToyImage[], location: Location) => {
    if (!user) {
      throw new Error('You must be logged in to post a toy');
    }

    setIsSubmitting(true);
    clearError();

    try {
      validateToyData(formData, images, location);

      const newToy: Toy = {
        id: crypto.randomUUID(),
        ...formData,
        images,
        owner: {
          id: user.id,
          name: user.name,
          location: location.address,
          avatar: user.avatar || '',
        },
        location,
        postedAt: new Date().toISOString(),
        likes: [],
      };

      await insertToy(newToy);
      
      // Get updated credits after posting
      const newCredits = await getUserCredits(user.id);
      updateCredits(newCredits);
      
      return newToy;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    postToy,
    isSubmitting,
    error,
    clearError
  };
}