const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// @route   POST /api/scores
// @desc    Save a new score
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { playerName, score, theme, difficulty } = req.body;

    // Validation
    if (!playerName || !score || !theme || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: playerName, score, theme, difficulty'
      });
    }

    // Create new score
    const newScore = new Score({
      playerName,
      score,
      theme,
      difficulty
    });

    // Save to database
    const savedScore = await newScore.save();

    console.log(`✅ Score saved: ${playerName} - ${score} points`);

    res.status(201).json({
      success: true,
      message: 'Score saved successfully',
      data: savedScore
    });

  } catch (error) {
    console.error('❌ Error saving score:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while saving score'
    });
  }
});

// @route   GET /api/leaderboard
// @desc    Get top 10 scores
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const scores = await Score.find()
      .sort({ score: -1, date: -1 })
      .limit(10)
      .select('playerName score theme difficulty date');

    res.json(scores);

  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard'
    });
  }
});

// @route   GET /api/scores
// @desc    Get all scores (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { theme, difficulty, limit = 50 } = req.query;
    
    // Build query
    const query = {};
    if (theme) query.theme = theme;
    if (difficulty) query.difficulty = difficulty;

    const scores = await Score.find(query)
      .sort({ score: -1, date: -1 })
      .limit(parseInt(limit))
      .select('playerName score theme difficulty date');

    res.json({
      success: true,
      count: scores.length,
      data: scores
    });

  } catch (error) {
    console.error('❌ Error fetching scores:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching scores'
    });
  }
});

// @route   DELETE /api/scores/:id
// @desc    Delete a score (optional - for admin)
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    const score = await Score.findByIdAndDelete(req.params.id);

    if (!score) {
      return res.status(404).json({
        success: false,
        message: 'Score not found'
      });
    }

    res.json({
      success: true,
      message: 'Score deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting score:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting score'
    });
  }
});

module.exports = router;
