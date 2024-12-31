export interface StripePaymentIntent {
  clientSecret: string;
  id: string;
}

export interface StripeError {
  type: string;
  message: string;
  code?: string;
}