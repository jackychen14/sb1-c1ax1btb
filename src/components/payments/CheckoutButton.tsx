import React from 'react';
import { useCheckout } from '../../hooks/useCheckout';
import { PaymentPackage } from '../../types/payment';

interface CheckoutButtonProps {
  packageDetails: PaymentPackage;
  onError?: (error: Error) => void;
}

export function CheckoutButton({ packageDetails, onError }: CheckoutButtonProps) {
  const { isLoading, redirectToCheckout } = useCheckout();

  const handleClick = async () => {
    try {
      await redirectToCheckout(packageDetails);
    } catch (err) {
      onError?.(err as Error);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
    >
      {isLoading ? 'Redirecting...' : `Pay $${packageDetails.price}`}
    </button>
  );
}