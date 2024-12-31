import { PaymentPackage } from '../types/payment';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/payments';

export class PaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

export async function createPaymentIntent(packageDetails: PaymentPackage): Promise<string> {
  try {
    // For development/demo purposes, return a mock client secret
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`);
      }, 1000);
    });
  } catch (error) {
    console.error('Payment intent creation failed:', error);
    throw new PaymentError('Unable to process payment at this time. Please try again later.');
  }
}