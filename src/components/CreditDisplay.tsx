import React, { useEffect } from 'react';
import { Coins } from 'lucide-react';
import { useRealtimeCredits } from '../hooks/useRealtimeCredits';
import { useTranslation } from 'react-i18next';

interface CreditDisplayProps {
  credits: number;
}

export function CreditDisplay({ credits }: CreditDisplayProps) {
  const { t } = useTranslation();
  useRealtimeCredits();

  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
      <Coins className="text-yellow-500" size={20} />
      <span className="font-semibold">{t('credits.current', { count: credits })}</span>
    </div>
  );
}