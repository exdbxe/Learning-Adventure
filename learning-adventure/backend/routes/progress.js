import express from 'express';
import auth from '../middleware/auth.js';
import Progress from '../models/Progress.js';

const router = express.Router();

// Get user progress
router.get("/", auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user.id });
    if (!progress) {
      progress = new Progress({ user: req.user.id });
      await progress.save();
    }
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update user progress
router.post("/", auth, async (req, res) => {
  try {
    const { subject, difficulty, question, answer, correct } = req.body;

    let progress = await Progress.findOne({ user: req.user.id });
    if (!progress) {
      progress = new Progress({ user: req.user.id });
    }

    // Update subject progress
    let subjectProgress = progress.subjects.find((s) => s.name === subject);
    if (!subjectProgress) {
      subjectProgress = {
        name: subject,
        score: 0,
        level: 1,
        activitiesCompleted: 0,
      };
      progress.subjects.push(subjectProgress);
    }

    subjectProgress.score += correct ? 10 : 0;
    subjectProgress.activitiesCompleted += 1;
    if (subjectProgress.score >= subjectProgress.level * 100) {
      subjectProgress.level += 1;
    }

    // Add to activity history
    progress.activityHistory.push({
      subject,
      difficulty,
      question,
      answer,
      correct,
    });

    // Check for new achievements
    const newAchievements = checkAchievements(progress);
    progress.achievements = [
      ...new Set([...progress.achievements, ...newAchievements]),
    ];

    progress.lastUpdated = Date.now();
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

function checkAchievements(progress) {
  const newAchievements = [];
  const totalActivities = progress.subjects.reduce(
    (sum, subject) => sum + subject.activitiesCompleted,
    0,
  );

  if (
    totalActivities >= 1 &&
    !progress.achievements.includes("first_activity")
  ) {
    newAchievements.push("first_activity");
  }
  if (
    totalActivities >= 50 &&
    !progress.achievements.includes("fifty_activities")
  ) {
    newAchievements.push("fifty_activities");
  }
  // Add more achievement checks as needed

  return newAchievements;
}

export default router;
