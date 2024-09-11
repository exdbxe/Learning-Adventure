const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  subject: String,
  difficulty: String,
  question: String,
  answer: String,
  correct: Boolean,
  date: { type: Date, default: Date.now },
});

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subjects: [
    {
      name: String,
      score: { type: Number, default: 0 },
      level: { type: Number, default: 1 },
      activitiesCompleted: { type: Number, default: 0 },
    },
  ],
  achievements: [String],
  activityHistory: [ActivitySchema],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Progress", ProgressSchema);
