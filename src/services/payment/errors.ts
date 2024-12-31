export class PaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
  }
}

export class PaymentValidationError extends PaymentError {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentValidationError';
  }
}

export class PaymentProcessingError extends PaymentError {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentProcessingError';
  }
}