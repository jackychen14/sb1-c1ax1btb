import { PaymentPackage } from '../../types/payment';
import { PaymentIntentError } from './errors';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export async function createPaymentIntent(packageDetails: PaymentPackage): Promise<string> {
  if (!packageDetails?.price) {
    throw new PaymentIntentError('Invalid package details');
  }

  try {
    const amountInCents = Math.round(packageDetails.price * 100);

    if (amountInCents < 50) {
      throw new PaymentIntentError('Amount must be at least $0.50');
    }

    const response = await fetch(`${API_URL}/api/payments/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
          packageId: packageDetails.id,
          credits: packageDetails.credits.toString(),
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new PaymentIntentError(errorData.error || 'Failed to create payment intent');
    }

    const data = await response.json();

    if (!data.clientSecret) {
      throw new PaymentIntentError('No client secret received');
    }

    return data.clientSecret;
  } catch (error) {
    console.error('Payment creation error:', error);
    
    if (error instanceof PaymentIntentError) {
      throw error;
    }
    
    if (error instanceof Error) {
      throw new PaymentIntentError(error.message);
    }

    throw new PaymentIntentError('Unable to process payment at this time');
  }
}