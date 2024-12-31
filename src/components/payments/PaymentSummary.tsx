import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentPackage } from '../../types/payment';

interface PaymentSummaryProps {
  selectedPackage: PaymentPackage;
}

export function PaymentSummary({ selectedPackage }: PaymentSummaryProps) {
  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        <CreditCard size={20} />
        <span className="font-medium">Payment Summary</span>
      </div>
      <div className="flex justify-between items-center">
        <span>{selectedPackage.label}</span>
        <span className="font-medium">${selectedPackage.price}</span>
      </div>
      {selectedPackage.description && (
        <p className="text-sm text-gray-600 mt-1">{selectedPackage.description}</p>
      )}
    </div>
  );
}