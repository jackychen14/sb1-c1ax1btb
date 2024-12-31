import React from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import { PaymentPackage } from '../../types/payment';

interface StripeCheckoutProps {
  clientSecret: string;
  selectedPackage: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

function StripeCheckoutForm({ clientSecret, selectedPackage, onSuccess, onError }: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required',
      });

      if (error) {
        throw new Error(error.message);
      } else if (paymentIntent) {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      onError(err as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay $${selectedPackage.price}`}
      </button>
    </form>
  );
}

export function StripeWrapper({ clientSecret, selectedPackage, onSuccess, onError }: StripeCheckoutProps) {
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
    <Elements stripe={stripePromise} options={options}>
      <StripeCheckoutForm
        clientSecret={clientSecret}
        selectedPackage={selectedPackage}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}