export function analyzeProgress(progressData) {
    // Analyze the progress data and return some analysis
    const totalActivities = progressData.length;
    const completedActivities = progressData.filter(activity => activity.completed).length;
    const progressPercentage = (completedActivities / totalActivities) * 100;

    return {
        totalActivities,
        completedActivities,
        progressPercentage
    };
}
