import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../../config/stripe';
import { PaymentPackage } from '../../../types/payment';
import { StripeCheckoutForm } from './StripeCheckoutForm';
import { createPaymentIntent } from '../../../services/stripe/payment.service';
import { PaymentSummary } from '../PaymentSummary';

interface StripeWrapperProps {
  selectedPackage: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function StripeWrapper(props: StripeWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent(props.selectedPackage)
      .then(setClientSecret)
      .catch(props.onError);
  }, [props.selectedPackage]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#3b82f6',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
      },
    },
  };

  return (
    <div className="space-y-4">
      <PaymentSummary selectedPackage={props.selectedPackage} />
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckoutForm {...props} />
      </Elements>
    </div>
  );
}