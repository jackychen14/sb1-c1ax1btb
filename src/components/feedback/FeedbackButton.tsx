import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FeedbackButtonProps {
  onClick: () => void;
}

export function FeedbackButton({ onClick }: FeedbackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      aria-label="Give Feedback"
    >
      <MessageCircle size={24} />
    </button>
  );
}