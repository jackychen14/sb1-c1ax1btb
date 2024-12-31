import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentPackage } from '../../../types/payment';
import { stripePromise } from '../../../config/stripe';
import { usePayment } from '../../../hooks/usePayment';
import { StripeElements } from './StripeElements';

interface StripeProviderProps {
  selectedPackage: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function StripeProvider(props: StripeProviderProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { isProcessing, error, initializePayment, resetError } = usePayment();

  useEffect(() => {
    const setup = async () => {
      try {
        resetError();
        const secret = await initializePayment(props.selectedPackage);
        setClientSecret(secret);
      } catch (err) {
        props.onError(err as Error);
      }
    };

    setup();
  }, [props.selectedPackage]);

  if (error) {
    return (
      <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
        <p className="font-medium">Payment Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!clientSecret || isProcessing) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">Initializing payment...</p>
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#3b82f6',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
          },
        },
      }}
    >
      <StripeElements {...props} />
    </Elements>
  );
}