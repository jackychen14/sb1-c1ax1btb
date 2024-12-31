import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import { initializePayment } from '../../services/payment/payment.service';
import { PaymentForm } from './PaymentForm';
import { PaymentPackage } from '../../types/payment';

interface PaymentProviderProps {
  packageDetails: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function PaymentProvider(props: PaymentProviderProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setup = async () => {
      try {
        const secret = await initializePayment(props.packageDetails);
        setClientSecret(secret);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment initialization failed');
        props.onError(err as Error);
      }
    };

    setup();
  }, [props.packageDetails]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <p className="font-medium">Payment Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!clientSecret) {
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
      <PaymentForm {...props} />
    </Elements>
  );
}