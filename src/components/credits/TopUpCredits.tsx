import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StripePaymentButton } from './StripePaymentButton';

interface TopUpCreditsProps {
  onClose: () => void;
}

export function TopUpCredits({ onClose }: TopUpCreditsProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">{t('credits.topUp')}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {t('credits.purchase')}
          </p>
          <StripePaymentButton />
        </div>
      </div>
    </div>
  );
}