export interface PaymentPackage {
  id: string;
  credits: number;
  price: number;
  label: string;
  description?: string;
}

export interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  address: string;
  city: string;
  zipCode: string;
}