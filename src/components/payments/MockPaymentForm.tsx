import React, { useState } from 'react';
import { PaymentPackage } from '../../types/payment';

interface MockPaymentFormProps {
  selectedPackage: PaymentPackage;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error) => void;
}

export function MockPaymentForm({
  selectedPackage,
  onSuccess
}: MockPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const mockPaymentIntent = {
        id: `pi_mock_${Date.now()}`,
        status: 'succeeded',
        amount: selectedPackage.price * 100,
      };
      onSuccess(mockPaymentIntent);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="4242 4242 4242 4242"
            defaultValue="4242 4242 4242 4242"
            disabled={isProcessing}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="MM/YY"
              defaultValue="12/25"
              disabled={isProcessing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="123"
              defaultValue="123"
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay $${selectedPackage.price}`}
      </button>
    </form>
  );
}