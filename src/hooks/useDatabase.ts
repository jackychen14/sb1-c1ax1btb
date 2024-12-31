import { useState } from 'react';
import { DatabaseError } from '../services/database/toys.service';

export function useDatabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = async <T>(
    queryFn: () => Promise<T>,
    errorMessage: string = 'Database operation failed'
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await queryFn();
      return result;
    } catch (err) {
      const message = err instanceof DatabaseError ? err.message : errorMessage;
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    executeQuery,
    clearError: () => setError(null)
  };
}