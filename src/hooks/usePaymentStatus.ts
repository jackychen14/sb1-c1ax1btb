import { useState } from 'react';

export function usePaymentStatus() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const startProcessing = () => {
    setStatus('processing');
    setError(null);
  };

  const handleSuccess = () => {
    setStatus('success');
    setError(null);
  };

  const handleError = (message: string) => {
    setStatus('error');
    setError(message);
  };

  const reset = () => {
    setStatus('idle');
    setError(null);
  };

  return {
    status,
    error,
    startProcessing,
    handleSuccess,
    handleError,
    reset,
    isProcessing: status === 'processing',
  };
}