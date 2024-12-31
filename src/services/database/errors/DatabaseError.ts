export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message);
    this.name = 'DatabaseError';
  }

  static fromSupabaseError(error: any): DatabaseError {
    return new DatabaseError(
      error.message || 'Database operation failed',
      error.code,
      error.details
    );
  }
}