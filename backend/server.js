import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import createAdminUser from './utils/createAdmin.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import experienceRoutes from './routes/experience.js';
import settingRoutes from './routes/settings.js';
import serviceRoutes from './routes/services.js';
import uploadRoutes from './routes/upload.js';
import autoSeedData from './utils/autoSeed.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allow cross-origin resource sharing
  })
);

// Compression Middleware (Gzip)
app.use(compression());

// Logging Middleware
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  // Allow deployed URLs from env, split by comma if multiple
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
  (process.env.FRONTEND_URL || '').trim(),
  (process.env.ADMIN_URL || '').trim()
].filter(Boolean).map(origin => origin.replace(/\/$/, "")); // Normalize by removing trailing slashes

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const normalizedOrigin = origin.replace(/\/$/, "");
    
    // Check if origin (or normalized) matches any allowed origin
    if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.log('🛑 Blocked Origin:', origin);
    console.log('✅ Allowed Origins:', allowedOrigins);
    
    // Return a standard error which Express will handle, typically sending 500. 
    // Ideally we'd send 403, but default CORS middleware behavior is to throw.
    const msg = `CORS Error: Origin ${origin} is not allowed.`;
    return callback(new Error(msg), false);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload', uploadRoutes);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Contact form endpoint (Legacy - Logic moved to Frontend EmailJS)
app.post('/api/contact', async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Message received (Front-end bypass active)'
  });
});



// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Create admin user if it doesn't exist
  await createAdminUser();
  
  // Auto-seed data if collections are empty (for live deployment)
  await autoSeedData();
});
