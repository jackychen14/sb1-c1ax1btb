import { stripe } from '../../config/stripe';
import { logger } from '../../utils/logger';
import { PaymentPackage } from '../../types/payment';

interface CreateCheckoutSessionParams {
  package: PaymentPackage;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession({ 
  package: pkg, 
  successUrl, 
  cancelUrl 
}: CreateCheckoutSessionParams) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: pkg.label,
            description: pkg.description,
          },
          unit_amount: Math.round(pkg.price * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        packageId: pkg.id,
        credits: pkg.credits.toString(),
      },
    });

    logger.info('Checkout session created:', { sessionId: session.id });
    return { url: session.url };
  } catch (error) {
    logger.error('Failed to create checkout session:', error);
    throw error;
  }
}