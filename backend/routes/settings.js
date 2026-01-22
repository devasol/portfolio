import express from 'express';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    
    // If no settings exist, create default
    if (!settings) {
      settings = await Setting.create({});
    }
    
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching settings'
    });
  }
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private (Admin)
router.put('/', protect, async (req, res) => {
  try {
    let settings = await Setting.findOne();
    
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      // Deep merge or specific field updates
      // For simplicity, we'll overwrite provided sections
      if (req.body.hero) settings.hero = { ...settings.hero, ...req.body.hero };
      if (req.body.about) settings.about = { ...settings.about, ...req.body.about };
      if (req.body.site) settings.site = { ...settings.site, ...req.body.site };
      if (req.body.socials) settings.socials = { ...settings.socials, ...req.body.socials };
    }
    
    await settings.save();
    
    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating settings'
    });
  }
});

export default router;
