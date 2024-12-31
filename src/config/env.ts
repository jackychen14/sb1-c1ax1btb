import { loadEnv } from '../utils/env';

export const ENV = {
  GOOGLE_CLIENT_ID: loadEnv('GOOGLE_CLIENT_ID', ''),
  STRIPE_PUBLISHABLE_KEY: loadEnv('STRIPE_PUBLISHABLE_KEY', ''),
  API_URL: loadEnv('VITE_API_URL', 'http://localhost:3001'),
} as const;