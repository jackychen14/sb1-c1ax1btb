import React from 'react';
import { Infinity, Check } from 'lucide-react';
import { SUBSCRIPTION_FEATURES } from '../../constants/subscription';

interface SubscriptionOptionProps {
  onSubscribe: () => void;
}

export function SubscriptionOption({ onSubscribe }: SubscriptionOptionProps) {
  return (
    <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Infinity className="text-blue-500" size={24} />
            Unlimited Plan
          </h3>
          <p className="text-gray-600 mt-1">Unlimited swipes every month</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">$24.99</div>
          <div className="text-sm text-gray-500">per month</div>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {SUBSCRIPTION_FEATURES.map((feature) => (
          <li key={feature.id} className="flex items-center gap-2 text-gray-700">
            <Check size={18} className="text-green-500 flex-shrink-0" />
            <div>
              <div className="font-medium">{feature.label}</div>
              <div className="text-sm text-gray-500">{feature.description}</div>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={onSubscribe}
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Start Unlimited Plan
      </button>
    </div>
  );
}