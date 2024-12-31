import Stripe from 'stripe';
import { config } from './environment';

if (!config.stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});