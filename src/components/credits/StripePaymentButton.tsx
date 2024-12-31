import React from 'react';
import { CreditCard } from 'lucide-react';
import { STRIPE_CHECKOUT_URL } from '../../config/stripe';

export function StripePaymentButton() {
  const handlePayment = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
    >
      <CreditCard size={20} />
      Purchase Credits
    </button>
  );
}