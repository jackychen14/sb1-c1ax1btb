import { Router } from 'express';
import { handleStripeWebhook } from '../services/stripe/webhook.service';
import { logger } from '../utils/logger';

const router = Router();

router.post('/stripe', async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    const result = await handleStripeWebhook(signature, req.rawBody);
    res.json(result);
  } catch (err) {
    logger.error('Webhook processing failed:', err);
    res.status(400).json({ error: 'Webhook processing failed' });
  }
});

export const webhookRoutes = router;