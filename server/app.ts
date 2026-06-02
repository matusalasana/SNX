import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import apiRouter from './routes';

const app = express();

// Security Hardening Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Turn off CSP during development so that asset links and inline styling work flawlessly inside browser preview framing
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: true, // Allow dev server origins and self references
  credentials: true
}));

// Body parser limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// REST Api routing mount point
app.use('/api', apiRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'SNX Developers PERN Portfolio API Engine'
  });
});

export default app;
