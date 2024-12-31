import React from 'react';
import { Infinity, Check } from 'lucide-react';
import { StripePaymentButton } from './StripePaymentButton';

const FEATURES = [
  'Unlimited swipes daily',
  'Priority matching',
  'Cancel anytime'
];

export function SubscriptionCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Infinity className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold">Unlimited Swipes</h3>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-blue-600">$4.99</div>
        <div className="text-gray-600">per month</div>
      </div>

      <ul className="space-y-3 mb-6">
        {FEATURES.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="text-green-500 flex-shrink-0" size={20} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <StripePaymentButton />
    </div>
  );
}