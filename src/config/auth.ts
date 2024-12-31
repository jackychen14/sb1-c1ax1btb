import { loadStripe } from '@stripe/stripe-js';

// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'; // Replace with your actual client ID

export const AUTH_CONFIG = {
  google: {
    clientId: GOOGLE_CLIENT_ID,
    scope: 'email profile',
  }
};

// Stripe Configuration
export const STRIPE_CONFIG = {
  publishableKey: 'pk_live_51QbAnQLNHtf3eygVeaWGQUM2YWZimexSoieAoI1pBN4cVwjj2QtLyAGBmzJQMFV2lVEsthB9X6wjIdDaJTQfPvAZ00iMUwIbsk',
};

export const stripe = loadStripe(STRIPE_CONFIG.publishableKey);