import Stripe from 'stripe';
import { config } from '../../config/environment';
import { updateUserSubscription } from '../user/subscription.service';
import { logger } from '../../utils/logger';

const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2023-10-16',
});

export async function handleStripeWebhook(signature: string, rawBody: string) {
  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      config.stripeWebhookSecret
    );

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCancellation(event.data.object as Stripe.Subscription);
        break;
    }

    return { received: true };
  } catch (err) {
    logger.error('Webhook error:', err);
    throw new Error('Webhook handling failed');
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  if (!userId) {
    logger.error('No userId in subscription metadata');
    return;
  }

  await updateUserSubscription(userId, {
    isActive: subscription.status === 'active',
    plan: 'unlimited',
    expiresAt: new Date(subscription.current_period_end * 1000).toISOString()
  });

  logger.info('Subscription updated:', { userId, status: subscription.status });
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.userId;
  if (!userId) {
    logger.error('No userId in subscription metadata');
    return;
  }

  await updateUserSubscription(userId, {
    isActive: false,
    plan: 'free',
    expiresAt: null
  });

  logger.info('Subscription cancelled:', { userId });
}