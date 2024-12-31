import React, { useState } from 'react';
import { LocationInput } from './LocationInput';
import { LocationPrivacy } from './LocationPrivacy';
import { Location, LocationPreference } from '../../types/location';

interface LocationPreferencesProps {
  preferences: LocationPreference[];
  onSave: (preferences: LocationPreference[]) => void;
}

export function LocationPreferences({ preferences, onSave }: LocationPreferencesProps) {
  const [locations, setLocations] = useState<LocationPreference[]>(preferences);

  const handleLocationChange = (index: number, location: Location) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], location };
    setLocations(newLocations);
    onSave(newLocations);
  };

  const handlePrivacyChange = (index: number, privacyLevel: LocationPreference['privacyLevel']) => {
    const newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], privacyLevel };
    setLocations(newLocations);
    onSave(newLocations);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Location Preferences</h3>
        {locations.map((pref, index) => (
          <div key={pref.id} className="space-y-4 mb-6">
            <LocationInput
              value={pref.location}
              onChange={(loc) => handleLocationChange(index, loc)}
              placeholder="Enter preferred exchange location"
            />
            <LocationPrivacy
              value={pref.privacyLevel}
              onChange={(privacy) => handlePrivacyChange(index, privacy)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}