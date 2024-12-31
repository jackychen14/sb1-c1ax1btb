import React from 'react';
import { PaymentPackage } from '../../types/payment';
import { PaymentSummary } from './PaymentSummary';
import { StripeProvider } from './stripe/StripeProvider';

interface CreditCardFormProps {
  selectedPackage: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function CreditCardForm(props: CreditCardFormProps) {
  return (
    <div className="space-y-4">
      <PaymentSummary selectedPackage={props.selectedPackage} />
      <StripeProvider {...props} />
    </div>
  );
}