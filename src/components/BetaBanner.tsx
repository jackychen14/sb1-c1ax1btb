import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function BetaBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-500 text-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <span>
            If you running into any issues, please share with us via the Chat. You will receive 50 free credits in return!
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-blue-600 rounded-full"
          aria-label="Close message"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}