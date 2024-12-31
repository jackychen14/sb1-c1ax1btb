import React from 'react';
import { Infinity, X } from 'lucide-react';

interface SubscriptionBannerProps {
  onClose: () => void;
}

export function SubscriptionBanner({ onClose }: SubscriptionBannerProps) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-md relative">
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
      >
        <X size={20} />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Infinity size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2">
            Unlimited Swipes
          </h3>
          <p className="text-blue-100 mb-4">
            Get unlimited swipes and match with more toys!
          </p>
          <div className="text-2xl font-bold mb-4">$4.99/month</div>
          <stripe-buy-button
            buy-button-id="buy_btn_1QbX7cG4v6p3MzGm0yNUJtAd"
            publishable-key="pk_live_51QbHiWG4v6p3MzGmT6JpK5OOH1Ahk0pPI5zM0YkgbxPnYr46bAtrpkKoyJe1sm8EWXD5AW2V2bUp19HviGDFJQT500rPMFW9mH"
          />
        </div>
      </div>
    </div>
  );
}