import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { AppError } from '../middleware/error';
import { logger } from '../utils/logger';

export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  createPaymentIntent = async (req: Request, res: Response) => {
    try {
      const { amount, currency, metadata } = req.body;

      if (!amount || !currency) {
        throw new AppError(400, 'Amount and currency are required');
      }

      const clientSecret = await this.paymentService.createPaymentIntent({
        amount,
        currency,
        metadata,
      });

      logger.info('Payment intent created', { amount, currency, metadata });
      res.json({ clientSecret });
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, 'Failed to create payment intent');
    }
  };

  handleWebhook = async (req: Request, res: Response) => {
    try {
      const event = await this.paymentService.constructWebhookEvent(
        req.body,
        req.headers['stripe-signature'] as string
      );

      await this.paymentService.handleWebhookEvent(event);
      res.json({ received: true });
    } catch (error) {
      logger.error('Webhook handling failed:', error);
      res.status(400).json({ error: 'Webhook handling failed' });
    }
  };
}