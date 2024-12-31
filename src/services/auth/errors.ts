export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AuthError';
  }

  static fromSupabaseError(error: any): AuthError {
    switch (error.code) {
      case 'user_already_exists':
        return new AuthError('An account with this email already exists', error.code);
      case 'invalid_credentials':
        return new AuthError('Invalid email or password', error.code);
      case 'unexpected_failure':
        return new AuthError('An unexpected error occurred. Please try again.', error.code);
      default:
        return new AuthError(error.message || 'Authentication failed', error.code);
    }
  }
}