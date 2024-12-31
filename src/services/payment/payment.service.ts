import { PaymentPackage } from '../../types/payment';
import { PaymentError } from './errors';
import { createPaymentIntent } from './api';
import { STRIPE_CONFIG } from '../../config/stripe';

export async function initializePayment(packageDetails: PaymentPackage): Promise<string> {
  try {
    // Validate package details
    if (!packageDetails?.price) {
      throw new PaymentError('Invalid package details');
    }

    const amountInCents = Math.round(packageDetails.price * 100);
    
    // Validate minimum amount
    if (amountInCents < STRIPE_CONFIG.minAmount) {
      throw new PaymentError(`Amount must be at least $${STRIPE_CONFIG.minAmount / 100}`);
    }

    const response = await createPaymentIntent(packageDetails);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new PaymentError(errorData.error || 'Payment initialization failed');
    }

    const data = await response.json();
    
    if (!data.clientSecret) {
      throw new PaymentError('No client secret received');
    }

    return data.clientSecret;
  } catch (error) {
    console.error('Payment initialization failed:', error);
    
    if (error instanceof PaymentError) {
      throw error;
    }
    
    throw new PaymentError('Payment service is temporarily unavailable');
  }
}