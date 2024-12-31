import { Router } from 'express';
import { createPaymentIntent } from '../services/payment.service';
import { createCheckoutSession } from '../services/stripe/checkout.service';
import { logger } from '../utils/logger';

const router = Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ 
        error: 'Missing required fields: amount and currency are required' 
      });
    }

    const clientSecret = await createPaymentIntent({ amount, currency, metadata });
    res.json({ clientSecret });
  } catch (error) {
    logger.error('Payment intent creation failed:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Payment processing failed' 
    });
  }
});

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { package: pkg, successUrl, cancelUrl } = req.body;

    if (!pkg || !successUrl || !cancelUrl) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    const session = await createCheckoutSession({ package: pkg, successUrl, cancelUrl });
    res.json(session);
  } catch (error) {
    logger.error('Checkout session creation failed:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to create checkout session'
    });
  }
});

export const paymentRoutes = router;