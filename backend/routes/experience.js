import express from 'express';
import Experience from '../models/Experience.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all experience
// @route   GET /api/experience
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    
    await experience.deleteOne();
    
    res.json({ success: true, message: 'Experience removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
