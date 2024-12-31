import React from 'react';
import { Sliders } from 'lucide-react';
import { LocationInput } from './LocationInput';
import { LocationSearchFilters } from '../../types/location';

interface LocationFilterProps {
  filters: LocationSearchFilters;
  onChange: (filters: LocationSearchFilters) => void;
}

export function LocationFilter({ filters, onChange }: LocationFilterProps) {
  return (
    <div className="bg-white p-4 border-b">
      <div className="flex items-center gap-4">
        <LocationInput
          value={filters.location || null}
          onChange={(location) => onChange({ ...filters, location })}
          placeholder="Search location"
        />
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="100"
            value={filters.radius || 10}
            onChange={(e) => onChange({ ...filters, radius: Number(e.target.value) })}
            className="w-24"
          />
          <span className="text-sm text-gray-600">{filters.radius || 10}km</span>
        </div>
      </div>
    </div>
  );
}