import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { Location } from '../../types/location';

interface LocationInputProps {
  value: Location | null;
  onChange: (location: Location) => void;
  placeholder?: string;
}

export function LocationInput({ value, onChange, placeholder }: LocationInputProps) {
  const { getLocation, loading, error } = useGeolocation();
  const [address, setAddress] = useState(value?.address || '');

  const handleUseCurrentLocation = async () => {
    const location = await getLocation();
    if (location) {
      setAddress(location.address);
      onChange(location);
    }
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    
    // Only update the location if we have a valid address
    if (newAddress.trim()) {
      const mockLocation: Location = {
        ...value,
        address: newAddress,
      };
      onChange(mockLocation);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={address}
              onChange={handleManualInput}
              placeholder={placeholder || 'Enter location'}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50"
            title="Use current location"
          >
            <Navigation size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}