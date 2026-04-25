import express from 'express';
import Visitor from '../models/Visitor.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get dashboard stats (including unique visitors)
// @route   GET /api/analytics/stats
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    // Get unique visitor count (total unique IPs)
    const uniqueVisitors = await Visitor.distinct('ip');
    
    // Get visits in last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentVisits = await Visitor.countDocuments({ visitDate: { $gte: last24h } });

    res.json({
      success: true,
      data: {
        uniqueVisitors: uniqueVisitors.length,
        recentVisits
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Log a visit (Public)
// @route   POST /api/analytics/log
// @access  Public
router.post('/log', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Optional: Only log once per hour for same IP to avoid bloating
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existing = await Visitor.findOne({
      ip,
      visitDate: { $gte: oneHourAgo }
    });

    if (!existing) {
      await Visitor.create({ ip, userAgent });
    }

    res.json({ success: true });
  } catch (error) {
    // Fail silently for the user
    res.status(500).json({ success: false });
  }
});

export default router;
