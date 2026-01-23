import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
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
import autoSeedData from './utils/autoSeed.js';

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

// Create nodemailer transporter
// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT == '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Helps with some self-signed cert issues or strict firewalls
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, budget, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Email content
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_EMAIL || 'Portfolio Contact'}" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // Sending to yourself
      replyTo: email,
      subject: `New Message from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; padding: 0; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; }
            .content { padding: 40px; background: white; }
            .field { margin-bottom: 30px; }
            .label { font-size: 12px; font-weight: 800; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
            .value { font-size: 16px; color: #1f2937; padding: 12px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981; }
            .footer { text-align: center; padding: 20px; background: #f3f4f6; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Project Inquiry</h1>
              <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Someone wants to work with you!</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              ${budget ? `
              <div class="field">
                <div class="label">Budget Range</div>
                <div class="value">${budget}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was sent directly from your portfolio website.</p>
              <p>&copy; ${new Date().getFullYear()} ${process.env.SMTP_FROM_EMAIL || 'Portfolio'}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.SMTP_EMAIL}`);

  // Create admin user if it doesn't exist
  await createAdminUser();
  
  // Auto-seed data if collections are empty (for live deployment)
  await autoSeedData();
});
