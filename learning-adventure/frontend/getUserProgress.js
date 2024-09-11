export async function getUserProgress(userId) {
    // Get user progress
    try {
        const response = await fetch(`http://localhost:5000/api/progress/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user progress');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting user progress:', error);
        throw error;
    }
}
