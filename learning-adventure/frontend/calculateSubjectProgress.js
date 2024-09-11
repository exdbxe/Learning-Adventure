export function calculateSubjectProgress(subjectData) {
    // Calculate the progress for a specific subject
    const totalTopics = subjectData.topics.length;
    const completedTopics = subjectData.topics.filter(topic => topic.completed).length;
    const progressPercentage = (completedTopics / totalTopics) * 100;

    return {
        totalTopics,
        completedTopics,
        progressPercentage
    };
}
