const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
    maxlength: [20, 'Player name cannot exceed 20 characters']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative']
  },
  theme: {
    type: String,
    required: [true, 'Theme is required'],
    enum: ['classic', 'forest', 'space'],
    lowercase: true
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: ['easy', 'medium', 'hard'],
    lowercase: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
scoreSchema.index({ score: -1 });
scoreSchema.index({ date: -1 });

// Virtual for formatted date
scoreSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString();
});

// Ensure virtuals are included in JSON
scoreSchema.set('toJSON', { virtuals: true });
scoreSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Score', scoreSchema);
