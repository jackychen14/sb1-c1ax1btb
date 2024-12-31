export class StripeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StripeError';
  }
}

export class CheckoutError extends StripeError {
  constructor(message: string) {
    super(message);
    this.name = 'CheckoutError';
  }
}

export class PaymentIntentError extends StripeError {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentIntentError';
  }
}