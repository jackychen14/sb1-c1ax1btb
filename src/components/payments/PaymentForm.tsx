import React from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { usePaymentStatus } from '../../hooks/usePaymentStatus';
import { PaymentPackage } from '../../types/payment';

interface PaymentFormProps {
  packageDetails: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function PaymentForm({ packageDetails, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { status, error, startProcessing, handleSuccess, handleError } = usePaymentStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      handleError('Payment system is not ready');
      return;
    }

    startProcessing();

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: 'if_required',
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        handleSuccess();
        onSuccess(paymentIntent);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      handleError(message);
      onError(err as Error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || status === 'processing'}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {status === 'processing' ? 'Processing...' : `Pay $${packageDetails.price}`}
      </button>
    </form>
  );
}