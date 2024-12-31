import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { sendFeedback } from '../../services/feedback/feedback.service';

interface FeedbackChatProps {
  onClose: () => void;
}

export function FeedbackChat({ onClose }: FeedbackChatProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await sendFeedback(message);
      setMessage('');
      alert('Thank you for your feedback!');
      onClose();
    } catch (error) {
      alert('Failed to send feedback. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Send Feedback</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label="Close feedback"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your thoughts or report issues..."
          className="w-full h-32 p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isSending || !message.trim()}
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSending ? 'Sending...' : (
            <>
              <Send size={16} />
              Send Feedback
            </>
          )}
        </button>
      </form>
    </div>
  );
}