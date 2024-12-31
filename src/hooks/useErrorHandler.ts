import { useState, useCallback } from 'react';
import { logError } from '../utils/errorLogging';

export function useErrorHandler(context: string) {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: unknown) => {
    logError(context, error);
    setError(error instanceof Error ? error : new Error('An unexpected error occurred'));
  }, [context]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
}