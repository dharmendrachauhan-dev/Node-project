import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV || 'development';
const apiPrefix = process.env.API_PREFIX || '/api/v1';

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Express & TypeScript REST API',
    documentation: `${apiPrefix}/items`,
    health: `${apiPrefix}/health`,
  });
});

// API Routes
app.use(apiPrefix, apiRouter);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const server = app.listen(port, () => {
  console.log(`🚀 Server running in ${nodeEnv} mode`);
  console.log(`📡 Listening at http://localhost:${port}`);
  console.log(`🩺 Health check at http://localhost:${port}${apiPrefix}/health`);
});

// Graceful shutdown handling
function gracefulShutdown(signal: string) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed. Process terminating.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
