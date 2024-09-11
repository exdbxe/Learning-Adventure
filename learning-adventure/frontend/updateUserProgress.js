export async function updateUserProgress(userId, progressData) {
    // Update user progress
    try {
        const response = await fetch(`http://localhost:5000/api/progress/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(progressData)
        });

        if (!response.ok) {
            throw new Error('Failed to update user progress');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user progress:', error);
        throw error;
    }
}
