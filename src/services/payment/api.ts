import { PaymentPackage } from '../../types/payment';
import { STRIPE_CONFIG } from '../../config/stripe';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL is not defined');
}

export async function createPaymentIntent(packageDetails: PaymentPackage): Promise<Response> {
  const amountInCents = Math.round(packageDetails.price * 100);
  
  return fetch(`${API_URL}/api/payments/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      amount: amountInCents,
      currency: STRIPE_CONFIG.currency,
      metadata: {
        packageId: packageDetails.id,
        credits: packageDetails.credits.toString(),
      },
    }),
  });
}