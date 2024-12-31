import React from 'react';
import { Gift, Upload } from 'lucide-react';

export function CreditsBanner() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-blue-800 mb-2">Get Started with Free Credits!</h3>
      <div className="space-y-2 text-sm text-blue-700">
        <div className="flex items-center gap-2">
          <Gift size={16} className="flex-shrink-0" />
          <span>Get 100 free credits when you sign up</span>
        </div>
        <div className="flex items-center gap-2">
          <Upload size={16} className="flex-shrink-0" />
          <span>Earn 10 free credits every time you post a toy</span>
        </div>
      </div>
    </div>
  );
}