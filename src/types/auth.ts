import { SubscriptionStatus } from './subscription';

export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  phone?: string;
  avatar?: string;
  location?: string;
  subscription?: SubscriptionStatus;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}