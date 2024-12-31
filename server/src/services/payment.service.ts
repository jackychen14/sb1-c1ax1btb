import { stripe } from '../config/stripe';
import { logger } from '../utils/logger';

interface CreatePaymentIntentParams {
  amount: number;
  currency: string;
  metadata?: Record<string, string>;
}

export async function createPaymentIntent({ amount, currency, metadata }: CreatePaymentIntentParams) {
  try {
    logger.info('Creating payment intent:', { amount, currency });
    
    // Validate amount
    if (amount < 50) {
      throw new Error('Amount must be at least $0.50');
    }

    // Validate currency
    if (!['usd', 'eur', 'gbp'].includes(currency.toLowerCase())) {
      throw new Error('Invalid currency');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error('Failed to generate client secret');
    }

    logger.info('Payment intent created:', { 
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    });
    
    return paymentIntent.client_secret;
  } catch (error) {
    logger.error('Payment intent creation failed:', error);
    throw error;
  }
}