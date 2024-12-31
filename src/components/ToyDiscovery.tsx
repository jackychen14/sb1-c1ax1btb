import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LocationFilter } from './location/LocationFilter';
import { ToyCard } from './ToyCard';
import { LocationSearchFilters } from '../types/location';
import { useToys } from '../context/ToyContext';
import { useFilteredToys } from '../hooks/useFilteredToys';

export function ToyDiscovery() {
  const { t } = useTranslation();
  const { toys } = useToys();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState<LocationSearchFilters>({
    radius: 10,
  });

  const filteredToys = useFilteredToys(toys, filters);

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentIndex(prev => Math.min(prev + 1, filteredToys.length));
  };

  const currentToy = filteredToys[currentIndex];

  return (
    <div className="flex flex-col h-full">
      <LocationFilter filters={filters} onChange={setFilters} />
      
      <div className="flex-1 p-4">
        {currentToy ? (
          <ToyCard
            toy={currentToy}
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
          />
        ) : (
          <div className="text-center p-4">
            <h2 className="text-2xl font-bold mb-4">{t('toys.noMore')}</h2>
            <p className="text-gray-600">{t('toys.checkBack')}</p>
          </div>
        )}
      </div>
    </div>
  );
}