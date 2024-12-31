import React from 'react';
import { Shield, Users, Globe } from 'lucide-react';
import { LocationPreference } from '../../types/location';

interface LocationPrivacyProps {
  value: LocationPreference['privacyLevel'];
  onChange: (value: LocationPreference['privacyLevel']) => void;
}

export function LocationPrivacy({ value, onChange }: LocationPrivacyProps) {
  const options = [
    {
      value: 'private',
      label: 'Private',
      icon: Shield,
      description: 'Only you can see your location',
    },
    {
      value: 'matches-only',
      label: 'Matches Only',
      icon: Users,
      description: 'Only show to users you match with',
    },
    {
      value: 'public',
      label: 'Public',
      icon: Globe,
      description: 'Visible to all users',
    },
  ];

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer ${
            value === option.value ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <input
            type="radio"
            name="privacy"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value as LocationPreference['privacyLevel'])}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <option.icon size={16} className="text-gray-500" />
              <span className="font-medium">{option.label}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
          </div>
        </label>
      ))}
    </div>
  );
}