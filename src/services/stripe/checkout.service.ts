import { PaymentPackage } from '../../types/payment';
import { CheckoutError } from './errors';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export async function createCheckoutSession(packageDetails: PaymentPackage): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        package: packageDetails,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new CheckoutError(error.message || 'Failed to create checkout session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    throw error instanceof CheckoutError 
      ? error 
      : new CheckoutError('Failed to initialize checkout');
  }
}