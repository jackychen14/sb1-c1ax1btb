import { useState } from 'react';
import { PaymentPackage } from '../types/payment';
import { createPaymentIntent } from '../services/stripe/payment.service';

export function usePayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (packageDetails: PaymentPackage): Promise<string> => {
    if (isProcessing) {
      throw new Error('Payment is already being processed');
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      const clientSecret = await createPaymentIntent(packageDetails);
      return clientSecret;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetError = () => setError(null);

  return {
    isProcessing,
    error,
    initializePayment,
    resetError,
  };
}