import { useState } from 'react';
import { PaymentPackage } from '../types/payment';
import { createCheckoutSession } from '../services/stripe/checkout.service';

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCheckout = async (packageDetails: PaymentPackage) => {
    try {
      setIsLoading(true);
      setError(null);
      const checkoutUrl = await createCheckoutSession(packageDetails);
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    redirectToCheckout,
  };
}