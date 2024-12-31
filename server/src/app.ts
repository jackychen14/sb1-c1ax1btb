import express from 'express';
import cors from 'cors';
import { config } from './config/environment';
import { paymentRoutes } from './routes/payment.routes';
import { webhookRoutes } from './routes/webhook.routes';
import { errorHandler } from './middleware/error';
import { logger } from './utils/logger';

const app = express();

// Configure CORS with specific options
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
}));

// Parse JSON requests, but keep raw body for webhooks
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl.startsWith('/webhook')) {
      (req as any).rawBody = buf.toString();
    }
  }
}));

// Routes
app.use('/api/payments', paymentRoutes);
app.use('/webhook', webhookRoutes);

// Error handling
app.use(errorHandler);

export { app };