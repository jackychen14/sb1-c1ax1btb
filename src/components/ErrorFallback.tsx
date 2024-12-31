import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <div className="flex items-center gap-2 text-red-600 mb-2">
        <span className="font-medium">Something went wrong:</span>
        <span>{error.message}</span>
      </div>
      <button
        onClick={resetErrorBoundary}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}