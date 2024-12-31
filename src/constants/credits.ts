export const CREDIT_PACKAGES = [
  {
    id: 'basic',
    label: 'Basic Package',
    credits: 100,
    price: 9.99,
    description: 'Perfect for casual users'
  },
  {
    id: 'popular',
    label: 'Popular Package',
    credits: 250,
    price: 19.99,
    description: 'Best value for active users'
  },
  {
    id: 'premium',
    label: 'Premium Package',
    credits: 500,
    price: 34.99,
    description: 'Ideal for power users'
  }
] as const;