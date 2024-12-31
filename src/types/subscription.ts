export interface SubscriptionStatus {
  isActive: boolean;
  plan: 'free' | 'unlimited';
  expiresAt: string | null;
}

export interface SubscriptionFeature {
  id: string;
  label: string;
  description: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}